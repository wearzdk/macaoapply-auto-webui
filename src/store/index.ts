const port = useStorage('port', location.port)
const pwd = useStorage('pwd', '')

const isShowSetting = ref(false)

export {
  port,
  pwd,
  isShowSetting,
}
