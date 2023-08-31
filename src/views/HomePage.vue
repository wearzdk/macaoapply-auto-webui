<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Logs from '../components/Logs.vue'
import { doQuit, doRestart, doStart } from '../api/config'
import Config from './Config.vue'

const logInst = ref<InstanceType<typeof Logs>>()

function addLog(content: string) {
  logInst.value?.addLog(content)
}

// 日志 ws
let websocket: WebSocket
const wsUrl = 'ws://localhost:12369/ws'
function createWebSocket() {
  try {
    websocket = new WebSocket(wsUrl)
    init() // 初始化websocket
  }
  catch (e: any) {
    addLog(`WebSocket连接失败:${e.toString()}`)
    reconnect() // 重连
  }
}
function init() {
  websocket.onclose = function () {
    addLog('WebSocket连接关闭')
  }
  websocket.onerror = function () {
    addLog('WebSocket连接出错，重新连接...')
    reconnect()
  }
  websocket.onopen = function () {
    addLog('WebSocket连接成功')
  }
  websocket.onmessage = function (event) {
    addLog(event.data)
  }
}
// 重连接
function reconnect() {
  if (websocket.readyState !== 3) { // 排除连接不存在和已经关闭的情况
    return
  }
  setTimeout(() => {
    createWebSocket() // 延迟一段时间重连，避免连接过于频繁
  }, 2000)
}
createWebSocket()
</script>

<template>
  <div class="flex w-80vw mx-a mt-40px h-auto sm:h-80vh flex-wrap">
    <!-- left -->
    <div class="h-full w-full md:w-1/2 lg:w-2/5">
      <h3 class="text-2xl font-bold">
        配置
      </h3>
      <Config />
      <!-- 功能区 -->
      <div class="border-t border-border mt-15px mr-20px">
        <div class="flex justify-between items-center px-10px py-5px">
          <h4 class="text-lg font-bold">
            功能
          </h4>
        </div>
        <div class="mt-2 flex children:mr-10px">
          <button
            class="btn-base btn-primary px-3 py-2 "
            @click="doRestart()"
          >
            重启预约
          </button>
          <button
            class="btn-base btn-primary px-3 py-2 "
            @click="doStart()"
          >
            启动
          </button>
          <button
            class="btn-base btn-primary px-3 py-2 "
            @click="doQuit()"
          >
            停止
          </button>
        </div>
      </div>
    </div>
    <!-- right -->
    <div class="flex flex-col w-full md:w-1/2 lg-3/5">
      <div class="flex justify-between">
        <h3 class="text-2xl font-bold">
          日志
        </h3>
        <!-- <button
          class="btn-base btn-primary px-2 ml-10px hover:bg-fill2"
          @click="reconnect()"
        >
          重连
        </button> -->
      </div>
      <Logs ref="logInst" class="mt-15px w-full h-70vh" height="auto" />
    </div>
  </div>
</template>

<style scoped>
</style>
