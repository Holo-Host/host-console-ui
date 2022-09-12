<template>
  <BaseCard
    :is-loading="isLoading"
    :is-error="isError"
    title="Top Hosted hApps"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <div class="body">
      <div v-if="!data || data.length === 0">
        Currently no hApps to display
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
            -- HF
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

.card-spinner {
  height: 156px;
}
</style>
