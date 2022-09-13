<template>
  <BaseCard
    :is-loading="isLoading"
    :is-error="isError"
    :title="$t('hosted_happs.title')"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <div class="body">
      <div
        v-if="!data || data.length === 0"
        class="no-happs"
      >
        {{ $t('hosted_happs.no_happs') }}
      </div>
      <div
        v-for="happ in data"
        v-else
        :key="happ.id"
        class="top-happ-row"
      >
        <div class="logo">
          <MissingLogoExIcon class="ex-icon" />
        </div>
        <div class="top-happ-details">
          <div class="card-info-row">
            {{ happ.name }}
          </div>
          <div class="card-info-row margin-bottom">
            {{ happ.sourceChains }} source chains
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import MissingLogoExIcon from 'components/icons/MissingLogoExIcon'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },

  isLoading: {
    type: Boolean,
    required: true
  }
})

const isError = computed(() => !!props.data.error)

const emit = defineEmits(['try-again-clicked'])
</script>

<style scoped>
.body {
  height: 100%;
}

.top-happ-row {
  display: flex;
  margin-bottom: 4px;
}

.margin-bottom {
  margin-bottom: 10px;
}

.logo {
  border: 1px solid #e7e9ed;
  box-sizing: border-box;
  border-radius: 5px;
  width: 37px;
  height: 37px;
  margin: 0 16px;
}

.no-happs {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--grey-color);
  font-weight: bold;
}
</style>
