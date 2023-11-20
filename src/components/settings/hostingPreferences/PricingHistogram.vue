<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Ranges from './Ranges.vue'
import Slider from './Slider.vue'
import { EPricingOptions } from '@/types/types'
import { usePreferencesStore } from '@/store/preferences'
import BaseButton from '@uicommon/components/BaseButton.vue'

const { t } = useI18n()
const preferencesStore = usePreferencesStore()

const computePrice = ref(0)
const dataTransferPrice = ref(0)
const storagePrice = ref(0)

const props = defineProps<{
  selected_pricing_option: EPricingOptions
  price: number
  disabled: boolean
}>()

const holoportPricing = computed(() => {
    // return preferencesStore.holoportPricing
    let mockPricing = []

    for(let i = 0; i < 1000; i++) {
        
        const host = {
            "host_pub_key": `uhCAkokIsoB0_NuY_GbL4_xmVlwoWvnJJcvRTOwFvAAU1iCrW${i}`,
            "price_compute": `${Math.floor(Math.random() * (501))}`,
            "price_storage": `${Math.floor(Math.random() * (501))}`,
            "price_bandwidth": `${Math.floor(Math.random() * (501))}`,
        }      

        mockPricing.push(host)
    }

    console.log(`🐮 holoportPricing mockHosts`, mockPricing)
    return mockPricing
})

const averagePricingLabel = computed(() => {
    switch (props.selected_pricing_option) {
        case EPricingOptions.compute:
            return t('hosting_preferences.pricing_histogram.average_compute_price')
        case EPricingOptions.storage:
            return t('hosting_preferences.pricing_histogram.average_storage_price')
        case EPricingOptions.data_transfer:
            return t('hosting_preferences.pricing_histogram.average_data_transfer_price')
    }
})

const rangesData = computed(() => {
    if (props.selected_pricing_option === EPricingOptions.compute) {
        return holoportPricing.value.map(pricing => {
            return pricing.price_compute
        })
    } else if (props.selected_pricing_option === EPricingOptions.storage) {
        return holoportPricing.value.map(pricing => {
            return pricing.price_storage
        })
    } else if (props.selected_pricing_option === EPricingOptions.data_transfer) {
        return holoportPricing.value.map(pricing => {
            return pricing.price_bandwidth
        })
    }

    return []
})

const updatePrice = (value: number) => {
    if (props.selected_pricing_option === EPricingOptions.compute) {
        computePrice.value = value
    }

    if (props.selected_pricing_option === EPricingOptions.storage) {
        storagePrice.value = value
    }

    if (props.selected_pricing_option === EPricingOptions.data_transfer) {
        dataTransferPrice.value = value
    }
}

</script>

<template>
    <div class='pricing-histogram'>
        <div class='avg-pricing-label'>
            {{ averagePricingLabel  }} 100 HF per GB
        </div>
        <div class="histogram-container">
            <Ranges
                :numbers="rangesData"
                :value="props.price"
                :min="0"
                :max="Math.max(...rangesData, 100)"
                :numPartitions="20"
                class='ranges'>
            </Ranges>
            <div class='row'>
                <Slider
                    v-if="props.selected_pricing_option === EPricingOptions.compute"
                    :value="props.price"
                    :disabled="props.disabled"
                    @input="updatePrice"
                    :min="0"
                    :max="Math.max(...rangesData, 100)"
                    :logarithmic="false">
                </Slider>
            </div>
        </div>
        <div class='histogram-buttons'>
            <div class="reset-link">
                {{ $t('hosting_preferences.pricing_histogram.reset') }}
            </div>
            <BaseButton
                class="histogram-buttons__save-button"
                @click="updatePrice"
            >
                {{ $t('hosting_preferences.pricing_histogram.save') }}
            </BaseButton>
        </div>        
    </div>
  </template>
  
  <style lang="scss" scoped>
  .pricing-histogram {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    max-width: 450px;
    min-width: 100px;
    border-radius: 5px;
    border: 1px solid #C4C4C4;    
    width: 396px;
    height: 246px;
    flex-shrink: 0;
  }

  .histogram-container {
    margin: 20px 40px 50px 40px;
  }

  .avg-pricing-label {
    color: #313C59;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 20px;
    margin-top: 11px;
  }

    .row {
        display: flex;
        align-items: center;
    }

    .histogram-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0px 13px 9px 13px;
        align-items: flex-end;

        &__save-button {
            margin-left: 8px;
            margin-top: -8px;
        }
    }

    .reset-link {
        display: flex;
        text-decoration: underline;
        color: #606C8B;
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
        text-decoration-line: underline;

        &:hover {
            cursor: pointer;
        }
    }
  </style>