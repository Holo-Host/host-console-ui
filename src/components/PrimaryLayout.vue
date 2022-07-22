<template>
  <section class="layout">
    <TheSidebar />

    <section class="main-column">
      <MobileTopNav
        :display-name="displayName"
        :public-key="publicKey"
      />

      <TopNav
        :breadcrumbs="breadcrumbsOrTitle"
        :display-name="displayName"
        :public-key="publicKey"
      />

      <WelcomeModal
        :is-visible="isWelcomeModalVisible"
        @close="closeWelcomeModal"
      />

      <section class="content">
        <slot />
      </section>
    </section>
  </section>
</template>

<script setup>
import MobileTopNav from 'components/MobileTopNav.vue'
import TheSidebar from 'components/TheSidebar.vue'
import TopNav from 'components/TopNav.vue'
import WelcomeModal from 'components/WelcomeModal.vue'
import { useUserStore } from 'src/store/user'
import { computed, nextTick, onMounted, ref } from 'vue'

const userStore = useUserStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  breadcrumbs: {
    type: Array,
    default: () => []
  }
})

const isWelcomeModalVisible = ref(false)

const displayName = computed(() => userStore.displayName)
const publicKey = computed(() => userStore.publicKey)

const breadcrumbsOrTitle = computed(() => {
  if (props.breadcrumbs.length) {
    return props.breadcrumbs
  } else {
    return [
      {
        label: props.title
      }
    ]
  }
})

function closeWelcomeModal() {
  isWelcomeModalVisible.value = false
}

onMounted(async () => {
  if (!userStore?.publicKey) {
    await userStore.getUser()
  }

  await nextTick(() => {
    isWelcomeModalVisible.value = !userStore.displayName
  })
})
</script>

<style scoped>
.layout {
  display: flex;
  height: 100%;
  /* Making room for the sidebar */
  padding-left: 270px;
}

.main-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 30px;
}

.content {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1050px) {
  .main-column {
    padding: 0 16px;
  }
  .layout {
    padding-left: 0;
  }
}
</style>
