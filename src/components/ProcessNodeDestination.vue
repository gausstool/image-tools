<template>
  <div v-if="error" class="process-node-destination">
    <div class="process-node-destination-body">
      <div class="process-node-destination__error">{{ error }}</div>
    </div>
  </div>
  <div v-else class="process-node-destination">
    <div class="process-node-destination-body">
      <div class="destination-image-container">
        <a-image class="destination-image" :src="url" :alt="title" />
      </div>
      <div class="process-node-destination__file-info">
        <p class="file-info-item">
          <span>{{ name }}</span>
        </p>
        <p class="file-info-item">
          <span>
            {{ format.toUpperCase() }} {{ `${width} × ${height}` }}
          </span>
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
            <a
              href="javascript:;"
              @click="copyBase64"
              class="process-node-destination__link"
              title="复制 Base64"
            >
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
import { Image as AImage } from 'ant-design-vue';
import { IconCopy, IconDelete, IconDownload } from '../icons';
import { ImageInfo } from '../types/image';
import { blobToBase64, copyToClipboard, formatFileSize } from '../utils';
import { calcCompress, calcCompressRate } from '../utils/image';
import './ProcessNodeDestination.css';

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