<template>
  <div class="holofuel-address">
    <span class="holofuel-address__explanation">
      {{ $t('$.identicon_explanation') }}
    </span>

    <div class="holofuel-address__address">
      <span class="holofuel-address__identicon">
        <Identicon
          v-if="agentAddress"
          size="40"
          :agent-key="agentAddress"
          role="img"
          aria-label="Agent Identity Icon"
        />
      </span>

      <span class="holofuel-address__hash-id">
        {{ agentAddress }}
      </span>
    </div>

    <p class="holofuel-address__tip">
      <b>{{ $t('$.tip') }}</b> {{ $t('$.identicon_click') }}
    </p>

    <p
      class="holofuel-address__link"
      @click="showGoToHolofuelModal"
    >
      <LeaveSiteIcon />
      <span class="holofuel-address__link-label">
        {{ $t('$.go_to_holofuel') }}
      </span>
    </p>
  </div>
</template>

<script setup>
import Identicon from '@uicommon/components/Identicon.vue'
import { postNotification, ENotification } from '@uicommon/utils/notifications'
import { EProjectNotification } from '../../utils/notifications'
import LeaveSiteIcon from '../icons/LeaveSiteIcon.vue'

defineProps({
	agentAddress: {
    type: Uint8Array,
    default: []
  }
})

function showGoToHolofuelModal() {
  const isModalDisabled =
    localStorage.getItem('host-console-ui-dont-show-go-to-holofuel-modal-again') === 'true'

  if (isModalDisabled) {
    postNotification(ENotification.showBusyState)
    // TODO: Implement login logic

    setTimeout(() => {
      postNotification(ENotification.hideBusyState)
      // eslint-disable-next-line no-magic-numbers
    }, 2000)
  } else {
    postNotification(EProjectNotification.showGoToHolofuelModal)
  }
}
</script>

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
