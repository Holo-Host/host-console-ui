<template>
  <BaseCard title="Top Hosted hApps">
    <CircleSpinner v-if="isLoading" class="card-spinner" />
    <div v-else class="body">
      <div v-if="!data || data.length === 0">
        Currently no hApps to display
      </div>
      <div
        v-for="happ in data"
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
import CircleSpinner from '@uicommon/components/CircleSpinner'
import MissingLogoExIcon from 'components/icons/MissingLogoExIcon'

defineProps({
  data: {
    type: Object,
    required: true
  },

  isLoading: {
    type: Boolean,
    required: true
  }
})
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
