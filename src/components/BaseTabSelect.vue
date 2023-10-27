<script setup lang="ts">
interface Tab {
  value: string
  name: string
  current: boolean
}

const props = defineProps<{
  tabs: Tab[]
}>()

const emit = defineEmits(['update'])
</script>

<template>
  <div>
    <div class="desktop-tab-select-wrapper">
      <nav
        class="desktop-tab-select"
        aria-label="Tabs"
      >
        <span
          v-for="(tab, tabIdx) in props.tabs"
          :key="tab.name"
          :class="[
            tab.current ? 'desktop-tab-select__item--current' : 'desktop-tab-select__item--inactive',
            tabIdx === 0 ? 'desktop-tab-select--rounded-l' : '',
            tabIdx === tabs.length - 1 ? 'desktop-tab-select--rounded-r' : '',
            'desktop-tab-select__item'
          ]"
          :aria-current="tab.current ? 'page' : undefined"
          @click="emit('update', tab.value)"
        >
          <span>{{ tab.name }}</span>
          <span
            aria-hidden="true"
            :class="[
              { 'desktop-tab-select__item-label--current': tab.current },
              'desktop-tab-select__item-label'
            ]"
          />
        </span>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desktop-tab-select-wrapper {
  display: block;
}

.desktop-tab-select {
  isolation: isolate;
  border-right-width: 0;
  border-left-width: 0;
  border-color: rgb(229 231 235);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  color: var(--grey-color);

  &:hover {
    cursor: pointer;
  }

  &__item {
    position: relative;
    min-width: 0;
    flex: 1;
    overflow: hidden;
    background-color: white;
    padding: 2px 16px;
    text-align: center;
    font-size: 12px;
    font-weight: 800;
    border: 1px solid var(--grey-light-color);

    &--current {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background-color: var(--primary-light-color);
    }

    &--inactive {
      &:hover {
        color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }

    &:focus {
      z-index: 10;
    }

    &-label {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;

      &--current {
        color: var(--primary-color);
      }
    }
  }

  &--rounded-l {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }

  &--rounded-r {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  &--current {
    color: var(--grey-dark-color);
  }
}
</style>
