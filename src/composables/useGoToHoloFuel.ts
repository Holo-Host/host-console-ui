import { useModals } from '@uicommon/composables/useModals.js'
import { EModal } from '@uicommon/types/ui.js'
import { kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from '@/constants'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

export function useGoToHoloFuel(): { goToHoloFuel: () => void } {
  function goToHoloFuel(): void {
    const isModalDisabled = localStorage.getItem(kDontShowGoToHoloFuelModalAgainLSKey) === 'true'

    if (isModalDisabled) {
      window.open(kHoloFuelUrl, '_blank')?.focus()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      showModal(EModal.go_to_holofuel)
    }
  }

  return {
    goToHoloFuel
  }
}
