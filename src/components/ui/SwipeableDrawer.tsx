'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface SwipeableDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  direction?: 'left' | 'right' | 'down';
  threshold?: number;
  className?: string;
}

export default function SwipeableDrawer({
  children,
  isOpen,
  onClose,
  direction = 'right',
  threshold = 100,
  className = '',
}: SwipeableDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getSwipeDistance = useCallback(() => {
    if (!touchStart || !touchCurrent) return 0;

    if (direction === 'down') {
      return Math.max(0, touchCurrent.y - touchStart.y);
    } else if (direction === 'right') {
      return Math.max(0, touchCurrent.x - touchStart.x);
    } else {
      return Math.max(0, touchStart.x - touchCurrent.x);
    }
  }, [touchStart, touchCurrent, direction]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchCurrent({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setTouchCurrent({ x: touch.clientX, y: touch.clientY });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    const distance = getSwipeDistance();

    if (distance > threshold) {
      onClose();
    }

    setTouchStart(null);
    setTouchCurrent(null);
    setIsDragging(false);
  }, [getSwipeDistance, threshold, onClose]);

  const getTransform = useCallback(() => {
    const distance = getSwipeDistance();
    if (!isDragging || distance === 0) return 'none';

    if (direction === 'down') {
      return `translateY(${distance}px)`;
    } else if (direction === 'right') {
      return `translateX(${distance}px)`;
    } else {
      return `translateX(-${distance}px)`;
    }
  }, [getSwipeDistance, isDragging, direction]);

  const getOpacity = useCallback(() => {
    const distance = getSwipeDistance();
    if (!isDragging) return 1;
    return Math.max(0.5, 1 - (distance / (threshold * 2)));
  }, [getSwipeDistance, isDragging, threshold]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
      {/* Swipe Handle Indicator */}
      {direction === 'down' && (
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
      )}
      {children}
    </div>
  );
}
