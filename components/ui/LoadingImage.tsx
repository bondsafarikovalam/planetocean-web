"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** `next/image` with a shimmer + spinner while loading, then a blur-to-sharp fade in. Parent must be positioned. */
export function LoadingImage({ className, alt, onLoad, onError, ...props }: ImageProps) {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && (
        <div aria-hidden className="absolute inset-0 overflow-hidden bg-softmist">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />
          <span className="absolute left-1/2 top-1/2 -ml-6 -mt-6 size-12 animate-spin rounded-full border-[3px] border-cyan/25 border-t-cyan" />
        </div>
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={(e) => {
          setDone(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setDone(true);
          onError?.(e);
        }}
        className={cn(
          "transition-[opacity,filter,scale] duration-1000 ease-tide",
          done ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-xl",
          className,
        )}
      />
    </>
  );
}
