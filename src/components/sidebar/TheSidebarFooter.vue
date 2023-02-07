<template>
  <div
		class="sidebar-footer"
		data-test-sidebar-footer
	>
    <a
      class="sidebar-footer__holo-brand"
      href="https://holo.host/"
      target="_blank"
    >
      <img
        src="/images/holo-logo.png"
        class="sidebar-footer__holo-logo"
        alt="holo-logo"
      />
      {{ $t('$.holo') }}
    </a>
    <a
      class="sidebar-footer__footer-link"
      href="https://forum.holo.host/t/alpha-testnet-terms-conditions/193"
      target="_blank"
    >
      {{ $t('$.terms_of_service') }}
    </a>

    <div class="sidebar-footer__version">
      {{ $t('$.app_version', { app: $t('$.app_name'), version }) }}
    </div>
  </div>
</template>

<script setup>
const { version } = require('../../../package.json')
</script>

<style lang="scss" scoped>
.sidebar-footer {
  margin-top: auto;
  padding-bottom: 8px;
  padding-left: 24px;

  &__holo-brand {
    display: flex;
    margin-bottom: 25px;
    align-items: center;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 12px;
    color: black;
    text-decoration: none;
  }

  &__holo-logo {
    width: 30px;
    margin-right: 8px;
    margin-left: -6px;
  }

  &__footer-link {
    display: block;
    margin-bottom: 6px;
    color: black;
    font-weight: 600;
    font-size: 14px;
  }

  &__version {
    line-height: 14px;
    font-size: 10px;
    color: black;
    font-style: italic;
    font-weight: 600;
  }
}
</style>
