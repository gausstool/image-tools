<template>
  <span class="mac-dots">
    <span class="mac-dot mac-dot--red"></span>
    <span class="mac-dot mac-dot--yellow"></span>
    <span class="mac-dot mac-dot--green"></span>
  </span>
</template>

<script setup lang="ts">
</script>

<style scoped>
.mac-dots {
  display: flex;
  gap: 8px;
  margin: 0;
}

.mac-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.mac-dot--red {
  background: #ff5f56;
}

.mac-dot--yellow {
  background: #ffbd2e;
}

.mac-dot--green {
  background: #27c93f;
}
</style>