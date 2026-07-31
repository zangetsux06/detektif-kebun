"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crop, ZoomIn, ZoomOut, Check, X, Move } from "lucide-react";

interface ImageCropModalProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropSave: (croppedDataUrl: string) => void;
}

export default function ImageCropModal({
  open,
  imageSrc,
  onClose,
  onCropSave,
}: ImageCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  // Load image object
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageObjRef.current = img;
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Draw crop preview on canvas
  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageObjRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Fill background with dark RPG wood tone
    ctx.fillStyle = "#12130e";
    ctx.fillRect(0, 0, size, size);

    // Calculate scaling to cover canvas square
    const minDim = Math.min(img.width, img.height);
    const baseScale = size / minDim;
    const currentScale = baseScale * zoom;

    const drawW = img.width * currentScale;
    const drawH = img.height * currentScale;

    // Center position + offset
    const posX = (size - drawW) / 2 + offsetX;
    const posY = (size - drawH) / 2 + offsetY;

    ctx.save();
    ctx.drawImage(img, posX, posY, drawW, drawH);
    ctx.restore();
  }, [zoom, offsetX, offsetY]);

  useEffect(() => {
    if (open) {
      drawPreview();
    }
  }, [open, drawPreview]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - offsetX, y: e.touches[0].clientY - offsetY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setOffsetX(e.touches[0].clientX - dragStart.x);
      setOffsetY(e.touches[0].clientY - dragStart.y);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onCropSave(dataUrl);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-[160] flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-sm flex flex-col relative border-4 border-[#92623a] bg-[#2f1503] shadow-2xl p-4 text-[#f4eedd]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{ imageRendering: "pixelated" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#92623a] mb-4">
            <div className="flex items-center gap-2 text-[#fde68a]">
              <Crop className="w-5 h-5" />
              <h3
                className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Potong Foto Profil
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#d97706] hover:text-[#fde68a] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Canvas Preview Area */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative w-64 h-64 border-4 border-[#facc15] bg-[#12130e] overflow-hidden cursor-grab active:cursor-grabbing shadow-inner flex items-center justify-center"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <canvas ref={canvasRef} className="w-full h-full object-cover pointer-events-none" />

              {/* Drag instruction overlay */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-[9px] text-[#fde68a] font-mono rounded flex items-center gap-1 pointer-events-none select-none">
                <Move className="w-3 h-3" /> Geser Foto
              </div>
            </div>

            {/* Controls: Zoom Slider */}
            <div className="flex items-center gap-3 w-full px-2 mt-2">
              <ZoomOut className="w-4 h-4 text-[#d97706]" />
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-[#facc15] cursor-pointer"
              />
              <ZoomIn className="w-4 h-4 text-[#facc15]" />
            </div>

            <p className="text-[10px] text-[#f4eedd]/70 text-center font-mono mt-1">
              Geser dan atur perbesaran foto hingga sesuai dengan frame profile.
            </p>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between gap-3 mt-5 pt-3 border-t-2 border-[#92623a]">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 bg-[#5e3c25] hover:bg-[#78492c] text-[#f4eedd] font-bold text-[10px] sm:text-xs border-2 border-[#92623a] cursor-pointer uppercase tracking-wider transition-all"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 px-3 bg-[#b45309] hover:bg-[#d97706] text-[#fef08a] font-bold text-[10px] sm:text-xs border-2 border-[#facc15] shadow-md cursor-pointer uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              <Check className="w-4 h-4" /> Simpan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
