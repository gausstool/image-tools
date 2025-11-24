import React from 'react';
import { IconAvif, IconCopy, IconDelete, IconDownload, IconJpg, IconPng, IconSvg, IconWebp } from '../icons';
import { EnumImageType, ImageInfo } from '../types/image';
import { blobToBase64, copyToClipboard, formatFileSize } from '../utils';
import './ProcessNodeDestination.css';
import { calcCompress, calcCompressRate, calculateMaxImageSize } from '../utils/image';
import { Image } from 'antd';

interface DesinationProps {
  title: string;
  image: ImageInfo;
  onDelete: () => void;
}

const ProcessNodeDestination: React.FC<DesinationProps> = ({ title, image, onDelete }) => {
  const copyBase64 = async () => {
    const base64 = await blobToBase64(image.blob);
    copyToClipboard(base64);
  };
  const { url, name, size, type: format, originalSize } = image;
  const { width, height } = image.dimensions;
  return (
    <div className="process-node-destination">
      <div className="destination-image-format">
        <div className="format-icon">
          {format === EnumImageType.AVIF ? (
            <IconAvif />
          ) : format === EnumImageType.JPEG ? (
            <IconJpg />
          ) : format === EnumImageType.PNG ? (
            <IconPng />
          ) : format === EnumImageType.SVG ? (
            <IconPng />
          ) : format === EnumImageType.WEBP ? (
            <IconWebp />
          ) : (
            ''
          )}
        </div>
        <div className="format-text">{format.toUpperCase()}</div>
      </div>
      <div className="destination-image-container">
        <Image className="destination-image" src={url} alt={title} />
      </div>
      <div className="process-node-destination__file-info">
        <p className="image-filename">
          <span>文件名称: {name}</span>
        </p>
        <p>
          <span>图片尺寸: {`${width} × ${height}`} </span>
        </p>

        <p>
          <span>文件大小: {formatFileSize(size)} </span>
          {originalSize ? (
            <span className={calcCompress(originalSize, size) ? 'size-down' : 'size-up'}>
              {calcCompress(originalSize, size) ? '↓' : '↑'}
              {calcCompressRate(originalSize, size)}{' '}
            </span>
          ) : (
            ''
          )}
        </p>
      </div>
      <div className="process-node-destination__button-group">
        <a href={url} download={name} className="process-node-destination__link" title="下载图片">
          <IconDownload></IconDownload>
        </a>
        <a href="javascript:;" onClick={copyBase64} className="process-node-destination__link" title="复制 Base64">
          <IconCopy></IconCopy>
        </a>
        <a href="javascript:;" onClick={onDelete} className="process-node-destination__link" title="删除">
          <IconDelete></IconDelete>
        </a>
      </div>
    </div>
  );
};

export default ProcessNodeDestination;
