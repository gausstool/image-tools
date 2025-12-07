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

export enum EnumScaleType {
  RATIO = 'ratio',
  WIDTH = 'width',
}

export interface ISize {
    width: number;
    height: number;
}

export interface ImageInfo {
  id: string;
  url: string;
  name: string;
  fileSize: number;
  originalSize?: number;
  type: EnumImageType;
  blob: Blob;
  imageSize: ISize,
  error?: string;
}