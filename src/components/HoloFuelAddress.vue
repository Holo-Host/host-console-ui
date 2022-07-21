<template>
  <div class="holofuel-address">
    <span class="holofuel-address__explanation">
      {{ $t('$.identicon_explanation') }}
    </span>

    <p
      v-if="displayName"
      class="holofuel-address__display-name"
    >
      {{ displayName }}
    </p>

    <span class="holofuel-address__identicon">
      <IdentIcon
        v-if="publicKey"
        size="80"
        :hash="publicKey"
        role="img"
        aria-label="Agent Identity Icon"
      />
    </span>

    <p class="holofuel-address__hash-id">
      {{ publicKey }}
    </p>

    <p class="holofuel-address__tip">
      <b>{{ $t('$.tip') }}</b> {{ $t('$.identicon_click') }}
    </p>
  </div>
</template>

<script setup>
import IdentIcon from './IdentIcon.vue'

defineProps({
  isHorizontal: {
    type: Boolean,
    default: false
  },

  displayName: {
    type: String,
    default: ''
  },

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

  &__hash-id {
    font-weight: 700;
  }

  &__display-name {
    margin-top: 36px;
  }

  &__hash-id {
    margin-top: 8px;
  }

  &__tip {
    margin-top: 32px;
    padding: 0 40px;
  }
}
</style>
