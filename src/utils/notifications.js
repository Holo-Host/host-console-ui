import mitt from 'mitt'

export const ENotification = {
  showBusyState: 'showBusyState',
  hideBusyState: 'hideBusyState',
  showAlert: 'showAlert',
  showBanner: 'showBanner',
  hideBanner: 'hideBanner'
}

export const EOverlayType = {
  loading: 0,
  message: 1
}

export const ENotificationType = {
  info: 0,
  warning: 1,
  error: 2
}

export const EOverlayTheme = {
  light: 0,
  dark: 1
}

const notifications = mitt()

export const { addObserver, removeObserver, postNotification, clear } = {
  addObserver: notifications.on,
  removeObserver: notifications.off,
  postNotification: notifications.emit,
  clear: notifications.all.clear
}
