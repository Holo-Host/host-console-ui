<template>
  <BaseTableHeader
    :headers="headers"
    :sort-by="sortBy"
    @sort-by-changed="onSortByChanged"
  />
</template>

<script setup>
import BaseTableHeader from 'components/BaseTableHeader'

const SORT_HAPP = 'hApp'
const SORT_PUBLISHER = 'Publisher'
const SORT_CREATED = 'Date Created'
const SORT_DUE = 'Date Due'
const SORT_INVOICE = 'Invoice #'
const SORT_AMOUNT = 'HoloFuel'
const SORT_PAYMENT = 'Payment Status'
const SORT_EXCEPTION_STATUS = 'Exception Status'

const headers = [
  {
    name: SORT_HAPP,
    mobileName: SORT_HAPP
  },
  {
    name: SORT_PUBLISHER
  },
  {
    name: SORT_CREATED,
    mobileName: 'Date'
  },
  {
    name: SORT_DUE
  },
  {
    name: SORT_INVOICE
  },
  {
    name: SORT_AMOUNT,
    mobileName: SORT_AMOUNT
  },
  {
    name: SORT_PAYMENT,
    mobileName: 'Status'
  },
  {
    name: SORT_EXCEPTION_STATUS
  }
]

defineProps({
  sortBy: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['sortByChanged'])

function onSortByChanged(props) {
  emit('sortByChanged', props)
}
</script>
