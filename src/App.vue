<template>
  <div class="layout">
    <div class="layout__container app-container">
      <div class="layout__container--inner">
        <div class="layout-header">
          <MacDots></MacDots>
          <div class="layout-header-right">
            <h1 class="layout-header-title">
              欢迎使用图片工具箱，免费在线压缩您的 SVG, WebP, JPEG 和 PNG 图片，纯本地运行无需上传至服务器
            </h1>
          </div>
          <a class="github-link" href="https://github.com/gausstool/image-tools">Github</a>
        </div>
        <div class="layout__body">
          <Home />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MacDots from './components/MacDots.vue';
import Home from './pages/Home.vue';
import './App.css';
</script>