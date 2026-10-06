"use client";

import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getLocalAssetFallback, videoUrl } from "@/lib/cloudinary";
import type { MotionPiece } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { MediaDialog } from "./media-dialog";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribePointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A motion piece: a silent loop on the card, the full piece in a dialog.
 *
 * Nothing downloads until the card is near the viewport: `preload="none"`,
 * and the <source> elements are only attached once an IntersectionObserver
 * fires. It plays in view and pauses out of view. On a mouse it waits for
 * hover or focus; on touch it plays when visible, since there is no hover.
 * With reduced motion it never autoplays and shows the poster.
 */
export function MotionCard({ piece, priority = false }: { piece: MotionPiece; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => true,
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.4);
      },
      { rootMargin: "200px 0px", threshold: [0, 0.4, 0.8] },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = !reduceMotion && near && inView && (finePointer ? hovered : true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  const ratio = piece.aspect === "square" ? "aspect-square" : "aspect-video";

  return (
    <div className="flex h-full flex-col border border-rule bg-plate" ref={cardRef}>
      <button
        aria-label={`Play ${piece.title}, ${piece.format}`}
        className={`group relative block w-full overflow-hidden bg-black ${ratio}`}
        onBlur={() => setHovered(false)}
        onClick={() => setOpen(true)}
        onFocus={() => setHovered(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        type="button"
      >
        <CloudinaryImage
          alt=""
          className="object-cover"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={piece.poster}
        />
        {near ? (
          <video
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
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
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
          <Play aria-hidden="true" className="size-3.5 fill-current" />
          Watch
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
        <p className="label text-ink-2">{piece.format}</p>
        <h3 className="text-[clamp(1.5rem,1.2rem+0.8vw,1.875rem)] leading-tight text-ink">
          {piece.title}
        </h3>
      </div>

      <MediaDialog
        onClose={() => setOpen(false)}
        open={open}
        subtitle={`${piece.format} · Muted`}
        title={piece.title}
      >
        <video
          autoPlay={!reduceMotion}
          className={`mx-auto max-h-[75svh] w-full bg-black object-contain ${ratio}`}
          controls
          muted
          playsInline
          poster={getLocalAssetFallback(piece.poster)}
          preload="metadata"
        >
          <source src={videoUrl(piece.full)} type="video/mp4" />
        </video>
      </MediaDialog>
    </div>
  );
}
