<template>
  <div class="redirect">
    <h1>🌱 天天养基</h1>
    <p>正在跳转至在线平台…</p>
    <a href="https://qdii.vuejs-core.cn/">如未自动跳转，请点击这里</a>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.location.replace('https://qdii.vuejs-core.cn/')
})
</script>

<style>
.redirect {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  gap: 8px;
}
</style>
