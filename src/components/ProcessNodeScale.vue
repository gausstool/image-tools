<template>
  <div v-if="scaleType === EnumScaleType.RATIO" class="image-scale__controls">
    <div class="image-scale__dimensions">
      <el-radio-group :model-value="scaleRatio" @change="(value: number) => emit('change', value, scaleWidth)">
        <el-radio
          v-for="value in scaleOptions"
          :key="value"
          :value="value"
          class="image-scale__radio"
        >
          {{ value }}x
        </el-radio>
      </el-radio-group>
    </div>
  </div>
  <div v-else class="image-scale__controls">
    <div class="image-scale-width__dimensions">
      <el-input-number
        :model-value="scaleWidth"
        :min="1"
        :max="4096"
        @change="(value: number) => {
          if (value !== null && value >= 1 && value <= 4096) {
            emit('change', scaleRatio, value);
          }
        }"
        style="width: 150px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio, ElInputNumber } from 'element-plus';
import { EnumScaleType } from '../types/image';
import './ProcessNodeScale.css';

interface Props {
  scaleType: EnumScaleType;
  scaleRatio: number;
  scaleWidth: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'change', ratio: number, width: number): void;
}>();

const scaleOptions = [0.25, 0.5, 1, 2, 4];
</script>