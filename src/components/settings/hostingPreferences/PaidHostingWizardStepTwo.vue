<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SearchInput from '@/components/SearchInput.vue'
import type { PaidHostingWizardStep } from '@/constants/ui'
import { HApp } from '@/interfaces/HposInterface'
import { useDashboardStore } from '@/store/dashboard'
import { isError as isErrorPredicate } from '@/types/predicates'

const { t } = useI18n()

const dashboardStore = useDashboardStore()

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()

const emit = defineEmits(['go-to-next-step'])

const isLoading = ref(false)

const hApps = computed((): HApp[] | { error: unknown } => dashboardStore.hostedHApps)

onMounted(async () => {
  if (isErrorPredicate(hApps.value) || !hApps.value?.length) {
    try {
      isLoading.value = true
      await dashboardStore.getHostedHApps()
    } finally {
      isLoading.value = false
    }
  }
})

interface SearchChangeProps {
  value: string
  isActive: boolean
}

const searchValue = ref('')
const searchIsActive = ref(false)

function onSearchChange({ value, isActive }: SearchChangeProps): void {
  searchIsActive.value = isActive
  searchValue.value = value
}

const foundHApps = computed((): HApp[] => {
  if (searchIsActive.value && searchValue.value) {
    return isErrorPredicate(hApps.value)
      ? []
      : hApps.value.filter((hApp: HApp) =>
        hApp.name.toLowerCase().includes(searchValue.value.toLowerCase())
      )
  } else {
    return isErrorPredicate(hApps.value) ? [] : hApps.value
  }
})
</script>

<template>
  <div
    class="paid-hosting-modal-wizard-step"
    data-test-paid-hosting-wizard-step-two
  >
    <span
      class="paid-hosting-modal-wizard-step__title"
      data-test-paid-hosting-wizard-step-two-title
    >
      {{ $t(props.steps[1].title) }}
    </span>

    <p class="paid-hosting-modal-wizard-step__description">
      {{ $t(props.steps[1].description) }}
    </p>

    <SearchInput
      :value="searchValue"
      :is-disabled="isLoading"
      :placeholder="t('$.search_happ')"
      @update="onSearchChange"
    />

		{{ foundHApps }}
  </div>
</template>

<style lang="scss" scoped>
.paid-hosting-modal-wizard-step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    margin-top: 8px;
    font-size: 18px;
    justify-self: start;
    font-weight: 800;
  }

  &__description {
    margin-top: 8px;
  }
}
</style>
