<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { ref, computed } from 'vue'

interface Option {
  id: number
  label: string
}

const props = withDefaults(
  defineProps<{
    options: Option[]
    selected: Option[]
    multiple?: boolean
    placeholder?: string
  }>(),
  {
    multiple: false,
    placeholder: ''
  }
)

const emit = defineEmits(['update:selected'])

const query = ref('')

const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter((option) =>
      option.label
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)
</script>

<template>
  <div class="base-combobox__wrapper">
    <Combobox
      :model-value="props.selected"
      multiple
      @update:model-value="emit('update:selected', $event)"
    >
      <div class="base-combobox__combobox">
        <div class="base-combobox__combobox-content">
          <div
            class="base-combobox__combobox-input-wrapper"
          >
            <ComboboxInput
              class="base-combobox__input"
              :display-value="(option) => option.label"
              @change="query = $event.target.value"
            />
            <ComboboxButton
              class="base-combobox__button"
            >
              <ChevronUpDownIcon
                class="base-combobox__chevron"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="base-combobox__options"
            >
              <div
                v-if="filteredOptions.length === 0 && query !== ''"
                class="base-combobox__option--no-results"
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="option in filteredOptions"
                :key="option.id"
                v-slot="{ selected, active }"
                as="template"
                :value="option"
              >
                <li
                  class="base-combobox__option"
                  :class="{
                    'base-combobox__option--active': active,
                    'base-combobox__option--inactive': !active,
                  }"
                >
                  <span
                    class="base-combobox__option-label"
                    :class="{
                      'base-combobox__option-label--selected': selected,
                      'base-combobox__option-label--not-selected': !selected
                    }"
                  >
                    {{ option.label }}
                  </span>
                  <span
                    v-if="selected"
                    class="base-combobox__option-check"
                    :class="{
                      'base-combobox__option-check--active': active,
                      'base-combobox__option-check--inactive': !active
                    }"
                  >
                    <CheckIcon
                      class="base-combobox__option-check-icon"
                      aria-hidden="true"
                    />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </div>
    </Combobox>
  </div>
</template>

<style lang="scss" scoped>
.base-combobox {
  &__wrapper {
    width: 500px;
  }

  &__combobox {
    display: flex;
  }

  &__combobox-content {
    position: relative;
    margin-top: 4px;
  }

  &__combobox-input-wrapper {
    position: relative;
    width: 100%;
    cursor: default;
    overflow: hidden;
    border-radius: 0.375rem;
    border: solid 1px var(--grey-light-color);
    background-color: #fff;
    text-align: left;

    &:focus {
      outline: 0;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px var(--primary-color);
    }
  }

  &__input {
    width: 100%;
    border: none;
    padding: 8px 40px 8px 12px;
    font-size: 14px;
    line-height: 1.25rem;
    color: var(--gray);

    &:focus {
      outline-color: var(--primary-color);
    }
  }

  &__button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding-right: 8px;
    background-color: transparent;
    border: none;
  }

  &__chevron {
    width: 20px;
    height: 20px;
    color: var(--gray-color);
  }

  &__options {
    position: absolute;
    margin-top: 4px;
    max-height: 240px;
    width: 100%;
    overflow: auto;
    border-radius: 0.375rem;
    border: 1px solid var(--grey-light-color);
    background-color: #fff;
    padding: 4px 0;

    &:focus {
      outline: 0;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px var(--primary-color);
    }
  }

  &__option {
    position: relative;
    cursor: default;
    user-select: none;
    padding: 8px 16px 8px 40px;

    &--active {
      background-color: var(--primary-color);
      color: var(--white);
    }

    &--inactive {
      color: var(--grey-color);
    }

    &--no-result {
      position: relative;
      user-select: none;
      cursor: default;
      padding: 8px 16px;
      color: var(--gray-color);
    }

    &-label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &--selected {
        font-weight: 700;
      }

      &--not-selected {
        font-weight: 400;
      }
    }

    &-check {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding-left: 12px;

      &--active {
        color: var(--white);
      }

      &--inactive {
        color: var(--primary-color);
      }

      &-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
