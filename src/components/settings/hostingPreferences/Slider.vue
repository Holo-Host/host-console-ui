<script setup lang="ts">
    import { computed, ref, onMounted, watch } from 'vue'
    import VueSlider from 'vue-slider-component'
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()

    const props = defineProps<{
        value: number
        disabled: boolean
        min: number,
        max: number,
        logarithmic?: boolean,
        tooltipFormatter?: Function
    }>()

    const emit = defineEmits(['input'])

    onMounted(async () => {
      updateSliderValue()
    })

    const sliderValue = ref(props.value)

    watch(sliderValue, () => emit('input', sliderValue.value))

    const formatter = (val:number) => {
      const transformedVal = transformVal(val)

      if (props.tooltipFormatter) {
        return props.tooltipFormatter(transformedVal)
      } else {
        return `${t('hosting_preferences.pricing_histogram.chargeable_rate')}\n${transformedVal && transformedVal.toLocaleString()} HF`
      }
    }

    const transformVal = (val:number) => {
      return props.logarithmic ? getLogVal(val) : val
    }

    const computedMin = computed(() : number => {
        return props.logarithmic ? 1 : props.min
    })

    const computedMax = computed(() : number => {
        return props.logarithmic ? 30_000 : props.max
    })

    const getLogVal = (value: number): number => {
        const logMinVal = Math.log2(props.min)
        const logMaxVal = Math.log2(props.max + 1)

        const scale = (logMaxVal - logMinVal) / (<any>computedMax - <any>computedMin)
        return Math.floor(Math.pow(2, logMinVal + (scale * (value - <any>computedMin))))
    }

    const getExpVal = (val: number): number => {
      const logMinVal = Math.log2(props.min)
      const logMaxVal = Math.log2(props.max + 1)

      const scale = (logMaxVal - logMinVal) / (<any>computedMax - <any>computedMin)
      const result = Math.floor((Math.log2(val) - logMinVal) / (scale + <any>computedMin))

      return result
    }

    const updateSliderValue = () => {
      sliderValue.value = props.logarithmic ? getExpVal(props.value) : props.value
    }
</script>

<template>
  <VueSlider
    v-model="sliderValue"
    :disabled="disabled"
    :tooltip-placement="'bottom'"
    :tooltip-formatter="formatter"
    :tooltip="'always'"
    :drag-on-click="true"
    :min="computedMin"
    :max="computedMax"
  />
</template>

<style>
.vue-slider {
  flex-grow: 1;
}

.vue-slider-rail {
  border-top: 2px solid #606C8B;
}

.vue-slider-dot-handle {
  width: 21px;
  height: 21px;
  background: url(/images/sliderthumb.svg);
  cursor: pointer;
  top: -6px;
  right: 3px;
  position: relative;
}

.vue-slider-dot-tooltip-bottom {
  bottom: -5px;
  background: #FFFFFF;
  border: 1px solid #606C8B;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  height: fit-content;
  width: 125px;
  padding: 0 10px;
  color: #606C8B;
}

</style>