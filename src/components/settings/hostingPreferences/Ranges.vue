<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    numbers: number[]
    value: number
    min: number
    max: number
    numPartitions: number
  }>()

  const partitionStyles = computed(() => {
    if( !props.numbers || !props.numbers.length ) return []
        const stepSize = Math.ceil((props.max - props.min) / props.numPartitions)

        let partitions = [... new Array(props.numPartitions+1)].map(() => 0)

        props.numbers.forEach(number => {
          const partitionIndex = Math.floor((( number - props.min)/stepSize))
          partitions[partitionIndex]++
        })

        const max = Math.max(...partitions)

        const highestHighlightIndex =  Math.floor((props.value/stepSize))

        const styles = partitions.map((partition, i) => {
          const isHighlight = i <= highestHighlightIndex
          const color = isHighlight ? '#606C8B' : `#AEB7CC`
          const height = `${Math.floor((partition/max) * 100)}%`
          return {
            height,
            'background-color': color
          }
        })

        return styles
  })
</script>

<template>
  <div class='ranges'>
    <div v-for="(pStyle, i) in partitionStyles" class="partition" :key="i" :style="pStyle" />
  </div>
</template>

<style lang="scss" scoped>
.ranges {
  height: 78px;
  display: flex;
  align-items: flex-end;
}

.partition {
  border-radius: 3px 3px 0px 0px;
  flex-grow: 1;
  margin: 0 1px;
}
</style>