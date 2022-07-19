<template>
  <PrimaryLayout title="Account Settings">
    <SettingsHoloportSection
      :settings="settings"
    />
  </PrimaryLayout>
</template>

<script setup>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import { useUserStore } from 'src/store/user'
import { computed, ref } from 'vue'
import SettingsHoloportSection from '../components/SettingsHoloportSection'

const userStore = useUserStore()

const settings = computed(() => userStore)
const isLoading = ref(false)
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 5px;
  margin: 40px 10px 20px 12px;
  padding: 30px;
  color: var(--grey-color);
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  min-width: 300px;
}
.heading {
  color: var(--grey-dark-color);
}
.settings-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.row-label {
  flex-basis: 280px;
  display: flex;
  align-items: center;
}
.row-value {
  display: flex;
}
.factory-reset-link {
  text-decoration-line: underline;
  color: var(--grey-color);
}
.question-mark {
  margin-left: 8px;
}
.pencil {
  margin-left: 5px;
  cursor: pointer;
  opacity: 0.2;
}
.filled-check {
  margin-left: 5px;
  cursor: pointer;
}
.circled-ex {
  margin-left: 5px;
  cursor: pointer;
}
.device-input {
  border: 0.5px solid var(--grey-color);
  color: var(--grey-dark-color);
}
</style>
