import { port } from '../store'

export interface CjyConfig {
  username: string
  password: string
  softId: string
}

export interface CookiesItem {
  Name: string
  Value: string
  Path: string
  Domain: string
  Expires: string
  RawExpires: string
  MaxAge: number
  Secure: boolean
  HttpOnly: boolean
  SameSite: number
  Raw: string
  Unparsed: string
}

export interface UserConfig {
  username: string
  password: string
  iss: string
  cookies: CookiesItem[]
}

export interface AppointmentConfig {
  plateNumber: string
  appointmentDate: number
  startTime: number
  endTime: number
}

export interface YunMaOption {
  token: string
}

type CaptchaEngine = 'cjy' | 'yunma'

export interface AppConfig {
  cjy: CjyConfig
  yunma: YunMaOption
  user: UserConfig
  appointment: AppointmentConfig
  captchaEngine: CaptchaEngine
  enableCaptchaRefresh: boolean
  captchaRefreshRound: number
  ua: string
  port: string
  speed: number
}

const localUrl = location.hostname

const BaseUrl = computed(() => {
  return `http://${localUrl}:${port.value}`
})

interface R<T> {
  code: number
  msg: string
  data: T
}

function fetchConfig() {
  return fetch(`${BaseUrl.value}/api/v1/config`, {
    method: 'GET',
  }).then((res) => { return res.json() }) as Promise<R<AppConfig>>
}

function setConfig(config: AppConfig) {
  return fetch(`${BaseUrl.value}/api/v1/config`, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => { return res.json() }) as Promise<R<null>>
}

function doRestart() {
  return fetch(`${BaseUrl.value}/api/v1/restart`, {
    method: 'POST',
  })
}

function doQuit() {
  return fetch(`${BaseUrl.value}/api/v1/quit`, {
    method: 'POST',
  })
}

function doStart() {
  return fetch(`${BaseUrl.value}/api/v1/start`, {
    method: 'POST',
  })
}

function getStatus() {
  return fetch(`${BaseUrl.value}/api/v1/status`, {
    method: 'GET',
  }).then((res) => { return res.json() }) as Promise<R<{
    running: boolean
  }>>
}

export {
  fetchConfig,
  setConfig,
  doRestart,
  doQuit,
  doStart,
  getStatus,
}
