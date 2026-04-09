<template>
  <div v-if="error" class="process-node-destination">
    <div class="process-node-destination-body">
      <div class="process-node-destination__error">{{ error }}</div>
    </div>
  </div>
  <div v-else class="process-node-destination">
    <div class="process-node-destination-body">
      <div class="destination-image-container">
        <el-image
          class="destination-image"
          :src="url"
          :alt="title"
          fit="contain"
          :preview-src-list="[url]"
          :initial-index="0"
        />
      </div>
      <div class="process-node-destination__file-info">
        <p class="file-info-item">
          <span>{{ name }}</span>
        </p>
        <p class="file-info-item" style="display: flex; align-items: center; gap: 4px">
          <span> {{ String(format).toUpperCase() }} {{ `${width} × ${height}` }} </span>
          <span> {{ formatFileSize(size) }} </span>
        </p>
        <div class="process-node-destination-footer">
          <span v-if="originalSize" :class="calcCompress(originalSize, size) ? 'size-down' : 'size-up'">
            {{ calcCompress(originalSize, size) ? '↓' : '↑' }}
            {{ calcCompressRate(originalSize, size) }}
          </span>
          <span v-else> </span>
          <div class="process-node-destination__button-group">
            <a :href="url" :download="name" class="process-node-destination__link" title="下载图片">
              <IconDownload></IconDownload>
            </a>
            <a href="javascript:;" @click="copyBase64" class="process-node-destination__link" title="复制 Base64">
              <IconCopy></IconCopy>
            </a>
            <a href="javascript:;" @click="emit('delete')" class="process-node-destination__link" title="删除">
              <IconDelete></IconDelete>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCopy, IconDelete, IconDownload } from '../icons';
import { ImageInfo } from '../types/image';
import { blobToBase64, copyToClipboard, formatFileSize } from '../utils';
import { calcCompress, calcCompressRate } from '../utils/image';

interface Props {
  title: string;
  image: ImageInfo;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const copyBase64 = async () => {
  const base64 = await blobToBase64(props.image.blob);
  copyToClipboard(base64);
};

const { url, name, fileSize: size, type: format, originalSize, error } = props.image;
const { width, height } = props.image.imageSize;
</script>

<style scoped>
.process-node-destination {
  gap: 16px;
  padding: 4px 16px;
  border-radius: 8px;
  background-color: #272727;
  width: 400px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.process-node-destination-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.process-node-destination-body {
  display: flex;
  gap: 10px;
}

.process-node-destination-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
}

.file-info-item {
  height: 20px;
}

.process-node-destination-footer span {
  font-size: 12px;
  color: #ccc;
}

.destination-image-container {
  height: 60px;
  width: 104px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.destination-image-container .el-image {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.destination-image-container .el-image img {
  height: 100%;
  width: 100%;
}

.destination-image-format {
  width: 24px;
  text-align: center;
}

.destination-image-format .format-text {
  font-size: 12px;
  scale: 80%;
}

.process-node-destination img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.process-node-destination__file-info {
  width: 240px;
  color: #fff;
  font-size: 0.85em;
  flex-grow: 1;
  gap: 8px;
}

.process-node-destination__file-info p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #808080;
  font-size: 12px;
}

.process-node-destination__file-info .size-up {
  color: #ff477e;
}

.process-node-destination__file-info .size-down {
  color: #28b969;
}

.process-node-destination .file-info__label {
  margin-right: 4px;
  opacity: 0.7;
}

.process-node-destination__button-group {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.process-node-destination__link {
  color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
}

.process-node-destination__link:hover {
  color: #4396f2;
}

.process-node-destination__link + .process-node-destination__link {
  margin-left: 8px;
}

button.process-node-destination__link,
.process-node-destination__link button {
  border: none;
}

.process-node-destination__error {
  height: 60px;
  width: 104px;
  color: #ff477e;
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 360px;
}
</style>
