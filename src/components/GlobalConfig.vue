<script lang='ts' setup>
import { isShowSetting, port, pwd } from '../store'

const PWD = '23XIE0XHTQ1HG'

const tip = refAutoReset('', 2000)

onMounted(() => {
  if (port.value === '')
    isShowSetting.value = true
  if (pwd.value === '' || pwd.value !== PWD)
    isShowSetting.value = true
})

function saveConfig() {
  if (pwd.value !== PWD) {
    tip.value = '密码错误'
    return
  }
  tip.value = '保存成功'
  isShowSetting.value = false
  setTimeout(() => {
    location.reload()
  }, 1000)
}
</script>

<template>
  <!-- 对话框 -->
  <div v-if="isShowSetting" class="fixed inset-0 z-50 flex justify-center items-center">
    <div class="absolute inset-0 bg-black" />
    <div class="relative bg-canvas rounded-lg overflow-y-auto px-2 py-2">
      <div class="flex justify-between items-center px-10px py-5px">
        <h4 class="text-lg font-bold">
          403 需要验证
        </h4>
      </div>
      <div class="px-10px py-5px">
        <p class="text-base py-1">
          服务端口
        </p>
        <input
          v-model="port"
          type="text"
          class="input w-2/3"
        >
        <p class="text-base py-1">
          验证密码
        </p>
        <input
          v-model="pwd"
          type="password"
          class="input w-2/3"
        >
        <div class="flex">
          <button
            class="btn-base btn-primary px-2 py-1 mt-10px"
            @click="saveConfig"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
