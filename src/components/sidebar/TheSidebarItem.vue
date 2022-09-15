<template>
  <router-link
    :to="to"
    class="sidebar-menu-item"
    active-class="active-link"
  >
    <component
      :is="icon"
      class="sidebar-menu-item__icon"
      :color="color"
      :style="iconStyle"
    />
    {{ label }}
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true
  },

  icon: {
    type: Object,
    required: true
  },

  iconStyle: {
    type: Object,
    default: () => ({})
  },

  label: {
    type: String,
    required: true
  }
})

const route = useRoute()

const color = computed(() => {
  return route.path.match(props.to) ? '#00CAD9' : '#313C59'
})
</script>

<style lang="scss" scoped>
.sidebar-menu-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  text-decoration: none;
  color: var(--grey-dark-color);
  margin-bottom: 20px;
  padding: 3px 0 3px 24px;
  height: 32px;

  &:hover {
    background: rgba(0, 202, 217, 0.06);
    border-radius: 2px;
  }

  &__icon {
    margin-right: 10px;
  }
}

.active-link {
  color: var(--primary-color);
}
</style>
