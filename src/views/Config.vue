<script lang='ts' setup>
import { formatDate } from '@vueuse/core'
import { type AppConfig, fetchConfig, setConfig } from '../api/config'

const config = ref<AppConfig>()

const dateForm = reactive({
  dateStr: '',
  startTime: '',
  endTime: '',
})
watch(dateForm, () => {
  if (!config?.value)
    return
  console.log(dateForm)

  const date = new Date(dateForm.dateStr)
  // unix
  config.value.appointment.appointmentDate = date.getTime() / 1000
  console.log(config.value.appointment.appointmentDate)

  // HH:mm
  const startTime = dateForm.startTime.split(':')
  // const endTime = dateForm.endTime.split(':')

  const today = new Date()
  console.log(today)
  config.value.appointment.startTime = Math.floor(today.setHours(Number(startTime[0]), Number(startTime[1])) / 1000)
  // config.value.appointment.endTime = Math.floor(today.setHours(Number(endTime[0]), Number(endTime[1])) / 1000)
})

onMounted(async () => {
  config.value = (await fetchConfig()).data
  const date = new Date(config.value.appointment.appointmentDate * 1000)
  dateForm.dateStr = formatDate(date, 'YYYY-MM-DD')
  dateForm.startTime = formatDate(new Date(config.value.appointment.startTime * 1000), 'HH:mm')
  // dateForm.endTime = formatDate(new Date(config.value.appointment.endTime * 1000), 'HH:mm')
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
        <input v-model="dateForm.dateStr" type="date" placeholder="示例：2023/09/02">
      </label>
      <label for="">
        <span>开始时间</span>
        <input v-model="dateForm.startTime" type="time">
      </label>
      <!-- <label for="">
        <span>结束时间</span>
        <input v-model="dateForm.endTime" type="time">
      </label> -->
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
