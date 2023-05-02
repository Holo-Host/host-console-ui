<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false
  }
)
</script>

<template>
  <div class="settings-section">
    <h3
      class="settings-section__title"
      :class="{ 'disabled': props.isDisabled }"
    >
      {{ props.title }}
    </h3>

    <div class="settings-section__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-section {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
  padding: 20px 90px;
  color: var(--grey-color);
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  min-width: 300px;

  &__title {
    color: var(--grey-dark-color);
    margin-bottom: 12px;
  }

  &__content {
    margin-top: 10px;
  }
}
</style>
