export const kDontShowGoToHoloFuelModalAgainLSKey =
  'holo.host-console.dont-show-go-to-holoFuel-modal-again'

export const kHoloFuelUrl = `https://${location.host}/holofuel`

export const kCoreAppVersionLSKey = 'holo.host-console.core-app-version'

export const kAuthTokenLSKey = 'authToken'

export enum EEnvironment {
  local = 'local',
  development = 'devNet',
  qa = 'qaNet',
  alpha = 'alphaNet',
  production = 'mainNet'
}

const kSpringboardURL: Record<string, string> = {
  [EEnvironment.local]: 'https://local-springboard.holo.host:8081',
  [EEnvironment.development]: 'https://springboard.dev.holotest.net',
  [EEnvironment.qa]: 'https://springboard.qa.holotest.net',
  [EEnvironment.alpha]: 'https://springboard.holo.host',
  [EEnvironment.production]: 'https://springboard.holo.host'
}

export const kSpringboardUrl = import.meta.env.VITE_ENV
  ? kSpringboardURL[import.meta.env.VITE_ENV]
  : kSpringboardURL[EEnvironment.local]
