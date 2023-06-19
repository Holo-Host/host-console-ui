import { useModals } from '@uicommon/composables/useModals.js'
import { EModal } from '@/constants/ui'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

export function useGoToSpringboard(): { goToSpringboard: () => void } {
  function goToSpringboard(): void {
    console.log('goToSpringboard')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    showModal(EModal.go_to_springboard)
  }

  return {
    goToSpringboard
  }
}
