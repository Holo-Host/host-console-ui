<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import HAppDetailsContent from '@/components/hAppDetails/HAppDetailsContent.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'
import { useHposInterface } from '@/interfaces/HposInterface'
import { isError as isErrorPredicate } from '@/types/predicates'

const { getHAppDetails } = useHposInterface()
const currentRoute = useRoute()

const hApp = ref<HAppDetails>()
const isLoading = ref(false)
const isError = ref(false)

const breadcrumbs = computed(() => [
  {
    label: 'hApps',
    path: '/happs'
  },
  {
    label: isLoading.value ? 'Loading...' : hApp.value?.name ?? 'Something went wrong'
  }
])

async function getData(): Promise<void> {
  isError.value = false

  isLoading.value = true
  const result = await getHAppDetails(currentRoute.params.id)
  isLoading.value = false

  if (isErrorPredicate(result) && result.error) {
    isError.value = true
  }

  if (!isErrorPredicate(result)) {
    hApp.value = result
  }

  isLoading.value = false
}

onMounted(() => {
  getData()
})

onMounted(async () => {})
</script>

<template>
  <PrimaryLayout
    :breadcrumbs="breadcrumbs"
    :is-content-error="isError"
    @try-again-clicked="getData"
  >
    <template v-if="!isLoading && !isError">
      <HAppDetailsContent
        v-if="hApp"
        :h-app="hApp"
      />
    </template>
  </PrimaryLayout>
</template>
