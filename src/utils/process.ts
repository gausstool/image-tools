import { sleep } from '.';
import { EnumImageFormat, EnumImageType, EnumScaleType, ISize, ImageInfo } from '../types/image';
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

export interface IScaleOption {
  type: EnumScaleType;
  ratio: number;
  width: number;
}

export interface ProcessOption {
  type: EnumImageType;
  quality: number;
  scale: IScaleOption;
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

function getTargetSize(dimensions: ISize, scale: IScaleOption): ISize {
  if (scale.type === EnumScaleType.RATIO) {
    return {
      width: Math.round(dimensions.width * scale.ratio),
      height: Math.round(dimensions.height * scale.ratio),
    };
  }
  return {
    width: scale.width,
    height: Math.round((scale.width * dimensions.height) / dimensions.width),
  };
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
  processOptions: ProcessOption
): Promise<ProcessResult> => {
  const { url, name: originName, blob, type: originalType, fileSize: originalSize, imageSize: dimensions } = originImage;
  const { scale, quality, type } = processOptions;
  const targetType = getTargetType(type, originalType);
  const targetSize = getTargetSize(dimensions, scale);
  await sleep(50);
  console.log(originalType, '=>', targetType, 'quality:', quality);
  // 如果目标是 SVG 格式，读取 svg 文件内容并进行压缩
  if (originalType === EnumImageType.SVG && targetType === EnumImageType.SVG) {
    return new Promise(async (resolve, reject) => {
      try {
        const svgString = await loadImageToString(originImage);
        const scaledSvg = scaleSvg(svgString as string, targetSize);
        const { optimize } = await svgoModule();
        const svgData = await optimize(scaledSvg);
        const blob = new Blob([svgData.data], { type: EnumImageFormat.SVG });
        const url = URL.createObjectURL(blob);
        resolve({
          url,
          name: replaceFileExtension(originName, 'svg'),
          blob,
          originalSize,
          type: EnumImageType.SVG,
          dimensions: targetSize,
        });
      } catch (err) {
        reject(err instanceof Error ? err : new Error('转换过程中发生错误'));
      }
    });
  }

  if (originalType !== EnumImageType.SVG && targetType === EnumImageType.SVG) {
    return Promise.reject(new Error('仅支持 SVG 到 SVG 的转换'));
  }

  if (targetType === EnumImageType.PNG) {
    return new Promise(async (resolve, reject) => {
      try {
        const { ctx, canvas } = await loadImageToCanvas(originImage, targetSize);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const buffer = imageData.data.buffer;
        const { encode } = await upngModule();
        const pngData = encode(
          [buffer],
          canvas.width,
          canvas.height,
          Math.round((100 - quality) * 2.56) // 0 表示无损压缩
        );
        const blob = new Blob([pngData], { type: EnumImageFormat.PNG });
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
      const { canvas } = await loadImageToCanvas(originImage, targetSize);
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
