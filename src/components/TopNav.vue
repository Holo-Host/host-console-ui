<template>
  <section
    class="top-nav"
    data-test-top-nav
  >
    <h1
      v-if="!path"
      class="main-title"
      data-test-top-nav-title
    >
      {{ mainTitle }}
    </h1>

    <router-link
      v-if="!!path"
      class="main-title"
      :to="path"
      data-test-top-nav-link
    >
      {{ mainTitle }}
    </router-link>

    <RightChevronIcon
      v-if="isSubtitleVisible"
      class="chevron"
      data-test-top-nav-chevron-icon
    />

    <div
      v-if="isSubtitleVisible"
      class="sub-title"
      data-test-top-nav-subtitle
    >
      {{ subTitle }}
    </div>

    <TopNavMenu
      :nickname="nickname"
      :agent-address="agentAddress"
      data-test-top-nav-menu
    />

    <div
      class="alpha-flag"
      data-test-top-nav-alpha-flag
    >
      {{ $t('sidebar.alpha.short') }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RightChevronIcon from '@/components/icons/RightChevronIcon.vue'
import TopNavMenu from '@/components/TopNavMenu.vue'
import type { BreadCrumb } from '@/types/types'

const props = withDefaults(
  defineProps<{
    breadcrumbs: BreadCrumb[]
    agentAddress?: typeof Uint8Array | null
    nickname: string
  }>(),
  {
    agentAddress: null
  }
)

const mainTitle = computed((): string | undefined => props.breadcrumbs[0]?.label)
const subTitle = computed((): string | undefined => props.breadcrumbs[1]?.label)
const path = computed((): string | undefined => props.breadcrumbs[0]?.path)

const isSubtitleVisible = computed(
  (): boolean => props.breadcrumbs.length > 1 && !!props.breadcrumbs[1]?.label
)
</script>

<style scoped>
.top-nav {
  display: flex;
  flex: 0 0 70px;
  padding-top: 46px;
}

.main-title {
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  color: #273048;
  text-decoration: none;
}

.chevron {
  margin: 12px 10px 0 15px;
}

.sub-title {
  font-size: 14px;
  font-weight: 600;
  margin: 9px 0 0;
  color: var(--grey-color);
  text-decoration: none;
}

.alpha-flag {
  display: none;
}

@media screen and (max-width: 1050px) {
  .top-nav {
    padding-top: 22px;
    flex: 0 0 46px;
  }

  .alpha-flag {
    display: block;
    height: 22px;
    background-color: var(--violet-color);
    font-weight: 600;
    font-size: 11px;
    line-height: 22px;
    color: var(--white-color);
    position: absolute;
    right: -2px;
    padding: 0 7px;
  }
}
</style>
