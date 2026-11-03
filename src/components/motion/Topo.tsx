'use client';

import { useEffect, useRef } from 'react';

/** Topographic contour lines, drawn once per size. Purely decorative. */
export default function Topo({ variant = 'corner' }: { variant?: 'corner' | 'right' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const right = variant === 'right';
      const cx = w * (right ? 1.02 : 0.86);
      const cy = h * (right ? 0.42 : 0.24);
      const rings = 22;
      const span = Math.max(w, h) * 1.05;
      ctx.lineWidth = 1;
      for (let i = 0; i < rings; i++) {
        const base = 24 + (i / rings) * span;
        ctx.beginPath();
        for (let k = 0; k <= 240; k++) {
          const a = (k / 240) * Math.PI * 2;
          const n = Math.sin(a * 3 + i * 0.33) * 0.07 + Math.sin(a * 5 - i * 0.21) * 0.045 + Math.cos(a * 2 + i * 0.47) * 0.06;
          const r = base * (1 + n);
          const x = cx + Math.cos(a) * r * 1.3;
          const y = cy + Math.sin(a) * r * 0.78;
          if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${(0.085 * (1 - i / rings) + 0.015).toFixed(3)})`;
        ctx.stroke();
      }
    };
    draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 150); };
    addEventListener('resize', onResize);
    return () => { removeEventListener('resize', onResize); clearTimeout(t); };
  }, [variant]);

  return <canvas ref={ref} className={`topo${variant === 'right' ? ' topo--right' : ''}`} aria-hidden="true" />;
}
