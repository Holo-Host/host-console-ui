<template>
  <PrimaryLayout title="hApps > ">
    HAPP DETAIL
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'

export default {
  name: 'HappDetails',
  components: {
    PrimaryLayout,
  },
  computed: {
    filteredHapps () {
      const sort = this.sort === SORT_EARNINGS
        ? (a, b) => a.earnings > b.earnings ? 1 : -1
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

</style>
