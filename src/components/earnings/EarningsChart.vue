<script lang="ts" setup>
import { formatCurrency } from '@uicommon/utils/numbers'
import ApexCharts from 'apexcharts'
import dayjs from 'dayjs'
import { computed, onMounted, ref, watch } from 'vue'
import type { DailyEarningsData } from '@/types/types'

const chart = ref<ApexCharts | null>(null)

const props = defineProps<{
  data: DailyEarningsData[]
}>()

const options = computed(() => ({
  series: [
    {
      name: 'Paid',
      data: props.data.map((item) => item.paid)
    },
    {
      name: 'Unpaid',
      data: props.data.map((item) => item.unpaid)
    }
  ],
  colors: ['#00cbd9', '#c6f1f4'],
  chart: {
    type: 'bar',
    height: 230,
    stacked: true
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 6,
      columnWidth: '18px'
    }
  },
  xaxis: {
    categories: props.data.map((item) => dayjs(item.date).format('ddd')),
    axisBorder: {
      show: true,
      color: 'black',
      offsetX: 0,
      offsetY: 0
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: true,
      align: 'right',
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: [],
        fontSize: '10px',
        fontWeight: 400,
        cssClass: 'apexcharts-yaxis-label'
      },
      offsetX: 0,
      offsetY: -4,
      rotate: 0,
      formatter: (value) => value
    }
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      align: 'right',
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: [],
        fontSize: '10px',
        fontWeight: 400
      },
      offsetX: -1,
      offsetY: 0,
      rotate: 0,
      formatter: (value) => value
    },
    axisBorder: {
      show: true,
      color: 'black',
      offsetX: 0,
      offsetY: 0
    },
    axisTicks: {
      show: false
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    inverseOrder: true,
    fontSize: 10,
    markers: {
      width: 8,
      height: 8,
      strokeWidth: 0,
      strokeColor: '#fff',
      radius: 12,
      offsetX: 0,
      offsetY: 0
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0
    },
    onItemHover: {
      highlightDataSeries: false
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    enabled: true,
    shared: true,
    followCursor: false,
    intersect: false,
    inverseOrder: true,
    custom: undefined,
    hideEmptySeries: true,
    fillSeriesColor: false,
    style: {
      fontSize: '12px'
    },
    onDatasetHover: {
      highlightDataSeries: false
    },
    x: {
      show: true
    },
    y: {
      formatter: (value) => `${formatCurrency(value, 0)} HF`
    },
    fixed: {
      enabled: false,
      position: 'topRight',
      offsetX: 0,
      offsetY: 0
    }
  }
}))

watch(
  () => props.data,
  async (value) => {
    if (value && chart.value) {
      chart.value.updateSeries(value)
    }
  },
  {
    immediate: true
  }
)

onMounted(async () => {
  if (document.getElementById('earnings-chart') && typeof ApexCharts !== 'undefined') {
    chart.value = new ApexCharts(document.getElementById('earnings-chart'), options.value)
    await chart.value.render()
  }
})
</script>

<template>
  <div class="max-w-sm w-full rounded-lg shadow">
    <div
      id="earnings-chart"
      class="py-6"
    ></div>
  </div>
</template>

<style lang="scss">
.apexcharts-tooltip {
  border: 1px solid var(--primary-color) !important;
  color: var(--grey-dark-color);
}

.apexcharts-tooltip-title {
  font-size: 12px;
  font-weight: 400;
  color: white;
  background: var(--primary-color) !important;
}

.apexcharts-legend {
  right: 16px !important;
}

.apexcharts-menu-icon {
  position: absolute;
  top: 4px;
  right: 0;
}

//.apexcharts-tooltip.apexcharts-theme-light {
//  border: 1px solid #00cbd9;
//  background: var(--primary-lighter-color);
//  color: var(--grey-dark-color);
//
//  .apexcharts-tooltip-title {
//    font-size: 12px;
//    font-weight: 400;
//    color: white;
//    background: #00cbd9;
//  }
//}
//
//.apexcharts-legend {
//  right: 16px !important;
//}
//
//.apexcharts-menu-icon {
//  position: absolute;
//  top: 4px;
//  right: 0;
//}
</style>
