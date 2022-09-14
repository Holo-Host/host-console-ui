<template>
  <PrimaryLayout title="hApps">
    <div class="controls">
      <div class="label">
        Filter by:
      </div>
      <div class="filter">
        <input
          v-model="filter"
          class="filter-input"
          placeholder="Filter by"
        />
        <ExIcon
          v-if="filter.length > 0"
          size="15"
          class="ex-icon"
          @click="clearFilter"
        />
      </div>
      <div class="label">
        Sort by:&nbsp;
      </div>
      <select
        v-model="sort"
        class="sort"
      >
        <option
          v-for="option in sortOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="happ-list">
      <HappCard
        v-for="happ in filteredHapps"
        :key="happ.id"
        :happ="happ"
      />
    </div>
  </PrimaryLayout>
</template>

<script>
import HappCard from 'components/HappCard.vue'
import ExIcon from 'components/icons/ExIcon.vue'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import HposInterface from 'src/interfaces/HposInterface'

const SORT_EARNINGS = 'earnings'
const SORT_ALPHABETICAL = 'alphabetical'

export default {
  name: 'HostedHappsPage',

  components: {
    PrimaryLayout,
    HappCard,
    ExIcon
  },

  data() {
    return {
      happs: [],
      filter: '',
      sort: SORT_EARNINGS
    }
  },

  computed: {
    filteredHapps() {
      const sort =
        this.sort === SORT_EARNINGS
          ? (a, b) => (a.sevenDayEarnings < b.sevenDayEarnings ? 1 : -1)
          : (a, b) => (a.name > b.name ? 1 : -1)
      return this.happs
        .filter(({ name }) => name.toLowerCase().includes(this.filter.toLowerCase()))
        .sort(sort)
    },

    sortOptions: () => [
      {
        label: 'Highest earnings',
        value: SORT_EARNINGS
      },
      {
        label: 'Alphabetical',
        value: SORT_ALPHABETICAL
      }
    ]
  },

  async created() {
    this.happs = await HposInterface.getHostedHapps()
  },

  methods: {
    clearFilter() {
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
  color: var(--grey-color);
  font-size: 12px;
  margin-left: 30px;
  margin-right: 2px;
}
.filter {
  display: flex;
  position: relative;
}
.filter-input {
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 5px;
}
.filter-input:focus {
  outline-color: var(--grey-dark-color);
}
.filter-input::placeholder {
  color: #bcbfc6;
}
.ex-icon {
  position: absolute;
  top: 8px;
  right: 6px;
}
.sort {
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-dark-color);
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

@media screen and (max-width: 1050px) {
  .controls {
    justify-content: center;
  }
  .filter {
    flex-basis: 100%;
  }
  .filter-input {
    flex-basis: 100%;
    padding: 10px;
  }
  .sort,
  .label {
    display: none;
  }
  .ex-icon {
    top: 12px;
  }
  .happ-list {
    flex-direction: column;
    margin-right: 0;
  }
}
</style>
