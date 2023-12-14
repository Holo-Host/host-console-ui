<script lang="ts" setup>
import HAppImage from '@uicommon/components/HAppImage.vue'
import ToggleSwitch from '@uicommon/components/ToggleSwitch.vue'
import { capitalize } from 'vue'
import { EHostingPlan } from '@/types/types'

interface HApp {
  id: string
  name: string
  icon: string | null
  hostingPlan: string
}

const props = defineProps<{
  hApp: HApp
}>()

const emit = defineEmits(['update:plan'])

function togglePlan(value: boolean): void {
  emit('update:plan', { id: props.hApp.id, value: value ? EHostingPlan.paid : EHostingPlan.free })
}
</script>

<template>
  <div class="happs-list-item">
    <div class="happs-list-item--left">
      <div class="happs-list-item__happ-icon">
        <HAppImage
          :happ="props.hApp"
          size="30px"
          class="happ-details__left-column-happ-image"
        />
      </div>

      <span class="happs-list-item__happ-name">
        {{ props.hApp.name }}
      </span>
    </div>

    <div class="happs-list-item__happ-toggle">
      <ToggleSwitch
        :toggle-on="props.hApp.hostingPlan === EHostingPlan.paid"
        class="happs-list-item__happ-toggle-switch"
        @toggle="togglePlan"
      />
      <span>{{ capitalize(props.hApp.hostingPlan) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.happs-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: solid 2px rgba(96, 108, 139, 0.1);

  &--left {
    display: flex;
    align-items: center;
  }

  &__happ-icon {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__happ-name {
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    margin-left: 4px;
  }

  &__happ-toggle {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 24px;
    font-weight: 700;
  }

  &__happ-toggle-switch {
    scale: 0.6;
  }
}
</style>
