"use client";

import Image from "next/image";
import { useState } from "react";

const fallback = "/archive-photograph-unavailable.svg";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ArchivePhoto({ src, alt, className = "", priority = false, sizes = "(max-width: 800px) 100vw, 50vw" }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? fallback : src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
