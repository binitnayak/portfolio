'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const requestRef = useRef<number>();
  
  const frameCount = 75; // 0 to 74

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let isCancelled = false;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameIndexStr = i.toString().padStart(2, '0');
      img.src = `/sequence/frame_${frameIndexStr}_delay-0.066s.webp`;
      
      const checkAndSetLoaded = () => {
        loadedCount++;
        if (loadedCount === frameCount && !isCancelled) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
          // Draw first frame once loaded
          if (canvasRef.current) {
             const ctx = canvasRef.current.getContext('2d');
             if (ctx && loadedImages[0].complete && loadedImages[0].naturalWidth > 0) {
               drawImageCover(ctx, loadedImages[0], canvasRef.current);
             }
          }
        }
      };

      img.onload = () => {
        if (isCancelled) return;
        loadedImages[i] = img;
        checkAndSetLoaded();
      };

      img.onerror = () => {
        if (isCancelled) return;
        loadedImages[i] = img; // Store broken image to keep sequence length intact
        checkAndSetLoaded();
      };
    }

    return () => {
      isCancelled = true;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const renderFrame = (index: number) => {
    const images = imagesRef.current;
    if (images.length === frameCount && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const img = images[index];
      if (ctx && img && img.complete && img.naturalWidth > 0) {
        drawImageCover(ctx, img, canvasRef.current);
      }
    }
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(() => {
      renderFrame(Math.round(latest));
    });
  });

  // Helper to draw image like object-fit: cover
  const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        // Scale canvas for high DPI displays (Retina screens)
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        
        // Redraw current frame
        if (isLoaded) {
          renderFrame(Math.round(frameIndex.get()));
        }
      }
    };
    
    handleResize(); // Initial sizing
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full will-change-transform" 
        />
      </div>
    </div>
  );
}
