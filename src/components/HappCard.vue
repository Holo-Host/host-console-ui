<template>
  <div class='happ-card'>
    <div class='avatar'>{{ initials }}</div>
    <div class='details'>
      <div class="name-row">
        <h2 class="name">{{ happ.name }}</h2>
        <ArrowIcon class="arrow-icon" />
      </div>
      <div class="duration-row">
        <ClockIcon class="clock-icon" /> Hosted for&nbsp;<span class="days">{{ happ.hostedDays }} days</span>
      </div>
      <div class="snapshot-label">7 day snapshot:</div>
      <div class="earnings-row">
        <HoloIcon class='holo-icon' /> Earnings:<span class="earnings">&nbsp;{{ happ.earnings }} TF</span>
      </div>
      <div class="usage-row">
        <div class='usage'>
          <span class="usage-value">{{ happ.usage.cpu }}ms</span> CPU
        </div>
        <div class='usage'>
          <span class="usage-value">{{ happ.usage.storage }}MB</span> Storage
        </div>
        <div class='usage'>
          <span class="usage-value">{{ happ.usage.bandwidth }}Mb</span> Bandwidth            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClockIcon from 'components/icons/ClockIcon.vue'
import HoloIcon from 'components/icons/HoloIcon.vue'
import ArrowIcon from 'components/icons/ArrowIcon.vue'

export default {
  name: 'HappCard',
  components: {
    ClockIcon,
    HoloIcon,
    ArrowIcon
  },
  props: {
    happ: Object
  },
  computed: {
    initials() {
      return this.happ.name.replace(/[^a-z]/gi, '').slice(0,2).toUpperCase()
    }
  }
}
</script>

<style scoped>
.happ-card {
  display: flex;
  background-color: white;
  max-width: 546px;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 12px;
  margin-right: 18px;
  margin-bottom: 20px;
  padding: 20px;
  flex: 1 0 546px;
}
.avatar {
  width: 140px;
  height: 140px;
  border: 1px solid #606C8B;
  border-radius: 12px;
  text-align: center;  
  line-height: 140px;
  font-size: 40px;
  font-weight: bold;
  color:rgba(96, 108, 139, 0.46);
  margin-right: 10px;
}
.details {
  display: flex;
  flex: 1;
  flex-direction: column;  
  color: #606C8B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.name {
  margin: 0;
  color: #313C59;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
}
.arrow-icon {
  margin-left: auto;
}
.duration-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.clock-icon {
  margin-right: 8px;
}
.days {
  font-weight: 700;
}
.snapshot-label {
  margin-left: 3px;
  margin-bottom: 3px;
}
.earnings-row {
  display: flex;
  align-items: center;
  color: #313C59;
  margin-bottom: 10px;
}
.holo-icon {
  margin-right: 4px;
}
.earnings {
  font-weight: 700;
}
.usage-row {
  display: flex;
  justify-content: space-between;
  color: #313C59;
  font-size: 12px;
  font-weight: 600;
  padding-right: 36px;
}
.usage {
  display: flex;
}
.usage-value {
  padding: 0 5px;
  border-bottom: 2px solid #00CAD9;
  font-size: 14px;
  font-weight: 700;
}
</style>
