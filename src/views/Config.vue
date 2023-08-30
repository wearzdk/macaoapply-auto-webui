<script lang='ts' setup>
import { formatDate } from '@vueuse/core'
import { type AppConfig, fetchConfig, setConfig } from '../api/config'

const config = ref<AppConfig>()
const dateStr = ref<string>('')
watch(dateStr, (val) => {
  if (!config?.value)
    return
  const date = new Date(val)
  // unix
  config.value.appointment.appointmentDate = date.getTime() / 1000
  console.log(config.value.appointment.appointmentDate)
})

onMounted(async () => {
  config.value = (await fetchConfig()).data
  const date = new Date(config.value.appointment.appointmentDate * 1000)
  dateStr.value = formatDate(date, 'YYYY/MM/DD')
})
const saveTip = refAutoReset('', 2000)

async function saveConfig() {
  setConfig(config.value as AppConfig).then(() => {
    saveTip.value = '保存成功'
  }).catch(() => {
    saveTip.value = '保存失败'
  })
}
</script>

<template>
  <div v-if="config">
    <!-- 用户信息 -->
    <h4 class="label-title mt-20px">
      用户信息
    </h4>
    <div class="forms">
      <label for="">
        <span>用户名</span>
        <input v-model="config.user.username" type="text">
      </label>
      <label for="">
        <span>密码</span>
        <input v-model="config.user.password" type="password">
      </label>
      <label for="">
        <span>iss</span>
        <input v-model="config.user.iss" disabled type="text">
      </label>
    </div>
    <!-- 验证码识别服务（超级鹰） -->
    <h4 class="label-title">
      验证码识别服务（超级鹰）
    </h4>
    <div class="forms">
      <label for="">
        <span>软件ID</span>
        <input v-model="config.cjy.softId" type="text">
      </label>
      <label for="">
        <span>用户名</span>
        <input v-model="config.cjy.username" type="text">
      </label>
      <label for="">
        <span>密码（md5）</span>
        <input v-model="config.cjy.password" type="text">
      </label>
    </div>
    <!-- 申请信息 -->
    <h4 class="label-title">
      申请信息
    </h4>
    <div class="forms">
      <label for="">
        <span>车牌号</span>
        <input v-model="config.appointment.plateNumber" type="text">
      </label>
      <label for="">
        <span>申请日期</span>
        <input v-model="dateStr" type="text" placeholder="示例：2023/09/02">
      </label>
    </div>
    <!-- 保存 -->
    <div class="flex">
      <button class="btn-primary px-2 py-1" @click="saveConfig">
        保存
      </button>
      <!-- tip -->
      <span class="ml-15px text-base py-1">{{ saveTip }}</span>
    </div>
  </div>
</template>

<style scoped>
.label-title {
  @apply text-lg font-bold;
}
.forms {
  @apply mt-10px md:pr-20px;
}
.forms label {
  @apply flex items-center justify-start mb-10px;
}
.forms label span {
  @apply w-1/4;
}
.forms label input {
  @apply input flex-1;
}
</style>
