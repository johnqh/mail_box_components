import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '../lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  isCircle: boolean;
}

export interface ConfettiProps {
  /** Whether to show the confetti animation */
  show: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Number of particles */
  particleCount?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Custom colors array */
  colors?: string[];
  /** Additional className for the container */
  className?: string;
}

const DEFAULT_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
];

/**
 * Confetti Component
 *
 * Displays a celebratory confetti animation from the center of the screen.
 * Particles explode outward with physics-based movement.
 *
 * @example
 * ```tsx
 * <Confetti show={isComplete} onComplete={() => setIsComplete(false)} />
 * ```
 *
 * @example
 * ```tsx
 * <Confetti
 *   show={showCelebration}
 *   particleCount={100}
 *   duration={5000}
 *   colors={['#ff0000', '#00ff00', '#0000ff']}
 * />
 * ```
 */
export const Confetti: React.FC<ConfettiProps> = ({
  show,
  onComplete,
  particleCount = 50,
  duration = 3000,
  colors = DEFAULT_COLORS,
  className,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Create particles when show changes to true
  useEffect(() => {
    if (show && !isAnimating) {
      setIsAnimating(true);

      // Create particles from center
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = 2 + Math.random() * 4;
        newParticles.push({
          id: i,
          x: 50, // Center horizontally (%)
          y: 50, // Center vertically (%)
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // Slight upward bias
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 8 + Math.random() * 8,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 20,
          isCircle: Math.random() > 0.5,
        });
      }
      setParticles(newParticles);

      // End animation after duration
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [show, isAnimating, onComplete, particleCount, duration, colors]);

  // Animate particles
  const updateParticles = useCallback(() => {
    setParticles(prev =>
      prev.map(p => ({
        ...p,
        x: p.x + p.vx * 0.5,
        y: p.y + p.vy * 0.5,
        vy: p.vy + 0.15, // Gravity
        rotation: p.rotation + p.rotationSpeed,
      }))
    );
  }, []);

  // Animation frame
  useEffect(() => {
    if (!isAnimating || particles.length === 0) return;

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, [isAnimating, particles.length, updateParticles]);

  if (!isAnimating || particles.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-50 overflow-hidden',
        className
      )}
      aria-hidden='true'
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className='absolute'
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: particle.isCircle ? '50%' : '2px',
            opacity: Math.max(0, 1 - particle.y / 150),
          }}
        />
      ))}
    </div>
  );
};
