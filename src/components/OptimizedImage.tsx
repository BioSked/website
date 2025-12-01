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
  return (
    <img
      src={src.src}
      alt={alt}
      width={width || src.width}
      height={height || src.height}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
