<script lang="ts" setup>
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },
  isBusy: {
    type: Boolean,
    default: false
  },
  toggleOn: {
    type: Boolean,
    default: false
  },
  labelToggledOff: {
    type: String,
    default: ''
  },
  labelToggledOn: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['toggle'])

function toggleSwitch() {
  if (!props.isDisabled && !props.isBusy) {
    emit('toggle', !props.toggleOn)
  }
}
</script>

<template>
  <label class="container">
    <input
      v-bind="$attrs"
      class="input"
      type="checkbox"
      role="checkbox"
      :checked="props.toggleOn"
      :disabled="props.isDisabled"
      @change="toggleSwitch"
    />
    <span class="switch"></span>
    <span class="label">{{ props.toggleOn ? props.labelToggledOn : props.labelToggledOff }}</span>
  </label>
</template>

<style scoped lang="scss">
.container {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 125px;
}

.label {
  margin-left: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606c8b;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.switch {
  --switch-container-width: 50px;
  --switch-size: calc(var(--switch-container-width) / 2);

  --light-gray: #e2e8f0;
  --gray: #f2f4f7;
  --dark-gray: #a0aec0;
  --teal: #00cad9;
  --dark-teal: #319795;

  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  border-radius: var(--switch-size);
  background-color: var(--light-gray);
  flex-shrink: 0;

  transition: background-color 0.25s ease-in-out;
}

.switch::before {
  content: '';
  position: absolute;
  left: 1px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  border-radius: 9999px;
  background-color: white;
  border: 2px solid var(--light-gray);

  transition: transform 0.375s ease-in-out;
}

.input:checked + .switch {
  background-color: var(--teal);
}

.input:checked + .switch::before {
  border-color: var(--teal);
  transform: translateX(calc(var(--switch-container-width) - var(--switch-size)));
}

.input:focus + .switch::before {
  border-color: var(--gray);
}

.input:focus:checked + .switch::before {
  border-color: var(--dark-teal);
}

.input:disabled + .switch {
  background-color: var(--gray);
}

.input:disabled + .switch::before {
  background-color: var(--dark-gray);
  border-color: var(--dark-gray);
}
</style>
