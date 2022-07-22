<template>
  <div class="holofuel-address">
    <span class="holofuel-address__explanation">
      {{ $t('$.identicon_explanation') }}
    </span>

    <div class="holofuel-address__address">
      <span class="holofuel-address__identicon">
        <IdentIcon
          v-if="publicKey"
          size="40"
          :hash="publicKey"
          role="img"
          aria-label="Agent Identity Icon"
        />
      </span>

      <span class="holofuel-address__hash-id">
        {{ publicKey }}
      </span>
    </div>

    <p class="holofuel-address__tip">
      <b>{{ $t('$.tip') }}</b> {{ $t('$.identicon_click') }}
    </p>

    <p class="holofuel-address__link">
      <LeaveSiteIcon />
      <span class="holofuel-address__link-label">
        {{ $t('$.go_to_holofuel') }}
      </span>
    </p>
  </div>
</template>

<script setup>
import IdentIcon from '@uicommon/components/IdentIcon2.vue'
import LeaveSiteIcon from '../icons/LeaveSiteIcon.vue'

defineProps({
  publicKey: {
    type: String,
    required: true
  }
})
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
