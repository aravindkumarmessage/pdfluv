from io import BytesIO

from PIL import Image
import pymupdf
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI(title="PDFluv Compression API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "compression-api"}

@app.post("/v1/compress")
async def compress_pdf(
    file: UploadFile = File(...),
    mode: str = Form("Balanced"),
    target: str = Form("Automatic"),
) -> StreamingResponse:
    filename = file.filename or "document.pdf"
    if file.content_type != "application/pdf" and not filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=415, detail="Only PDF files are supported")

    source = await file.read()
    if len(source) > 50 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="PDF must be smaller than 50 MB")

    try:
        target_bytes = parse_target(target)
        base_quality = {"Maximum": 55, "Balanced": 72, "Quality": 86}.get(mode, 72)
        base_dpi = {"Maximum": 150, "Balanced": 180, "Quality": 220}.get(mode, 180)
        attempts = [(base_quality, base_dpi)]
        if target_bytes:
            attempts = [(quality, dpi) for quality, dpi in [(base_quality, base_dpi), (50, 150), (40, 120), (30, 96), (20, 72)]]
        compressed = min((compress_bytes(source, quality, dpi) for quality, dpi in attempts), key=len)
        if target_bytes:
            for quality, dpi in attempts:
                candidate = compress_bytes(source, quality, dpi)
                if len(candidate) <= target_bytes:
                    compressed = candidate
                    break
            if len(compressed) > target_bytes:
                raise HTTPException(status_code=422, detail="This PDF cannot reach the selected target size without unacceptable quality loss")
    except Exception as error:
        raise HTTPException(status_code=422, detail="The PDF could not be processed") from error

    download_name = f"{filename.rsplit('.', 1)[0]}-compressed.pdf"
    return StreamingResponse(
        iter([compressed]),
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{download_name}"'},
    )


def parse_target(target: str) -> int | None:
    normalized = target.strip().upper().replace(" ", "")
    if normalized == "AUTOMATIC":
        return None
    try:
        if normalized.endswith("KB"):
            return int(float(normalized[:-2]) * 1024)
        if normalized.endswith("MB"):
            return int(float(normalized[:-2]) * 1024 * 1024)
    except ValueError:
        pass
    raise HTTPException(status_code=400, detail="Invalid target size")


def compress_bytes(source: bytes, quality: int, dpi_limit: int) -> bytes:
    document = pymupdf.open(stream=source, filetype="pdf")
    for page in document:
        for image in page.get_images(full=True):
            xref = image[0]
            existing = document.extract_image(xref)
            if existing["width"] < 300 or existing["height"] < 300:
                continue
            pixmap = pymupdf.Pixmap(document, xref)
            if pixmap.alpha:
                pixmap = pymupdf.Pixmap(pymupdf.csRGB, pixmap)
            pil_image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            max_width = max(1, round(page.rect.width / 72 * dpi_limit))
            max_height = max(1, round(page.rect.height / 72 * dpi_limit))
            if pil_image.width > max_width or pil_image.height > max_height:
                pil_image.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
            candidate = BytesIO()
            pil_image.save(candidate, format="JPEG", quality=quality, optimize=True)
            if len(candidate.getvalue()) < len(existing["image"]):
                page.replace_image(xref, stream=candidate.getvalue())
    output = BytesIO()
    document.save(output, garbage=4, deflate=True, deflate_images=True, clean=True)
    document.close()
    return output.getvalue()
