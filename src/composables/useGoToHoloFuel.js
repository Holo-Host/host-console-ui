import { useModals } from '@uicommon/composables/useModals'
import { EModal } from '@uicommon/types/ui'
import { kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from '@/constants'

const { showModal } = useModals()

export function useGoToHoloFuel() {
  function goToHoloFuel() {
    const isModalDisabled = localStorage.getItem(kDontShowGoToHoloFuelModalAgainLSKey) === 'true'

    if (isModalDisabled) {
      window.open(kHoloFuelUrl, '_blank').focus()
    } else {
      showModal(EModal.go_to_holofuel)
    }
  }

  return {
    goToHoloFuel
  }
}
