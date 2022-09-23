import { EProjectNotification, postNotification } from '@uicommon/utils/notifications'
import { kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from '@/constants'

export function useGoToHoloFuel() {
  function goToHoloFuel() {
    const isModalDisabled = localStorage.getItem(kDontShowGoToHoloFuelModalAgainLSKey) === 'true'

    if (isModalDisabled) {
      window.open(kHoloFuelUrl, '_blank').focus()
    } else {
      postNotification(EProjectNotification.showGoToHolofuelModal)
    }
  }

  return {
    goToHoloFuel
  }
}
