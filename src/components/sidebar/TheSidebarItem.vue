<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to: string
    icon: string | null | Record<string, unknown>
    iconStyle?: Record<string, unknown>
    label: string
  }>(),
  {
    iconStyle: () => ({})
  }
)

const route = useRoute()

const color = computed((): string => {
  return RegExp(props.to).exec(route.path) ? '#00CAD9' : '#313C59'
})
</script>

<template>
  <router-link
    :to="props.to"
    class="sidebar-menu-item"
    active-class="active-link"
  >
    <component
      :is="props.icon"
      class="sidebar-menu-item__icon"
      :color="color"
      :style="props.iconStyle"
    />
    {{ props.label }}
  </router-link>
</template>

<style lang="scss" scoped>
.sidebar-menu-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  text-decoration: none;
  color: var(--grey-dark-color);
  margin-bottom: 14px;
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
