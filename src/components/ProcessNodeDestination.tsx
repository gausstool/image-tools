import { Image } from 'antd';
import React from 'react';
import { IconCopy, IconDelete, IconDownload } from '../icons';
import { ImageInfo } from '../types/image';
import { blobToBase64, copyToClipboard, formatFileSize } from '../utils';
import { calcCompress, calcCompressRate } from '../utils/image';
import './ProcessNodeDestination.css';

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
  const { url, name, size, type: format, originalSize, error } = image;
  const { width, height } = image.dimensions;
  return error ? (
    <div className="process-node-destination">
      <div className="process-node-destination__error">{error}</div>
    </div>
  ) : (
    <div className="process-node-destination">
      <div className="destination-image-container">
        <Image className="destination-image" src={url} alt={title} />
      </div>
      <div className="process-node-destination__file-info">
        <p className="image-filename">
          <span>{name}</span>
        </p>
        <p>
          <span>{format.toUpperCase()} {`${width} × ${height}`} </span>
        </p>
        <p>
          <span>{formatFileSize(size)} </span>
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
