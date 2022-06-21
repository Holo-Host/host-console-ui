<template>
  <div
    class="card"
    :class="{ 'two-columns': isMultiColumn }"
  >
    <h2 class="title">
      {{ title }}
      <h3
        v-if="subtitle"
        class="subtitle"
      >
        {{ subtitle }}
      </h3>
    </h2>

    <div
      v-if="isMultiColumn"
      class="inner-row"
    >
      <div class="inner-column">
        <slot name="left" />
      </div>

      <div class="inner-column">
        <slot name="right" />
      </div>
    </div>

    <div
      v-else
      class="body"
    >
      <slot />
    </div>

    <span
      v-if="withMoreButton"
      class="more"
      @click="emit('more-clicked')"
    >
      More <RightArrowIcon class="right-arrow-icon" />
    </span>
  </div>
</template>

<script setup>
import RightArrowIcon from 'components/icons/RightArrowIcon.vue'
import { computed, useSlots } from 'vue'

const slots = useSlots()

defineProps({
  title: {
    type: String,
    required: true
  },

  subtitle: {
    type: String,
    default: ''
  },

  withMoreButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['more-clicked'])

const isMultiColumn = computed(() => slots.right && slots.left)
</script>

<style>
.card-info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: #606c8b;
}
</style>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  flex-basis: 33%;
  background-color: white;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
}

.card:last-child {
  margin-right: 14px;
}

.two-columns {
  flex-basis: 69%;
}

.title {
  display: flex;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #f0fcfd;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: black;
  padding: 10px 28px;
  margin: 0;
}

.subtitle {
  margin: 0;
  margin-left: auto;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #606c8b;
}

.body {
  margin: 26px 26px 13px 26px;
  display: flex;
  flex-direction: column;
  flex-basis: 68%;
}

.inner-row {
  display: flex;
  flex-direction: row;
}

.inner-column {
  flex-basis: 50%;
  padding: 26px 30px;
}

.more {
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 202, 217, 0.18);
  margin: auto 26px 13px auto;
  display: flex;
  align-items: center;
  cursor: pointer;
}

@media screen and (max-width: 1050px) {
  .card {
    margin-bottom: 28px;
    margin-right: 0;
  }

  .card:last-child {
    margin-right: 0;
  }

  .inner-row {
    flex-direction: column;
  }
}
</style>
