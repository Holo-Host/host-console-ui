<script lang="ts" setup>
import CircleSpinner from '@uicommon/components/CircleSpinner.vue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SearchInput from '@/components/SearchInput.vue'
import HAppsListItem from '@/components/settings/hostingPreferences/HAppsListItem.vue'
import type { PaidHostingWizardStep } from '@/constants/ui'
import type { HApp } from '@/interfaces/HposInterface'
import { useDashboardStore } from '@/store/dashboard'
import { isError as isErrorPredicate } from '@/types/predicates'

enum EHostingPlan {
  free = 'free',
  paid = 'paid'
}

const { t } = useI18n()

const dashboardStore = useDashboardStore()

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()

const isLoading = ref(false)
const hApps = ref(dashboardStore.hostedHApps)

interface MappedHApp {
  id: string
  name: string
  icon: string
  hostingPlan: string
}

const mappedHApps = ref<MappedHApp[]>([])

onMounted(async () => {
  if (isErrorPredicate(hApps.value) || !hApps.value?.length) {
    try {
      isLoading.value = true
      await dashboardStore.getHostedHApps()

      if (!isErrorPredicate(hApps.value)) {
        mappedHApps.value = dashboardStore.hostedHApps.map((hApp: HApp) => ({
          id: hApp.id,
          name: hApp.name,
          icon: hApp.icon ?? null,
          hostingPlan: EHostingPlan.paid
        }))
      } else {
        mappedHApps.value = []
      }
    } finally {
      isLoading.value = false
    }
  } else {
    mappedHApps.value = hApps.value.map((hApp: HApp): MappedHApp[] => ({
      id: hApp.id,
      name: hApp.name,
      icon: hApp.icon ?? null,
      hostingPlan: EHostingPlan.paid
    }))
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

const foundHApps = computed((): MappedHApp[] => {
  if (searchIsActive.value && searchValue.value) {
    return mappedHApps.value.filter((hApp: HApp) =>
      hApp.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  } else {
    return isErrorPredicate(hApps.value) ? [] : mappedHApps.value
  }
})

const paidHAppsCount = computed(
  () => mappedHApps.value.filter((hApp) => hApp.hostingPlan === EHostingPlan.paid).length
)

// Required to re-render the toggles
const setAllTriggered = ref(0)

function setAll(plan: EHostingPlan): void {
  setAllTriggered.value = setAllTriggered.value + 1
  mappedHApps.value = mappedHApps.value.map((hApp) => ({
    ...hApp,
    hostingPlan: plan
  }))
}

interface UpdateHAppPlanProps {
  id: string
  value: EHostingPlan
}

function updateHAppPlan(data: UpdateHAppPlanProps): void {
  mappedHApps.value = mappedHApps.value.map((mappedHApp) => ({
    ...mappedHApp,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    hostingPlan: mappedHApp.id === data.id ? data.value : mappedHApp.hostingPlan
  }))
}
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
      {{ props.steps[1]?.title }}
    </span>

    <p class="paid-hosting-modal-wizard-step__description">
      {{ props.steps[1]?.description }}
    </p>

    <SearchInput
      :value="searchValue"
      :is-disabled="isLoading"
      :placeholder="t('$.search_happ')"
      @update="onSearchChange"
    />

    <div class="paid-hosting-modal-wizard-step-two__sub-section">
      <span>{{ paidHAppsCount }} {{ t('hosting_preferences.toggle_paid_hosting_modal.step_two.paid_happs') }}</span>
      <div>
        <span
          class="paid-hosting-modal-wizard-step-two__sub-section-button"
          @click="setAll(EHostingPlan.free)"
        >
          {{ t('hosting_preferences.toggle_paid_hosting_modal.step_two.set_all_free') }}
        </span>
        <span
          class="paid-hosting-modal-wizard-step-two__sub-section-button paid-hosting-modal-wizard-step-two__sub-section-button--paid"
          @click="setAll(EHostingPlan.paid)"
        >
          {{ t('hosting_preferences.toggle_paid_hosting_modal.step_two.set_all_paid') }}
        </span>
      </div>
    </div>

    <div class="paid-hosting-modal-wizard-step-two__form">
      <CircleSpinner v-if="isLoading" />

      <div
        v-for="hApp in foundHApps"
        :key="hApp.id"
        class="paid-hosting-modal-wizard-step-two__form-happ"
      >
        <HAppsListItem
          :h-app="hApp"
          :re-render-toggle="setAllTriggered"
          @update:plan="updateHAppPlan"
        />
      </div>
    </div>
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

  &-two {
    &__sub-section {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 22px;
      font-size: 12px;
      font-weight: 700;
      color: var(--grey-color);

      &-button {
        cursor: pointer;
        text-decoration: underline;
        font-weight: 800;

        &--paid {
          margin-left: 8px;
        }
      }
    }

    &__form {
      width: 420px;
      height: 320px;
      overflow: scroll;
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      align-items: start;
      background-color: rgba(249, 250, 251, 1);
      border-radius: 12px;
      padding: 0 20px;
      color: var(--grey-color);
      line-height: 19px;
      font-size: 12px;
      font-weight: 600;
    }

    &__form-happ {
      width: 100%;
    }
  }
}
</style>
