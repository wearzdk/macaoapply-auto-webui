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
}

export interface AppConfig {
  cjy: CjyConfig
  user: UserConfig
  appointment: AppointmentConfig
}

const BaseUrl = 'http://localhost:12369'

interface R<T> {
  code: number
  msg: string
  data: T
}

function fetchConfig() {
  return fetch(`${BaseUrl}/api/v1/config`, {
    method: 'GET',
  }).then((res) => { return res.json() }) as Promise<R<AppConfig>>
}

function setConfig(config: AppConfig) {
  return fetch(`${BaseUrl}/api/v1/config`, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => { return res.json() }) as Promise<R<null>>
}

function doRestart() {
  return fetch(`${BaseUrl}/api/v1/restart`, {
    method: 'POST',
  })
}

export {
  fetchConfig,
  setConfig,
  doRestart,
}
