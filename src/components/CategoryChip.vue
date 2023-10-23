<template>
  <div class="category-chip"
  >
    <span class="category-chip__dot"></span>
    <span class="category-chip__label">{{ label }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.category-chip {
  align-items: center;
  display: inline-flex;
  justify-content: start;
  border-radius: 9999px;
  padding: 4px 9px;
  font-size: 12px;
  font-weight: 700;
	text-transform: capitalize;
  background-color: #F3F5F8;
  color: var(--grey-dark-color);

  &__dot {
    height: 8px;
    width: 8px;
    background-color: #0870A3;
    border-radius: 50%;
    display: inline-block;
  }

	&__label {
    margin-left: 4px;
  }
}
</style>
