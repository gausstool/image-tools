<template>
  <div class="image-converter__options">
    <div class="image-converter__quality">
      <label for="quality">
        <span>图像质量</span>
        <el-tooltip
          content="注意：PNG 格式使用 UPNG 压缩，JPG 格式使用 canvas 压缩，SVG 格式使用 svgo 压缩"
          placement="top"
        >
          <el-icon style="margin-left: 4px; color: #409eff; cursor: pointer">
            <InfoFilled />
          </el-icon>
        </el-tooltip>
        <span class="ml-2x">:</span>
      </label>
      <el-slider
        id="quality"
        :min="0"
        :max="100"
        v-model="qualityValue"
        @change="(value: any) => emit('change', value, imageType, scaleType)"
        :format-tooltip="(value: number) => `${value}%`"
        style="flex: 1; max-width: 300px; margin: 0 8px"
      />
      <span>{{ quality }}%</span>
    </div>
    <div class="image-converter__format">
      <label for="quality">
        <span>文件格式</span>
        <el-tooltip content="注意：相信我将矢量图转换为位图不是一个明智的选择，最好不要这么做" placement="top">
          <el-icon style="margin-left: 4px; color: #409eff; cursor: pointer">
            <InfoFilled />
          </el-icon>
        </el-tooltip>
        <span class="ml-2x">:</span>
      </label>
      <el-select
        class="image-converter__select"
        style="width: 150px"
        :model-value="imageType"
        @change="(value: EnumImageType) => emit('change', quality, value, scaleType)"
      >
        <el-option :value="EnumImageType.SAME" label="原格式" />
        <el-option :value="EnumImageType.PNG" label="PNG" />
        <el-option :value="EnumImageType.SVG" label="SVG" />
        <el-option :value="EnumImageType.JPEG" label="JPG" />
      </el-select>
    </div>
    <div class="image-converter__scale">
      <label for="quality">
        <span>缩放类型</span>
        <el-tooltip content="" placement="top">
          <el-icon style="margin-left: 4px; color: #409eff; cursor: pointer">
            <InfoFilled />
          </el-icon>
        </el-tooltip>
        <span class="ml-2x">:</span>
      </label>
      <el-select
        class="image-converter__select"
        style="width: 150px"
        :model-value="scaleType"
        @change="(value: EnumScaleType) => emit('change', quality, imageType, value)"
      >
        <el-option :value="EnumScaleType.RATIO" label="按倍率" />
        <el-option :value="EnumScaleType.WIDTH" label="按宽度" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue';
import { EnumImageType, EnumScaleType } from '../types/image';
import { ref } from 'vue';
import './ProcessNodeCompress.css';

interface Props {
  quality: number;
  imageType: EnumImageType;
  scaleType: EnumScaleType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'change', quality: number, format: EnumImageType, scale: EnumScaleType): void;
}>();

const qualityValue = ref(props.quality);
</script>