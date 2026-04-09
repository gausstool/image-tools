<template>
  <div class="process-node-source">
    <div
      :class="['process-node-source__upload', { 'process-node-source__upload--dragging': isDragging }]"
      @click="handleUploadClick"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <h3>点击或拖放文件/文件夹到此处</h3>
      <p>支持 SVG, WebP, JPG, PNG 等格式</p>
      <input
        ref="fileInputRef"
        type="file"
        @change="handleFileChange"
        accept="image/*"
        multiple
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getImageType } from '../utils/image';
import { EnumImageType } from '../types/image';

interface Props {
  onChange: (files: File[]) => void;
  onError: (e: Error) => void;
}

const props = defineProps<Props>();

const isDragging = ref<boolean>(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

const processFiles = async (items: DataTransferItemList | DataTransferItem[] | FileList) => {
  const images: File[] = [];
  const processItem = async (item: DataTransferItem | File) => {
    if (item instanceof File) {
      if (getImageType(item.type) !== EnumImageType.UNKNOWN) {
        images.push(item);
      }
      return;
    }
    if (item.kind === 'file') {
      const entry = item.webkitGetAsEntry();
      if (entry && entry.isDirectory) {
        const dirReader = (entry as any).createReader();
        const entries = await new Promise<FileSystemEntry[]>((resolve) => {
          dirReader.readEntries((entries: any) => resolve(entries));
        });

        for (const entry of entries) {
          if (entry.isFile) {
            const fileEntry = entry as FileSystemFileEntry;
            const file = await new Promise<File>((resolve) => {
              fileEntry.file((file) => resolve(file));
            });
            if (getImageType(file.type) !== EnumImageType.UNKNOWN) {
              images.push(file);
            }
          }
        }
      } else if (entry && entry.isFile) {
        const fileEntry = entry as FileSystemFileEntry;
        const file = await new Promise<File>((resolve) => {
          fileEntry.file((file) => resolve(file));
        });
        if (getImageType(file.type) !== EnumImageType.UNKNOWN) {
          images.push(file);
        }
      }
    }
  };

  if (items instanceof FileList) {
    await Promise.all(Array.from(items).map(processItem));
  } else {
    await Promise.all(Array.from(items).map(processItem));
  }

  if (images.length === 0) {
    props.onError(new Error('未找到图片文件'));
    return;
  }

  props.onChange(images);
};

const handleDrop = async (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;

  const items = e.dataTransfer?.items;
  if (items && items.length > 0) {
    await processFiles(items);
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleUploadClick = () => {
  fileInputRef.value?.click();
};

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length) {
    await processFiles(target.files);
  }
};
</script>

<style scoped>
.process-node-source {
  width: 360px;
}

.process-node-source__upload {
  color: #fff;
  border: 2px dashed #666;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-color: #2196f3;
  background-color: rgba(33, 150, 243, 0.1);
}

.process-node-source__upload:hover {
  border-style: solid;
}
</style>