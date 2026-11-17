"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number; r: number; phase: number };

/**
 * A slowly rotating 3D point cloud — a nod to embedding / representation space —
 * drawn on a canvas behind the hero. It centres itself on the element whose id is
 * `anchorId`, tilts toward the pointer, and pauses when off-screen or when the tab is hidden.
 */
export default function LatentField({ anchorId }: { anchorId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let radius = 200;
    let points: Point[] = [];
    let colA = [62, 230, 208];
    let colB = [141, 123, 255];
    let raf = 0;
    let running = false;
    let t = 0;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      const parse = (v: string, fallback: number[]) => {
        const parts = v.trim().split(/\s+/).map(Number);
        return parts.length === 3 && parts.every((n) => !Number.isNaN(n)) ? parts : fallback;
      };
      colA = parse(s.getPropertyValue("--field-a"), colA);
      colB = parse(s.getPropertyValue("--field-b"), colB);
    };

    const pointCount = () => (width < 640 ? 150 : width < 1024 ? 210 : 280);

    const build = () => {
      const count = pointCount();
      points = [];
      // Fibonacci sphere with a little noise so it reads as a "cloud", not a ball
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const rr = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const jitter = 0.82 + Math.random() * 0.36;
        points.push({
          x: Math.cos(theta) * rr * jitter,
          y: y * jitter,
          z: Math.sin(theta) * rr * jitter,
          r: 0.6 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const anchor = document.getElementById(anchorId);
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        cx = a.left - rect.left + a.width / 2;
        cy = a.top - rect.top + a.height / 2;
        radius = Math.max(a.width, a.height) * 0.95;
      } else {
        cx = width * 0.7;
        cy = height * 0.5;
        radius = Math.min(width, height) * 0.35;
      }
      if (points.length !== pointCount()) build();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;

      const ry = t * 0.12 + tilt.x * 0.6;
      const rx = 0.35 + tilt.y * 0.4;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const fov = 2.6;

      const projected: { x: number; y: number; z: number; s: number; p: Point }[] = new Array(points.length);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const breathe = 1 + Math.sin(t * 0.8 + p.phase) * 0.025;
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        projected[i] = {
          x: cx + x1 * radius * scale * breathe,
          y: cy + y1 * radius * scale * breathe,
          z: z2,
          s: scale,
          p,
        };
      }

      // Connections between nearby points (in screen space, weighted by depth)
      const maxDist = radius * 0.32;
      const maxDist2 = maxDist * maxDist;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const depth = (2 - (a.z + b.z) / 2) / 3; // nearer = brighter
            const alpha = (1 - d2 / maxDist2) * 0.22 * depth;
            const m = (a.z + 1) / 2;
            ctx.strokeStyle = `rgba(${Math.round(colA[0] * (1 - m) + colB[0] * m)},${Math.round(
              colA[1] * (1 - m) + colB[1] * m,
            )},${Math.round(colA[2] * (1 - m) + colB[2] * m)},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Points
      for (let i = 0; i < projected.length; i++) {
        const q = projected[i];
        const m = (q.z + 1) / 2;
        const r = Math.round(colA[0] * (1 - m) + colB[0] * m);
        const g = Math.round(colA[1] * (1 - m) + colB[1] * m);
        const b = Math.round(colA[2] * (1 - m) + colB[2] * m);
        const alpha = 0.25 + (1 - m) * 0.7;
        const size = q.p.r * q.s * 1.15;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      t += 1 / 60;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    readColors();
    measure();
    draw();

    const onPointer = (e: PointerEvent) => {
      tilt.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      tilt.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const ro = new ResizeObserver(() => {
      measure();
      if (!running) draw();
    });
    ro.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    });
    visibility.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (!running) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (!reduceMotion) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [anchorId]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
