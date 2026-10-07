"use client";

import { useReducedMotion } from "framer-motion";
import { getLocalAssetFallback, videoUrl } from "@/lib/cloudinary";
import type { MotionPiece, PrintPiece } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { MediaDialog } from "./media-dialog";

type DialogProps<T> = { piece: T; open: boolean; onClose: () => void };

/**
 * The full motion piece, muted. The audio is stripped at encode time; the
 * player is the browser's own, which is keyboard-accessible and costs nothing.
 */
export function MotionDialog({ piece, open, onClose }: DialogProps<MotionPiece>) {
  const reduceMotion = useReducedMotion();
  const ratio = piece.aspect === "square" ? "aspect-square" : "aspect-video";

  return (
    <MediaDialog onClose={onClose} open={open} subtitle={`${piece.format}, Muted`} title={piece.title}>
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
  );
}

/** Every image of a print or apparel piece, with captions. */
export function PrintDialog({ piece, open, onClose }: DialogProps<PrintPiece>) {
  return (
    <MediaDialog onClose={onClose} open={open} subtitle={piece.format} title={piece.title}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {piece.items.map((item) => (
          <li className="flex flex-col gap-2" key={item.src}>
            <div className="relative aspect-[4/3] overflow-hidden bg-plate-2">
              <CloudinaryImage
                alt={item.alt}
                className="object-contain"
                fill
                sizes="(min-width: 1100px) 530px, (min-width: 640px) 46vw, 92vw"
                src={item.src}
              />
            </div>
            {item.caption ? <p className="label text-ink-2">{item.caption}</p> : null}
          </li>
        ))}
      </ul>
    </MediaDialog>
  );
}
