"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hue: number;
  delay: number;
}

export default function ForestBackground({ performanceMode = false }: { performanceMode?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (performanceMode) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render at 1/4 scale resolution to cut down render surface area by 16x
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 4);
      canvas.height = Math.ceil(window.innerHeight / 4);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize leaves (using scaled-down coordinates)
    const createLeaf = (delayed = false): Leaf => ({
      x: Math.random() * canvas.width,
      y: delayed ? Math.random() * -125 : Math.random() * canvas.height,
      size: Math.random() * 3 + 2, // size ranges from 2 to 5 pixels
      speed: Math.random() * 0.2 + 0.08, // speed matches scaled resolution
      drift: (Math.random() - 0.5) * 0.12,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.35 + 0.1,
      hue: Math.random() * 40 + 80, // green to yellow-green range
      delay: delayed ? Math.random() * 3000 : 0,
    });

    leavesRef.current = Array.from({ length: 6 }, (_, i) => createLeaf(i > 2));

    const drawLeaf = (ctx: CanvasRenderingContext2D, leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;

      // Handwritten retro pixel art blocky leaf representation
      const p = Math.max(1, Math.round(leaf.size / 3)); // Pixel cell size
      
      // Leaf body - Moss/Green shades
      ctx.fillStyle = `hsla(${leaf.hue}, 50%, 45%, 1)`;
      ctx.fillRect(-p, -2 * p, 2 * p, 4 * p);
      
      ctx.fillStyle = `hsla(${leaf.hue - 15}, 45%, 35%, 1)`; // Darker left side
      ctx.fillRect(-2 * p, -p, p, 3 * p);
      ctx.fillRect(-3 * p, 0, p, p);
      
      ctx.fillStyle = `hsla(${leaf.hue + 15}, 55%, 55%, 1)`; // Lighter right side
      ctx.fillRect(p, -p, p, 3 * p);
      ctx.fillRect(2 * p, 0, p, p);
      
      // Stem tail
      ctx.fillStyle = `hsla(${leaf.hue - 30}, 40%, 25%, 1)`;
      ctx.fillRect(-p, 2 * p, p, p);

      ctx.restore();
    };

    let lastTime = 0;
    let lastFrameTime = 0;
    const fpsInterval = 1000 / 20; // 20 FPS limit

    const animate = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(animate);

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < fpsInterval) {
        return;
      }
      lastFrameTime = timestamp - (elapsed % fpsInterval);

      const delta = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leavesRef.current.forEach((leaf) => {
        if (leaf.delay > 0) {
          leaf.delay -= delta;
          return;
        }

        leaf.y += leaf.speed;
        leaf.x += leaf.drift + Math.sin(timestamp * 0.001 + leaf.x) * 0.08;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > canvas.height + 12) {
          // Reset leaf
          leaf.x = Math.random() * canvas.width;
          leaf.y = -8;
          leaf.opacity = Math.random() * 0.35 + 0.1;
        }

        drawLeaf(ctx, leaf);
      });
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [performanceMode]);

  if (performanceMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full [image-rendering:pixelated]"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
