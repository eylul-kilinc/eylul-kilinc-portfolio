'use client';

import { useEffect, useRef } from 'react';

function preloadImageUrl(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    const finish = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };
    img.onload = finish;
    img.onerror = () => resolve();
    img.src = src;
  });
}

/** Load and decode each unique URL; resolves when all attempts finish (failed URLs still resolve). */
export function preloadImageUrls(urls: readonly string[]): Promise<void> {
  const unique = [...new Set(urls)];
  if (unique.length === 0) return Promise.resolve();
  return Promise.all(unique.map(preloadImageUrl)).then(() => undefined);
}

/**
 * Warm the browser cache (non-blocking). Prefer {@link preloadImageUrls} when you must wait before paint.
 */
export function useImagePreload(urls: readonly string[]) {
  const urlsRef = useRef(urls);
  urlsRef.current = urls;
  const serialized = urls.join('\0');

  useEffect(() => {
    const list = urlsRef.current;
    if (list.length === 0) return;

    const imgs: HTMLImageElement[] = [];
    for (const src of list) {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      imgs.push(img);
    }

    return () => {
      for (const img of imgs) {
        img.src = '';
      }
    };
  }, [serialized]);
}
