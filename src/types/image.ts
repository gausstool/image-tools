export enum EnumImageType {
  SAME = 'same',
  AVIF = 'avif',
  JPEG = 'jpg',
  PNG = 'png',
  WEBP = 'webp',
  SVG = 'svg',
  UNKNOWN = 'unknown'
}

export enum EnumImageFormat {
  AVIF = 'image/avif',
  JPEG = 'image/jpeg',
  PNG = 'png',
  WEBP = 'webp',
  SVG = 'image/svg+xml',
}

export interface ImageInfo {
  id: string;
  url: string;
  name: string;
  size: number;
  originalSize?: number;
  type: EnumImageType;
  blob: Blob;
  dimensions: {
    width: number;
    height: number;
  }
}