<template>
  <div v-if="scaleType === EnumScaleType.RATIO" class="image-scale__controls">
    <div class="image-scale__dimensions">
      <a-radio-group :value="scaleRatio" @change="(e: any) => emit('change', e.target.value, scaleWidth)">
        <a-radio
          v-for="value in scaleOptions"
          :key="value"
          :value="value"
          class="image-scale__radio"
        >
          {{ value }}x
        </a-radio>
      </a-radio-group>
    </div>
  </div>
  <div v-else class="image-scale__controls">
    <div class="image-scale-width__dimensions">
      <a-input-number
        :value="scaleWidth"
        :min="1"
        :max="4096"
        @change="(value: any) => {
          const num = Number(value);
          if (!Number.isNaN(num) && num >= 1 && num <= 4096) {
            emit('change', scaleRatio, num);
          }
        }"
        style="width: 150px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Radio as ARadioGroup, Radio as ARadio, InputNumber as AInputNumber } from 'ant-design-vue';
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