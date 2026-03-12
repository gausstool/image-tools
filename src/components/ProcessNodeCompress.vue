<template>
  <div class="image-converter__options">
    <div class="image-converter__quality">
      <label for="quality">
        <span>图像质量</span>
        <a-tooltip
          title="注意：PNG 格式使用 UPNG 压缩，JPG 格式使用 canvas 压缩，SVG 格式使用 svgo 压缩"
          color="#272727"
        >
          <InfoCircleOutlined style="margin-left: 4px; color: #1677ff" />
        </a-tooltip>
        <span class="ml-2x">:</span>
      </label>
      <a-slider
        id="quality"
        :min="0"
        :max="100"
        :value="quality"
        @change="(value: any) => emit('change', value, imageType, scaleType)"
        :tooltip="{ formatter: (value: number) => `${value}%` }"
        style="flex: 1; max-width: 300px; margin: 0 8px"
      />
      <span>{{ quality }}%</span>
    </div>
    <div class="image-converter__format">
      <label for="quality">
        <span>文件格式</span>
        <a-tooltip title="注意：相信我将矢量图转换为位图不是一个明智的选择，最好不要这么做" color="#272727">
          <InfoCircleOutlined style="margin-left: 4px; color: #1677ff" />
        </a-tooltip>
        <span class="ml-2x">:</span>
      </label>
      <a-select
        class="image-converter__select"
        style="width: 150px"
        :value="imageType"
        @change="(value: any) => emit('change', quality, value, scaleType)"
        :options="[
          { value: EnumImageType.SAME, label: '原格式' },
          { value: EnumImageType.PNG, label: 'PNG' },
          { value: EnumImageType.SVG, label: 'SVG' },
          { value: EnumImageType.JPEG, label: 'JPG' },
        ]"
      />
    </div>
    <div class="image-converter__scale">
      <label for="quality">
        <span>缩放类型</span>
        <a-tooltip title="" color="#272727">
          <InfoCircleOutlined style="margin-left: 4px; color: #1677ff" />
        </a-tooltip>
        <span class="ml-2x">:</span>
      </label>
      <a-select
        class="image-converter__select"
        style="width: 150px"
        :value="scaleType"
        @change="(value: any) => emit('change', quality, imageType, value)"
        :options="[
          { value: EnumScaleType.RATIO, label: '按倍率' },
          { value: EnumScaleType.WIDTH, label: '按宽度' },
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { Slider as ASlider, Select as ASelect, Tooltip as ATooltip } from 'ant-design-vue';
import { EnumImageType, EnumScaleType } from '../types/image';
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
</script>