<template>
  <PrimaryLayout title="hApps">
    <div class="controls">
      <div class="label">
        Filter by:
      </div>
      <div class='filter'>
        <input v-model="filter" class="filter-input" />
        <ExIcon v-if="filter.length > 0" @click="clearFilter" class='ex-icon' />
      </div>
      <div class="label">
        Sort by:&nbsp;
      </div>
      <select v-model="sort" class="sort">
        <option v-for="option in sortOptions" :value="option.value" :key="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="happ-list">
      <HappCard v-for="happ in filteredHapps" :happ="happ" :key="happ.id" />
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import HappCard from 'components/HappCard.vue'
import ExIcon from 'components/icons/ExIcon.vue'
import HposInterface from 'src/interfaces/HposInterface'

const SORT_EARNINGS = 'earnings'
const SORT_ALPHABETICAL = 'alphabetical'

export default {
  name: 'HostedHapps',
  components: {
    PrimaryLayout,
    HappCard,
    ExIcon
  },
  data () {
    return {
      happs: [], 
      filter: '',
      sort: SORT_EARNINGS
    }
  },
  created: async function () {
    const happs = await HposInterface.hostedHapps()
    this.happs = happs
    console.log('happs', happs)
  },
  computed: {
    filteredHapps () {
      const sort = this.sort === SORT_EARNINGS
        ? (a, b) => a.sevenDayEarnings < b.sevenDayEarnings ? 1 : -1
        : (a, b) => a.name > b.name ? 1 : -1
      return this.happs.filter(({ name }) => name.toLowerCase().includes(this.filter.toLowerCase())).sort(sort)
    },
    sortOptions: () => [{
      label: 'Highest earnings', value: SORT_EARNINGS
    }, {
      label: 'Alphabetical', value: SORT_ALPHABETICAL
    }]
  },
  methods: {
    clearFilter () {
      this.filter = ''
    }
  }
}

</script>

<style scoped>
.controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 9px 0;
}
.label {
  color: #606C8B;
  font-size: 12px;
  margin-left: 30px;
  margin-right: 2px;
}
.filter {
  display: flex;
  position: relative
}
.filter-input {
  border: 1px solid #E5E5E5;
  border-radius: 5px;
}
.ex-icon {
  position: absolute;
  top: 5px;
  right: -7px;
}
.sort {
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  color: #313C59;
  padding: 4px 16px 4px 4px;
  background-image: url(/images/chevron.svg);
  background-repeat: no-repeat;
  background-position: right;  
}
.happ-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -18px;
}
</style>
