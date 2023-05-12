<script setup lang="ts">
import Identicon from '@uicommon/components/Identicon.vue'
import { encodeAgentId } from '@uicommon/utils/agent'
import LeaveSiteIcon from '../icons/LeaveSiteIcon.vue'
import { useGoToHoloFuel } from '@/composables/useGoToHoloFuel'

const props = withDefaults(
  defineProps<{
    agentAddress?: Uint8Array | null
  }>(),
  {
    agentAddress: null
  }
)

const { goToHoloFuel } = useGoToHoloFuel()
</script>

<template>
  <div class="holofuel-address">
    <span class="holofuel-address__explanation">
      {{ $t('$.identicon_explanation') }}
    </span>

    <div class="holofuel-address__address">
      <span class="holofuel-address__identicon">
        <Identicon
          v-if="props.agentAddress"
          size="40"
          :agent-key="props.agentAddress"
          role="img"
          aria-label="Agent Identity Icon"
        />
      </span>

      <span class="holofuel-address__hash-id">
        {{ encodeAgentId(props.agentAddress) }}
      </span>
    </div>

    <p class="holofuel-address__tip">
      <b>{{ $t('$.tip') }}</b> {{ $t('$.identicon_click') }}
    </p>

    <p
      class="holofuel-address__link"
      @click="goToHoloFuel"
    >
      <LeaveSiteIcon />
      <span class="holofuel-address__link-label">
        {{ $t('$.go_to_holofuel') }}
      </span>
    </p>
  </div>
</template>

<style lang="scss">
.holofuel-address {
  display: flex;
  flex-direction: column;

  &__address {
    display: flex;
    align-items: center;
    margin-top: 24px;
  }

  &__hash-id {
    margin-left: 10px;
    font-weight: 700;
  }

  &__tip {
    margin-top: 18px;
  }

  &__link {
    display: flex;
    align-items: center;
    margin-top: 6px;
    cursor: pointer;

    &-label {
      margin-left: 8px;
      text-decoration: underline;
    }
  }
}
</style>
