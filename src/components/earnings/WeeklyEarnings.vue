<template>
  <h3 class="header">
    {{ $t('earnings.weekly_earnings') }}
  </h3>

  <p class="amount">
    {{ weeklyEarnings.toLocaleString() }} HF
  </p>

  <TmpGraphIcon class="graph" />
</template>

<script setup>
import TmpGraphIcon from 'components/icons/TmpGraphIcon'


</script>
