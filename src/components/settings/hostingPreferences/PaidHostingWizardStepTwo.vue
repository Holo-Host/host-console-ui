<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SearchInput from '@/components/SearchInput.vue'
import HAppsListItem from '@/components/settings/hostingPreferences/HAppsListItem.vue'
import type { PaidHostingWizardStep } from '@/constants/ui'
import { isHAppsPropPredicate } from '@/constants/ui'
import type { MappedHApp, UpdateHAppPlanProps } from '@/types/types'
import { EHostingPlan } from '@/types/types'

const { t } = useI18n()

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()

const emit = defineEmits(['update:value'])

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
    return props.steps[1]?.props && isHAppsPropPredicate(props.steps[1]?.props)
      ? props.steps[1]?.props.hApps.filter((hApp: MappedHApp) =>
        hApp.name.toLowerCase().includes(searchValue.value.toLowerCase())
      )
      : []
  } else {
    return props.steps[1]?.props && isHAppsPropPredicate(props.steps[1]?.props)
      ? props.steps[1]?.props.hApps
      : []
  }
})

const paidHAppsCount = computed(() =>
  props.steps[1]?.props && isHAppsPropPredicate(props.steps[1]?.props)
    ? props.steps[1]?.props.hApps.filter((hApp) => hApp.hostingPlan === EHostingPlan.paid).length
    : 0
)

// Required to re-render the toggles
const setAllTriggered = ref(0)

function setAll(plan: EHostingPlan): void {
  setAllTriggered.value = setAllTriggered.value + 1
  emit('update:value', { prop: 'plan', value: { id: 'all', value: plan } })
}

function updateSingle(data: UpdateHAppPlanProps): void {
  emit('update:value', {
    prop: 'plan',
    value: { id: data.id, value: data.value }
  })
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
      <div
        v-for="hApp in foundHApps"
        :key="hApp.id"
        class="paid-hosting-modal-wizard-step-two__form-happ"
      >
        <HAppsListItem
          :h-app="hApp"
          @update:plan="updateSingle"
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

@media screen and (max-width: 1050px) {
  .paid-hosting-modal-wizard-step {
    width: 100%;
  }

  .paid-hosting-modal-wizard-step-two {
    &__form {
      width: 100%;
      padding: 16px 8px 0;
    }
  }
}
</style>
