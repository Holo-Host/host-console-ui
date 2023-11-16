<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import HAppImage from '@uicommon/components/HAppImage.vue'
import { computed } from 'vue'
import type { HApp } from '@/interfaces/HposInterface'
import { isError as isErrorPredicate } from '@/types/predicates'

const props = defineProps<{
  data: HApp[] | { error: unknown }
  isLoading: boolean
}>()

const isError = computed((): boolean => isErrorPredicate(props.data) && !!props.data.error)

const emit = defineEmits(['try-again-clicked'])
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="isError"
    :title="$t('hosted_happs.title')"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <div class="body">
      <div
        v-if="!props.data || props.data.length === 0"
        class="no-happs"
      >
        {{ $t('hosted_happs.no_enabled_happs') }}
      </div>
      <div
        v-for="happ in props.data"
        v-else
        :key="happ.id"
        class="top-happ-row"
      >
        <HAppImage
          :happ="happ"
          size="37px"
        />
        <div class="top-happ-details">
          <div class="card-info-row">
            {{ happ.name }}
          </div>
          <div class="card-info-row margin-bottom">
            {{ $t('usage.users', happ.hostedAgents, { count: happ.hostedAgents }) }}
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
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

.no-happs {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--grey-color);
  font-size: 15px;
  font-weight: bold;
	text-align: center;
}
</style>
