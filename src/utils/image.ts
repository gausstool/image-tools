import { EnumImageFormat, EnumImageType, ImageInfo } from '../types/image';
import { ProcessOptions } from './process';

export function getImageType(value: string): EnumImageType {
  if (value === 'image/avif') {
    return EnumImageType.AVIF;
  }
  if (value === 'image/jpeg') {
    return EnumImageType.JPEG;
  }
  if (value === 'image/png') {
    return EnumImageType.PNG;
  }
  if (value === 'image/webp') {
    return EnumImageType.WEBP;
  }
  if (value === 'image/svg+xml') {
    return EnumImageType.SVG;
  }
  return EnumImageType.UNKNOWN;
}

export function getImageFormat(value: EnumImageType): EnumImageFormat {
  if (value === EnumImageType.AVIF) {
    return EnumImageFormat.AVIF;
  }
  if (value === EnumImageType.JPEG) {
    return EnumImageFormat.JPEG;
  }
  if (value === EnumImageType.PNG) {
    return EnumImageFormat.PNG;
  }
  if (value === EnumImageType.WEBP) {
    return EnumImageFormat.WEBP;
  }
  if (value === EnumImageType.SVG) {
    return EnumImageFormat.SVG;
  }
  return EnumImageFormat.PNG;
}

/**
 * 计算图片使用RGBA存储时的理论最大大小
 * @param width 图片宽度（像素）
 * @param height 图片高度（像素）
 * @param options 配置选项
 * @returns 理论最大大小（字节）
 */
export function calculateMaxImageSize(
  width: number,
  height: number,
  options: {
    bitsPerChannel?: number; // 每个通道的位数，默认8位
    channels?: number; // 通道数，默认4（RGBA）
    includeAlpha?: boolean; // 是否包含Alpha通道，默认true
  } = {}
): number {
  const { bitsPerChannel = 8, channels = 4, includeAlpha = true } = options;

  // 参数验证
  if (width <= 0 || height <= 0) {
    throw new Error('Width and height must be positive numbers');
  }

  if (bitsPerChannel <= 0) {
    throw new Error('Bits per channel must be a positive number');
  }

  if (channels < 1 || channels > 4) {
    throw new Error('Channels must be between 1 and 4');
  }

  // 计算每个像素的位数
  const bitsPerPixel = bitsPerChannel * (includeAlpha ? channels : channels - 1);

  // 计算总位数
  const totalBits = width * height * bitsPerPixel;

  // 转换为字节（8位 = 1字节）
  const totalBytes = Math.ceil(totalBits / 8);

  return totalBytes;
}

export function calcCompress(originalSize: number, currentSize: number) {
  return currentSize < originalSize;
}

export function calcCompressRate(originalSize: number, currentSize: number) {
  if (currentSize > originalSize) {
    return `${((100 * (currentSize - originalSize)) / originalSize).toFixed(2)}%`;
  }

  if (currentSize < originalSize) {
    return `${((100 * (originalSize - currentSize)) / originalSize).toFixed(2)}%`;
  }
  return '0%';
}

export function replaceFileExtension(originalFileName: string, newExtension: string): string {
  const list = originalFileName.split('.');
  list[list.length - 1] = newExtension;
  return list.join('.');
}

export function loadImageToString(originImage: ImageInfo) {
  const { blob } = originImage;
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      const svgString = e.target!.result;
      resolve(svgString);
    };
    reader.onerror = reject;
    reader.readAsText(blob); // 以文本形式读取文件
  });
}

export function loadImageToCanvas(
  originImage: ImageInfo,
  processOptions: ProcessOptions
): Promise<{
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}> {
  const { url, dimensions } = originImage;
  const { scale } = processOptions;
  return new Promise(async (resolve, reject) => {
    try {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(dimensions.width * scale);
        canvas.height = Math.round(dimensions.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建canvas上下文'));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve({ ctx, canvas });
      };
      img.onerror = e => {
        reject(e);
      };

      img.src = url;
    } catch (err) {
      reject(err instanceof Error ? err : new Error('转换过程中发生错误'));
    }
  });
}

/**
 * 缩放 SVG 图片
 * 使用 DOMParser 和 XMLSerializer
 * @param svgString
 * @param scale
 * @returns
 */
export function scaleSvg(svgString: string, scale: number): string {
  // 解析 SVG 字符串
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = svgDoc.querySelector('svg');
  if (svgElement) {
    // 获取原始大小
    const width = svgElement.getAttribute('width');
    const height = svgElement.getAttribute('height');
    // 调整大小
    svgElement.setAttribute('width', `${Number(width) * scale}`);
    svgElement.setAttribute('height', `${Number(height) * scale}`);
    // 转换回字符串
    const newSvgString = new XMLSerializer().serializeToString(svgDoc);
    return newSvgString;
  }
  return svgString;
}
