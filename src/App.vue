<script lang="ts" setup>
import GlobalConfig from './components/GlobalConfig.vue'

const dark = useDark()
const toggleDark = useToggle(dark)
</script>

<template>
  <div>
    <div class="absolute right-0 top-0 mt-2 mr-2">
      <button
        class="inline-flex items-center btn-base p-1 hover:bg-fill2"
        :class="{
          'bg-fill2': dark,
        }"
        @click="toggleDark()"
      >
        <span v-if="dark" class="i-mdi-weather-night" />
        <span v-else class="i-mdi-weather-sunny" />
      </button>
    </div>
    <GlobalConfig />
    <router-view />
  </div>
</template>

<style>
body {
  font-family: -apple-system, Noto Sans, Helvetica Neue, Helvetica, Nimbus Sans L, Arial, Liberation Sans, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Source Han Sans SC, Source Han Sans CN, Microsoft YaHei, Wenquanyi Micro Hei, WenQuanYi Zen Hei, ST Heiti, SimHei, WenQuanYi Zen Hei Sharp, sans-serif;
  @apply text-text1 bg-canvas;
}

#nprogress .bar{
  @apply !bg-primary
}

html {
  overflow-y: overlay;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

::-webkit-scrollbar:horizontal {
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  @apply bg-fill2;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-fill3;
  cursor: pointer;
}
</style>
