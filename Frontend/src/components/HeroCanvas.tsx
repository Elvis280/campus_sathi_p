import React, { useEffect, useRef } from 'react';



export const HeroCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let signals: Signal[] = [];
        const particleCount = 70; // Increased density
        const connectionDistance = 180;
        const mouse = { x: 0, y: 0, radius: 250 }; // Larger interactive area

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseSize: number;
            pulsePhase: number;
            pulseSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower, more deliberate movement
                this.vy = (Math.random() - 0.5) * 0.3;
                this.baseSize = Math.random() * 2 + 1.5;
                this.size = this.baseSize;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.05 + Math.random() * 0.05;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;

                // Mouse interaction - Gentle repulsion/attraction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Subtle attraction to create a "swarm" feel around cursor
                    this.x += dx * force * 0.01;
                    this.y += dy * force * 0.01;
                }

                // Pulse effect
                this.pulsePhase += this.pulseSpeed;
                this.size = this.baseSize + Math.sin(this.pulsePhase) * 0.5;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(132, 0, 255, ${0.3 + Math.sin(this.pulsePhase) * 0.2})`; // Primary color pulse
                ctx.fill();
            }
        }

        class Signal {
            start: Particle;
            end: Particle;
            progress: number;
            speed: number;
            active: boolean;

            constructor(start: Particle, end: Particle) {
                this.start = start;
                this.end = end;
                this.progress = 0;
                this.speed = 0.02 + Math.random() * 0.04;
                this.active = true;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.active = false;
                }
            }

            draw() {
                if (!ctx || !this.active) return;
                const x = this.start.x + (this.end.x - this.start.x) * this.progress;
                const y = this.start.y + (this.end.y - this.start.y) * this.progress;

                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.progress})`;
                ctx.fill();

                // Trail
                ctx.beginPath();
                ctx.strokeStyle = `rgba(132, 0, 255, ${0.5 * (1 - this.progress)})`;
                ctx.lineWidth = 2;
                ctx.moveTo(x - (this.end.x - this.start.x) * 0.1, y - (this.end.y - this.start.y) * 0.1);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            signals = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections and manage signals
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 0.1 * (1 - distance / connectionDistance);
                        ctx.strokeStyle = `rgba(132, 0, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();

                        // Randomly trigger a signal
                        if (Math.random() < 0.001) {
                            signals.push(new Signal(particles[i], particles[j]));
                        }
                    }
                }
            }

            // Update and draw signals
            signals = signals.filter(s => s.active);
            signals.forEach(s => {
                s.update();
                s.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-60" // Increased opacity slightly
        />
    );
};
