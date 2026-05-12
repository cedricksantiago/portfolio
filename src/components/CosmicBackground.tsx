"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: string;
  baseOpacity: number;
  opacity: number;
  friction: number;
  ease: number;
  angle: number;
  speed: number;
  flickerSpeed: number;
  flickerOffset: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.originX = this.x;
    this.originY = this.y;
    this.vx = 0;
    this.vy = 0;
    this.size = Math.random() * 2 + 0.5;
    
    // Twinkling properties
    const opacities = [0.2, 0.4, 0.6, 0.8];
    this.baseOpacity = opacities[Math.floor(Math.random() * opacities.length)];
    this.opacity = this.baseOpacity;
    
    // 25% chance of being an ultra violet particle
    this.baseColor = Math.random() > 0.75 ? "138, 43, 226" : "255, 255, 255";

    this.flickerSpeed = Math.random() * 0.002 + 0.001;
    this.flickerOffset = Math.random() * Math.PI * 2;

    this.friction = 0.92; 
    this.ease = 0.02; // Very gentle return
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.5 + 0.1; // Gentle flow
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add glow to violet particles
    if (this.baseColor === "138, 43, 226") {
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(138, 43, 226, ${this.opacity})`;
    } else {
      ctx.shadowBlur = 0;
    }
  }

  update(mouse: { x: number; y: number; radius: number }, time: number) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Star twinkling effect
    this.opacity = this.baseOpacity * (0.6 + 0.4 * Math.sin(time * this.flickerSpeed + this.flickerOffset));

    // Flowy background movement (sine wave drifting)
    this.originX += Math.cos(this.angle + time * 0.001) * this.speed;
    this.originY += Math.sin(this.angle + time * 0.001) * this.speed;

    if (distance < mouse.radius) {
      // Attraction force (follows mouse)
      const force = (mouse.radius - distance) / mouse.radius;
      const pullX = (dx / distance) * force * 2;
      const pullY = (dy / distance) * force * 2;
      
      this.vx += pullX;
      this.vy += pullY;
    }

    // Gentle return to origin
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Friction
    this.vx *= this.friction;
    this.vy *= this.friction;
  }
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200, // Larger radius for attraction
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 5000; 
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouse, time);
        particlesArray[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
}
