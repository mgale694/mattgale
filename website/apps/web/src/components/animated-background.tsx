import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
}

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const explosionRef = useRef({ active: false, x: 0, y: 0, timestamp: 0 });
  const lastFrameTime = useRef(0);
  const isVisible = useRef(true);

  // Performance optimization: reduce particle count on mobile
  const getParticleCount = useCallback(() => {
    if (typeof window === 'undefined') return 80;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    return isMobile || isLowEnd ? 60 : 120;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance optimization: handle visibility changes
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
      if (isVisible.current && !animationRef.current) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = getParticleCount();
    
      const container = canvas.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          radius: Math.random() * 2 + 1.5,
          connections: []
        });
      }
      
      particlesRef.current = particles;
    };

    const updateParticles = () => {
        const container = canvas.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
      const particles = particlesRef.current;
      const contractForce = isHovered ? 0.015 : 0;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      particles.forEach(particle => {
        // Update position - particles always float
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Distance-based mouse attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Handle explosion effect
        if (explosionRef.current.active) {
          const explosionDx = particle.x - explosionRef.current.x;
          const explosionDy = particle.y - explosionRef.current.y;
          const explosionDistance = Math.sqrt(explosionDx * explosionDx + explosionDy * explosionDy);
          const timeSinceExplosion = Date.now() - explosionRef.current.timestamp;
          
          // Apply explosion force for 500ms (shorter duration), with decreasing intensity
          if (timeSinceExplosion < 500 && explosionDistance > 0) {
            const explosionForce = 3 * (1 - timeSinceExplosion / 500); // Reduced force and shorter duration
            const maxExplosionDistance = 200; // Reduced from 400 to 200 for shorter range
            
            if (explosionDistance < maxExplosionDistance) {
              // Closer particles get more force
              const forceMultiplier = (maxExplosionDistance - explosionDistance) / maxExplosionDistance;
              particle.vx += (explosionDx / explosionDistance) * explosionForce * forceMultiplier;
              particle.vy += (explosionDy / explosionDistance) * explosionForce * forceMultiplier;
            }
          } else if (timeSinceExplosion >= 500) {
            explosionRef.current.active = false;
          }
        }
        
        if (distance > 0) {
          // Closer particles move faster - inverse relationship with distance
          const maxAttractionDistance = 500; // Only attract within this radius
          const minAttractionForce = 0.0003;
          const maxAttractionForce = 0.002;
          
          if (distance < maxAttractionDistance) {
            // Calculate attraction force - closer = stronger
            const normalizedDistance = distance / maxAttractionDistance;
            const attractionForce = maxAttractionForce - (normalizedDistance * (maxAttractionForce - minAttractionForce));
            
            particle.vx += (dx / distance) * attractionForce;
            particle.vy += (dy / distance) * attractionForce;
          }
        }

        // Contract towards center on hover (but still keep floating)
        if (isHovered) {
          const centerDx = centerX - particle.x;
          const centerDy = centerY - particle.y;
          particle.vx += centerDx * contractForce;
          particle.vy += centerDy * contractForce;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        }

        // Apply very light friction to keep movement smooth
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Add some randomness to keep particles moving
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Limit maximum velocity
        const maxVel = 2.5;
        if (Math.abs(particle.vx) > maxVel) particle.vx = particle.vx > 0 ? maxVel : -maxVel;
        if (Math.abs(particle.vy) > maxVel) particle.vy = particle.vy > 0 ? maxVel : -maxVel;
      });
    };

    const drawParticles = () => {
      const particles = particlesRef.current;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Get CSS custom property for particle color
      const computedStyle = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
      const connectionColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

      // Draw connections - each particle connects to its 3-5 nearest neighbors
      ctx.strokeStyle = connectionColor;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        // Calculate distances to all other particles
        const distances = [];
        for (let j = 0; j < particles.length; j++) {
          if (i !== j) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            distances.push({ index: j, distance });
          }
        }
        
        // Sort by distance and take the 3-5 nearest neighbors
        distances.sort((a, b) => a.distance - b.distance);
        const connectionsCount = Math.min(3 + Math.floor(Math.random() * 3), distances.length); // 3-5 connections
        
        for (let k = 0; k < connectionsCount; k++) {
          const neighbor = distances[k];
          const j = neighbor.index;
          
          // Only draw each connection once (avoid duplicates)
          if (i < j) {
            const maxConnectionDistance = 10000; // Maximum distance for any connection
            if (neighbor.distance < maxConnectionDistance) {
              const opacity = 1 - neighbor.distance / maxConnectionDistance;
              ctx.globalAlpha = opacity * (isHovered ? 0.8 : 0.6);
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      ctx.globalAlpha = isHovered ? 0.8 : 0.6;
      ctx.fillStyle = particleColor;
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      if (!isVisible.current) {
        animationRef.current = null;
        return;
      }

      const now = performance.now();
      const deltaTime = now - lastFrameTime.current;
      
      // Target 60fps, skip frame if running too fast
      if (deltaTime < 16.67) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime.current = now;
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseClick = (e: MouseEvent) => {
      explosionRef.current = {
        active: true,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove); // Changed to window for full screen tracking
    window.addEventListener('click', handleMouseClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove); // Updated cleanup
      window.removeEventListener('click', handleMouseClick);
    };
  }, [isHovered]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
