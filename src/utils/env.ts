export interface EnviromentSetting {
  BaseUrl: string
}
export default {
  BaseUrl: process.env.REACT_APP_BASE_API_URL,
} as EnviromentSetting
