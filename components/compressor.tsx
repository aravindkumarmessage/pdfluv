"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

const targets = ["Automatic", "100 KB", "500 KB", "1 MB", "2 MB"];

export function Compressor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState("Balanced");
  const [target, setTarget] = useState("Automatic");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("");
  function acceptFile(nextFile?: File) { if (nextFile?.type === "application/pdf" || nextFile?.name.toLowerCase().endsWith(".pdf")) setFile(nextFile); }
  function onChange(event: ChangeEvent<HTMLInputElement>) { acceptFile(event.target.files?.[0]); }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]); }
  async function compress() {
    if (!file) return;
    setStatus("Compressing...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    formData.append("target", target);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/v1/compress`, { method: "POST", body: formData });
      if (!response.ok) throw new Error((await response.json()).detail ?? "Compression failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-compressed.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("Downloaded");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Compression failed");
    }
  }
  return <div className="compressor-card"><div className="card-top"><span className="card-kicker">PDF compressor</span><span className="privacy-chip">Private by design</span></div><div className={`drop-zone ${dragging ? "is-dragging" : ""}`} onDragEnter={() => setDragging(true)} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={onDrop}><input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={onChange} /><div className="upload-mark">{file ? "✓" : "↑"}</div><h2>{file ? file.name : "Drop your PDF here"}</h2><p>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB ready to inspect` : "or choose a file from your device"}</p><button className="choose-button" onClick={() => inputRef.current?.click()}>{file ? "Choose another" : "Choose PDF"}<span>↗</span></button></div><div className="controls"><div><label>Compression</label><div className="segmented">{["Maximum", "Balanced", "Quality"].map((option) => <button className={mode === option ? "selected" : ""} key={option} onClick={() => setMode(option)}>{option}</button>)}</div></div><div><label>Target size</label><select value={target} onChange={(event) => setTarget(event.target.value)}>{targets.map((option) => <option key={option}>{option}</option>)}</select></div></div><button className="compress-button" disabled={!file || status === "Compressing..."} onClick={compress}>{status || "Compress PDF"} <span>→</span></button><p className="card-foot">Files are processed temporarily and deleted automatically.</p></div>;
}