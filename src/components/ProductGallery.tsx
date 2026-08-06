"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ProductGalleryProps {
  /** Full-size gallery image paths (first entry is shown initially). */
  images: string[];
  /** Descriptive alt text for the main product image. */
  alt: string;
  /** Product name — used for thumbnail alt text and aria labels. */
  title: string;
}

/**
 * Product image gallery: main image plus clickable thumbnails.
 * Clicking a thumbnail swaps the main image in place instantly — no
 * navigation. All gallery images are "warmed" (pre-fetched) after the
 * page goes idle, and also as soon as the user hovers/touches any
 * thumbnail, so the swap never waits on the network.
 */
export default function ProductGallery({ images, alt, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [warmed, setWarmed] = useState(images.length <= 1);

  const warm = useCallback(() => setWarmed(true), []);

  // Warm the rest of the gallery once the browser is idle (fallback: a
  // short timeout) so clicking a thumbnail swaps instantly.
  useEffect(() => {
    if (images.length <= 1) return;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setWarmed(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setWarmed(true), 1500);
    return () => clearTimeout(id);
  }, [images.length]);

  const activeSrc = images[active] ?? images[0];

  return (
    <div>
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-2xl group"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.13)" }}
      >
        <Image
          src={activeSrc}
          alt={active === 0 ? alt : `${alt} — view ${active + 1}`}
          width={760}
          height={560}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ height: "clamp(320px, 42vw, 520px)" }}
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(45,42,38,0.12) 0%, transparent 60%)" }}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3 mt-4" role="group" aria-label={`${title} image gallery`}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              onPointerEnter={warm}
              onTouchStart={warm}
              onFocus={warm}
              aria-label={`View image ${i + 1} of ${title}`}
              aria-current={i === active ? "true" : undefined}
              className="overflow-hidden rounded-lg cursor-pointer transition-all duration-200"
              style={{
                width: "84px",
                aspectRatio: "4 / 3",
                padding: 0,
                border: i === active ? "2px solid var(--color-gold-text)" : "2px solid transparent",
                opacity: i === active ? 1 : 0.75,
                boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
              }}
            >
              <Image
                src={src}
                alt={`${title} image ${i + 1}`}
                width={112}
                height={84}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Hidden pre-fetch of the non-active gallery images. Rendered with
          the exact same dimensions as the main image so the optimised
          variants land in the browser cache and the swap is instant. */}
      {warmed && images.length > 1 && (
        <div aria-hidden="true" style={{ display: "none" }}>
          {images
            .filter((_, i) => i !== active)
            .map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={760}
                height={560}
                loading="eager"
                fetchPriority="low"
              />
            ))}
        </div>
      )}
    </div>
  );
}
