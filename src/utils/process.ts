import { EnumImageType, ImageInfo } from '../types/image';
import { getImageFormat, loadImageToCanvas, loadImageToString, replaceFileExtension, scaleSvg } from './image';
const upngModule = () => import('upng-js');
const svgoModule = () => import('svgo');

export interface ProcessResult {
  url: string;
  name: string;
  type: EnumImageType;
  blob: Blob; // 压缩后的文件对象
  dimensions: { width: number; height: number };
  originalSize: number;
}

export interface ProcessOptions {
  scale: number;
  quality: number;
  type: EnumImageType;
}

function getValidType(format: EnumImageType): EnumImageType {
  if (Object.values(EnumImageType).includes(format as EnumImageType)) {
    return format as EnumImageType;
  } else {
    return EnumImageType.PNG;
  }
}

function getTargetType(type: EnumImageType, originalFormat: EnumImageType): EnumImageType {
  if (type === EnumImageType.SAME) {
    return getValidType(originalFormat);
  }
  return getValidType(type as unknown as EnumImageType);
}

/**
 * 图片大小压缩 / 图片尺寸放缩
 * @Param originName 原始文件名
 * @param dimensions
 * @param processOptions
 * @returns
 */
export const compressAndScaleImage = async (
  originImage: ImageInfo,
  processOptions: ProcessOptions
): Promise<ProcessResult> => {
  const { url, name: originName, blob, type: originalType, size: originalSize, dimensions } = originImage;
  const { scale, quality, type } = processOptions;
  const targetType = getTargetType(type, originalType);
  // 如果目标是 SVG 格式，读取 svg 文件内容并进行压缩
  if (originalType === EnumImageType.SVG && targetType === EnumImageType.SVG) {
    return new Promise(async (resolve, reject) => {
      try {
        const svgString = await loadImageToString(originImage);
        const scaledSvg = scaleSvg(svgString as string, scale);
        const { optimize } = await svgoModule();
        const svgData = await optimize(scaledSvg);
        const blob = new Blob([svgData.data], { type: EnumImageType.SVG });
        const url = URL.createObjectURL(blob);
        resolve({
          url,
          name: replaceFileExtension(originName, 'svg'),
          blob,
          originalSize,
          type: EnumImageType.SVG,
          dimensions: dimensions,
        });
      } catch (err) {
        reject(err instanceof Error ? err : new Error('转换过程中发生错误'));
      }
    });
  }

  if (targetType === EnumImageType.PNG) {
    return new Promise(async (resolve, reject) => {
      try {
        const { ctx, canvas } = await loadImageToCanvas(originImage, processOptions);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const buffer = [imageData.data.buffer] as ArrayBuffer[];
        const { encode } = await upngModule();
        const pngData = encode(
          buffer,
          canvas.width,
          canvas.height,
          Math.floor((100 - quality) * 2.56) // 0 表示无损压缩
        );
        const blob = new Blob([pngData], { type: EnumImageType.PNG });
        const url = URL.createObjectURL(blob);
        resolve({
          url,
          name: replaceFileExtension(originName, 'png'),
          blob,
          originalSize,
          type: EnumImageType.PNG,
          dimensions: {
            width: canvas.width,
            height: canvas.height,
          },
        });
      } catch (err) {
        reject(err instanceof Error ? err : new Error('转换过程中发生错误'));
      }
    });
  }

  // 其他格式使用原有的 canvas.toBlob 方法
  return new Promise(async (resolve, reject) => {
    try {
      const { canvas } = await loadImageToCanvas(originImage, processOptions);
      const onBlob: BlobCallback = (blob: Blob | null) => {
        if (!blob) {
          reject(new Error('转换失败，浏览器可能不支持' + targetType + '编码'));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve({
          url,
          name: replaceFileExtension(originName, targetType),
          blob,
          originalSize,
          type: targetType,
          dimensions: {
            width: canvas.width,
            height: canvas.height,
          },
        });
      };
      canvas.toBlob(onBlob, getImageFormat(targetType), quality / 100);
    } catch (err) {
      reject(err instanceof Error ? err : new Error('转换过程中发生错误'));
    }
  });
};
