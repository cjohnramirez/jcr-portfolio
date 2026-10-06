"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getLocalAssetFallback } from "@/lib/cloudinary";
import type { MotionPiece } from "@/lib/portfolio-types";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribePointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The silent loop over a motion card's poster.
 *
 * Nothing downloads until the card is near the viewport: `preload="none"`,
 * and the <video> is only mounted once an IntersectionObserver fires. On a
 * mouse it plays while the card is hovered or focused; on touch, where there
 * is no hover, it plays while the card is in view. With reduced motion it
 * never plays and the poster stays. Decorative: the card's own label names
 * the piece, so the video is hidden from assistive technology and from
 * pointer hits, which keeps clicks and focus on the card.
 */
export function MotionPreview({ piece, active }: { piece: MotionPiece; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => true,
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.4);
      },
      { rootMargin: "200px 0px", threshold: [0, 0.4, 0.8] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = !reduceMotion && near && inView && (finePointer ? active : true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  }, [shouldPlay]);

  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0" ref={ref}>
      {near ? (
        <video
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            shouldPlay ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          playsInline
          poster={getLocalAssetFallback(piece.poster)}
          preload="none"
          ref={videoRef}
        >
          <source src={piece.loop.webm} type="video/webm" />
          <source src={piece.loop.mp4} type="video/mp4" />
        </video>
      ) : null}
    </span>
  );
}
