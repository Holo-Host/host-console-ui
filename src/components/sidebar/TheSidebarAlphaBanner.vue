<template>
  <div
		class="sidebar-alpha-banner"
		data-test-sidebar-alpha-banner
	>
    <div class="sidebar-alpha-banner__flag">
      {{ $t('sidebar.alpha.title') }}
      <div class="sidebar-alpha-banner__triangle" />
    </div>
    <p>{{ $t('sidebar.alpha.description') }}</p>
    <p>
      <a
        href="https://forum.holo.host/c/alpha-testing-holoports/31"
        target="_blank"
      >
        {{ $t('$.learn_more') }}
      </a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-alpha-banner {
  position: relative;
  margin: auto -24px auto -18px;
  padding: 35px 40px 18px 32px;
  background-color: #f0fcfd;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: var(--grey-dark-color);

  a {
    font-weight: 700;
    color: var(--grey-dark-color);
  }

  &__flag {
    position: absolute;
    top: -20px;
    height: 40px;
    margin-left: -32px;
    padding: 0 6px 0 10px;
    background: var(--violet-color);
    font-weight: bold;
    font-size: 14px;
    line-height: 40px;
    letter-spacing: 0.02em;
    color: white;
  }

  &__triangle {
    position: absolute;
    top: 0;
    right: -18px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 18px;
    border-color: transparent transparent transparent var(--violet-color);
  }
}
</style>
