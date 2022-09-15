<template>
  <section class="sidebar">
    <h1 class="sidebar__header">
      {{ $t('$.host_console') }}
    </h1>

    <section class="sidebar__menu">
      <TheSidebarItem
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :label="item.label"
        :icon="item.icon"
        :icon-style="item.iconStyle"
      />

      <TheSidebarAlphaBanner />

      <TheSidebarFooter />
    </section>
  </section>
</template>

<script setup>
import CashIcon from '@uicommon/components/icons/CashIcon'
import GearIcon from 'components/icons/GearIcon.vue'
import HappsIcon from 'components/icons/HappsIcon.vue'
import HomeIcon from 'components/icons/HomeIcon.vue'
import TheSidebarAlphaBanner from 'components/sidebar/TheSidebarAlphaBanner'
import TheSidebarFooter from 'components/sidebar/TheSidebarFooter'
import TheSidebarItem from 'components/sidebar/TheSidebarItem'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { kRoutes } from '@/router'

const { t } = useI18n()

const items = computed(() => [
  {
    to: kRoutes.dashboard.path,
    label: t('$.dashboard'),
    icon: HomeIcon
  },
  {
    to: kRoutes.happs.path,
    label: t('$.happs'),
    icon: HappsIcon
  },
  {
    to: kRoutes.earnings.path,
    label: t('$.earnings'),
    icon: CashIcon,
    iconStyle: { marginTop: '10px' }
  },
  {
    to: kRoutes.hostingPreferences.path,
    label: t('$.hosting_preferences'),
    icon: GearIcon,
    iconStyle: { marginLeft: '3px', marginRight: '15px' }
  }
])
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 270px;
  display: flex;
  flex-direction: column;
  flex: 0 0 270px;
  background: var(--white-color);
  box-shadow: 0 4px 4px rgba(54, 59, 71, 0.1);
  z-index: 100;

  &__header {
    background-color: rgba(0, 202, 217, 0.06);
    color: var(--primary-color);
    font-weight: bold;
    font-size: 26px;
    padding: 44px 0 44px 44px;
    margin: 0;
  }

  &__menu {
    padding: 30px 24px 30px 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 1050px) {
  .sidebar {
    display: none;
  }

  .mobile-banner .sidebar {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    min-width: 272px;
    max-width: 72vw;
  }

  .banner {
    padding: 50px 0 51px;
  }
}
</style>
