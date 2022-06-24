import { computed, nextTick, onMounted, ref } from 'vue'
import { EInputType } from '../types/ui'
import { getUniqueId } from '../utils/domUtils'

export function useInput({ props, emit }) {
  const inputRef = ref()
  const isPasswordVisible = ref(false)

  onMounted(async () => {
    await nextTick(() => {
      if (props.autofocus) {
        inputRef.value?.focus()
      }
    })
  })

  const inputName = ref('')
  const inputId = ref('')

  const computedInputType = computed(() => {
    if (props.inputType !== EInputType.password) {
      return props.inputType
    } else {
      return isPasswordVisible.value ? EInputType.text : EInputType.password
    }
  })

  if (props.id || props.name) {
    if (props.id) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      inputId.value = props.id

      if (!props.name) {
        inputName.value = inputId.value
      }
    }

    if (props.name) {
      if (!inputName.value) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        inputName.value = props.name
      }
    }
  } else {
    // If no name is passed, calculate a name (and corresponding id)
    inputName.value = getUniqueId()
    inputId.value = inputName.value
  }

  function onInput(event) {
    emit('update:modelValue', event.target.value)
  }

  function showPassword() {
    isPasswordVisible.value = true
  }

  function hidePassword() {
    isPasswordVisible.value = false
  }

  onMounted(() => {})

  return {
    props,
    inputRef,
    isPasswordVisible,
    emit,
    inputName,
    inputId,
    computedInputType,
    onInput,
    showPassword,
    hidePassword
  }
}
