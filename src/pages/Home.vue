<template>
  <div class="image-tool">
    <div class="image-tool__body">
      <div class="image-tool__input">
        <div class="image-tool__preview-title">图片配置</div>
        <ProcessNodeSource :key="sourceKey" @change="onImageSuccess" @error="onImageError" />
        <ProcessNodeCompress
          :quality="quality"
          :image-type="imageType"
          :scale-type="scaleType"
          @change="(q: number, t: EnumImageType, s: EnumScaleType) => {
            quality = q;
            imageType = t;
            scaleType = s;
          }"
        ></ProcessNodeCompress>
        <ProcessNodeScale
          :scale-type="scaleType"
          :scale-ratio="scaleRatio"
          :scale-width="scaleWidth"
          @change="(ratio: number, width: number) => {
            scaleRatio = ratio;
            scaleWidth = width;
          }"
        ></ProcessNodeScale>

        <el-button
          type="primary"
          class="image-tool__button"
          @click="processImages"
          :disabled="originalImages.length === 0 || processing"
        >
          {{ processing ? '正在处理' : '开始处理' }} ({{ originalImages.length }} 张图片)
        </el-button>
        <div v-if="originalImages.length > 0" style="margin-top: 16px; padding: 0 10px">
          <el-slider :model-value="progress" />
          <div style="text-align: center; margin-top: 8px">
            <div class="image-tool__status">处理进度：{{ progress }}%</div>
          </div>
        </div>
        <div v-if="error" class="image-tool__error">{{ error }}</div>
      </div>
      <div class="image-tool__output">
        <div v-if="originalImages.length > 0" class="image-tool__preview">
          <div class="image-tool__preview-group">
            <div class="image-tool__preview-head">
              <div class="image-tool__preview-title">原始图片</div>
              <el-icon
                class="process-node-destination__link"
                @click="handleClearOriginal"
                style="font-size: 16px; cursor: pointer"
              >
                <Delete />
              </el-icon>
            </div>
            <div class="image-tool__preview-list">
              <ProcessNodeDestination
                v-for="(image, index) in originalImages"
                :key="image.id"
                :title="`原始图片 ${index + 1}`"
                :image="image"
                @delete="handleDeleteOriginal(image)"
              />
            </div>
          </div>
          <div v-if="processedImages.length > 0" class="image-tool__preview-group">
            <div class="image-tool__preview-head">
              <div class="image-tool__preview-title">处理后图片</div>
              <el-icon
                class="process-node-destination__link"
                @click="handleClearProcessed"
                style="font-size: 16px; cursor: pointer"
              >
                <Delete />
              </el-icon>
            </div>
            <div class="image-tool__preview-list">
              <ProcessNodeDestination
                v-for="(image, index) in processedImages"
                :key="image.id"
                :title="`处理后图片 ${index + 1}`"
                :image="image"
                @delete="handleDeleteProcessed(image)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import ProcessNodeDestination from '../components/ProcessNodeDestination.vue';
import ProcessNodeScale from '../components/ProcessNodeScale.vue';
import ProcessNodeSource from '../components/ProcessNodeSource.vue';
import ProcessNodeCompress from '../components/ProcessNodeCompress.vue';
import { EnumImageType, EnumScaleType, ImageInfo } from '../types/image';
import { getImageDimensions } from '../utils';
import { compressAndScaleImage } from '../utils/process';
import { getImageType } from '../utils/image';
import './Home.css';

const sourceKey = ref<number>(0);
const originalImages = ref<ImageInfo[]>([]);
const processedImages = ref<ImageInfo[]>([]);
const processing = ref<boolean>(false);
const progress = ref<number>(0);

const quality = ref<number>(100);
const imageType = ref<EnumImageType>(EnumImageType.SAME);

const scaleType = ref<EnumScaleType>(EnumScaleType.RATIO);
const scaleRatio = ref<number>(1);
const scaleWidth = ref<number>(256);

const error = ref<string>('');

const onImageSuccess = async (files: File[]) => {
  error.value = '';
  const newProcessedImages: ImageInfo[] = [];

  for (const file of files) {
    const originalUrl = URL.createObjectURL(file);
    const dimensions = await getImageDimensions(originalUrl);
    newProcessedImages.push({
      id: uuidv4(),
      url: originalUrl,
      name: file.name,
      fileSize: file.size,
      type: getImageType(file.type),
      blob: file,
      imageSize: dimensions,
    });
  }
  originalImages.value = originalImages.value.concat(newProcessedImages);
  processedImages.value = [];
};

const onImageError = (err: Error) => {
  error.value = err instanceof Error ? err.message : '处理图片时出错';
};

const processImages = async () => {
  if (originalImages.value.length === 0) {
    error.value = '请选择图片';
    return;
  }

  processing.value = true;
  processedImages.value = [];
  try {
    error.value = '';
    progress.value = 0;

    const newProcessedImages: ImageInfo[] = [];

    for (let i = 0; i < originalImages.value.length; i++) {
      const originalImage = originalImages.value[i];
      try {
        const result = await compressAndScaleImage(originalImage, {
          type: imageType.value,
          quality: quality.value,
          scale: {
            type: scaleType.value,
            ratio: scaleRatio.value,
            width: scaleWidth.value
          },
        });

        newProcessedImages.push({
          id: originalImage.id,
          url: result.url,
          name: result.name,
          fileSize: result.blob.size,
          type: result.type,
          blob: result.blob,
          originalSize: result.originalSize,
          imageSize: result.dimensions,
        });
      } catch (err: any) {
        newProcessedImages.push({
          ...originalImage,
          error: err.message,
        });
      }
      processedImages.value = newProcessedImages;
      progress.value = Math.round(((i + 1) / originalImages.value.length) * 100);
    }

    processedImages.value = newProcessedImages;
  } catch (err: any) {
    onImageError(err);
  }
  processing.value = false;
};

const handleDeleteOriginal = (image: ImageInfo) => {
  URL.revokeObjectURL(image.url);
  originalImages.value = originalImages.value.filter(item => item.id !== image.id);
  const processedImage = processedImages.value.find(item => item.id === image.id);
  if (processedImage) {
    URL.revokeObjectURL(processedImage.url);
  }
  processedImages.value = processedImages.value.filter(item => item.id !== image.id);
  sourceKey.value = sourceKey.value + 1;
};

const handleDeleteProcessed = (image: ImageInfo) => {
  URL.revokeObjectURL(image.url);
  processedImages.value = processedImages.value.filter(item => item.id !== image.id);
};

const handleClearOriginal = () => {
  originalImages.value.forEach(image => {
    URL.revokeObjectURL(image.url);
  });
  processedImages.value.forEach(image => {
    URL.revokeObjectURL(image.url);
  });
  originalImages.value = [];
  processedImages.value = [];
  sourceKey.value = sourceKey.value + 1;
};

const handleClearProcessed = () => {
  processedImages.value.forEach(image => {
    URL.revokeObjectURL(image.url);
  });
  processedImages.value = [];
};
</script>