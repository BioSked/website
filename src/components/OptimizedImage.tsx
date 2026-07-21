import type { ImageMetadata } from 'astro';

interface OptimizedImageProps {
  src: ImageMetadata;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Optimized image component for React components
 * Ensures proper dimensions, lazy loading, and async decoding for better performance
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  loading = 'lazy',
  width,
  height,
  style
}: OptimizedImageProps) {
  // When only one dimension is given, derive the other from the intrinsic
  // aspect ratio so the width/height hint pair never distorts.
  const w = width || (height ? Math.round((src.width * height) / src.height) : src.width);
  const h = height || (width ? Math.round((src.height * width) / src.width) : src.height);
  return (
    <img
      src={src.src}
      alt={alt}
      width={w}
      height={h}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
