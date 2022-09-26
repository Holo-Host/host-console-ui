<template>
  <th
    :key="name"
    :class="[
      { 'is-selected': sortBy.name === header.name },
      isMobile ? 'mobile-header' : 'desktop-header']"
    :title="name"
    class="header-row-item"
  >
    {{ name }}
    <ShortUpArrowIcon
      :color="header.name === sortBy.name ? '#000' : '#FFF'"
      :class="{ 'rotate-180': sortBy.direction === 'desc' }"
      class="header-row-item__arrow"
    />
  </th>
</template>

<script setup>
import ShortUpArrowIcon from 'components/icons/ShortUpArrowIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },

  sortBy: {
    type: Object,
    required: true
  },

  header: {
    type: Object,
    required: true
  }
})

const name = computed(() => (props.isMobile ? props.header.mobileName : props.header.name))
</script>

<style lang="scss" scoped>
.header-row-item {
  text-align: start;
  padding: 0 0 28px 10px;
  font-weight: 600;
  cursor: pointer;

  &.is-selected {
    font-weight: 700;
  }

  /* this rule prevents the layout from jumping when the font-weight changes */
  &::after {
    display: block;
    content: attr(title);
    font-weight: 700;
    height: 1px;
    color: transparent;
    overflow: hidden;
    visibility: hidden;
  }

  &__arrow {
    position: absolute;
    top: 4px;
    margin-left: 3px;
  }
}

.mobile-header {
  display: none;
}

.rotate-180 {
  transform: rotate(180deg);
}

@media screen and (max-width: 1050px) {
  .desktop-header {
    display: none;
  }

  .mobile-header {
    display: table-cell;
  }
}
</style>
