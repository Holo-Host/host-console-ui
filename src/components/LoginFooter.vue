<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const version = computed(() => import.meta.env.VITE_UI_VERSION)
</script>

<template>
  <div
    class="footer"
    data-test-login-page-footer-wrapper
  >
    <div>{{ t('$.hosted_by') }}</div>
    <div class="logo-row">
      <img
        src="/images/holo-logo-bw.png"
        alt="holo logo"
      /> {{ t('$.holo') }}
    </div>
    <div>
      {{ t('login.password_reminder') }}
    </div>
    <div>
      <a
        href="https://holo.host/control-your-data"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('$.learn_more') }}
      </a> {{ t('login.controlling_your_data') }}
    </div>
    <div class="version">
      {{ t('$.app_version', { app: t('$.app_name'), version }) }}
    </div>
  </div>
</template>

<style scoped>
.footer {
  font-size: 12px;
  line-height: 16px;
  color: #000000;
}

.footer img {
  width: 30px;
  margin-right: 8px;
}

.footer .logo-row {
  display: flex;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.6em;
  color: #000000;
  margin-top: 2px;
  margin-bottom: 15px;
}

.footer div {
  margin-bottom: 3px;
}

.footer a,
.footer a:visited {
  color: #000000;
}

.version {
  margin-top: 20px;
}
</style>

