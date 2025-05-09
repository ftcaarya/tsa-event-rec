'use client';

import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 100;
const PARTICLE_COLOR = 'rgba(0,255,255,0.5)';
const BG_COLOR = '#0a192f';

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
  }>>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize particles after mount
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      vx: randomBetween(-0.5, 0.5),
      vy: randomBetween(-0.5, 0.5),
      radius: randomBetween(1.5, 3.5),
    }));
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move and draw particles
      for (let p of particles.current) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw lines to mouse if close
      for (let p of particles.current) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = 'rgba(0,255,255,' + (1 - dist / 120).toFixed(2) + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: '#0a192f'
      }}
    />
  );
};

export default ParticleBackground; 