declare module '*.svg' {
  import type { DefineComponent } from 'vue'

  const content: DefineComponent
  export default content
}

declare module 'click-outside-vue3'
