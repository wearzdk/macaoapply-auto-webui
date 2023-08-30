<script lang="ts" setup>
interface LogItem {
  id: number
  content: string
}

const allLogs = ref<LogItem[]>([
  {
    id: 0,
    content: '日志初始化',
  },
])
const logContent = ref<HTMLElement>()

let id = 0

function addLog(content: string) {
  allLogs.value.push({
    id: id++,
    content,
  })
  // 滚动到底部
  nextTick(() => {
    if (!logContent.value)
      return
    logContent.value.scrollTop = logContent.value.scrollHeight
  })
}

// 定时清理日志
whenever(
  () => allLogs.value.length > 100,
  () => {
    allLogs.value = allLogs.value.slice(-50)
  },
)

defineExpose({
  addLog,
})
</script>

<template>
  <div class="crx-log">
    <div ref="logContent" class="crx-log-content">
      <div v-for="item in allLogs" :key="item.id" class="crx-log-item">
        <div class="crx-log-item">
          <span class="crx-log-item-content">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.crx-log {
  width: 100%;
  border-radius: 12px;
  &-content {
    flex: 1;
    overflow-y: auto;
    height: 100%;
    @apply bg-dark-1 dark:bg-dark-3;
    padding: 8px 10px;
    &::-webkit-scrollbar {
      width: 8px;
      @apply bg-dark-1;
    }
    &::-webkit-scrollbar-track {
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      @apply bg-dark-4;
    }
    .crx-log-item {
      @apply text-light-1 text-sm leading-sm;
      .crx-log-item-time {
        @apply text-light-2;
        margin-right: 10px;
      }
    }
  }
}
</style>
