"use client";

import { Images } from "lucide-react";
import { useState } from "react";
import type { PrintPiece } from "@/lib/portfolio-types";
import { CloudinaryImage } from "../shared/cloudinary-image";
import { MediaDialog } from "./media-dialog";

/** A print or apparel piece whose full set opens in a dialog gallery. */
export function PrintCard({ piece }: { piece: PrintPiece }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col border border-rule bg-plate">
      <button
        aria-label={`View ${piece.title}, ${piece.items.length} images`}
        className="group relative block aspect-[4/3] w-full overflow-hidden bg-plate-2"
        onClick={() => setOpen(true)}
        type="button"
      >
        <CloudinaryImage
          alt=""
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={piece.cover.src}
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm">
          <Images aria-hidden="true" className="size-3.5" />
          {piece.items.length} images
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
        subtitle={piece.format}
        title={piece.title}
      >
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
    </div>
  );
}
