<template>
  <router-link
    :to="pathToHapp"
    class="happ-card"
  >
    <HappImage
      :happ="happ"
      class="desktop-happ-image"
    />

    <div class="details">
      <div class="mobile-row">
        <HappImage
          :happ="happ"
          :size="'80px'"
          class="mobile-happ-image"
        />

        <div class="mobile-column">
          <div class="name-row">
            <h2 class="name">
              {{ happ.name }}
            </h2>
            <ArrowIcon class="arrow-icon" />
          </div>
          <div class="duration-row">
            <ClockIcon class="clock-icon" /> Hosted for&nbsp;<span class="days">{{ happ.hostedDays }} days</span>
          </div>
          <div class="snapshot-label">
            7 day snapshot:
          </div>
          <div class="earnings-row grayed-out">
            Earnings:<span class="earnings">&nbsp;{{ happ.sevenDayEarnings }} HF</span>
          </div>
        </div>
      </div>

      <div class="usage-row">
        <div class="usage">
          <span class="usage-value">{{ presentMicroSeconds(happ.usage.cpu) }}</span><span class="usage-unit">CPU</span>
        </div>

        <div class="usage">
          <span class="usage-value">{{ presentBytes(happ.storage) }}</span><span class="usage-unit">Storage</span>
        </div>

        <div class="usage">
          <span class="usage-value">{{ presentBytes(happ.usage.bandwidth) }}</span><span class="usage-unit">Bandwidth</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import HappImage from 'components/HappImage.vue'
import ArrowIcon from 'components/icons/ArrowIcon.vue'
import ClockIcon from 'components/icons/ClockIcon.vue'
import { presentMicroSeconds, presentBytes } from 'src/utils'
import { happDetailsPath } from '../router'

export default {
  name: 'HappCard',

  components: {
    HappImage,
    ClockIcon,
    ArrowIcon
  },

  props: {
    happ: Object
  },

  computed: {
    pathToHapp() {
      return happDetailsPath(this.happ)
    }
  },

  methods: {
    presentMicroSeconds,
    presentBytes
  }
}
</script>

<style scoped>
.happ-card {
  display: flex;
  background-color: var(--white-color);
  max-width: 546px;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
  margin-right: 18px;
  margin-bottom: 20px;
  padding: 20px;
  flex: 1 0 546px;
  text-decoration: none;
}
.details {
  display: flex;
  flex: 1;
  flex-direction: column;
  color: var(--grey-color);
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.mobile-happ-image {
  display: none;
}
.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.name {
  margin: 0;
  color: var(--grey-dark-color);
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
  color: var(--grey-dark-color);
  margin-bottom: 10px;
  margin-left: 3px;
}
.earnings {
  font-weight: 700;
}
.usage-row {
  display: flex;
  justify-content: space-between;
  color: var(--grey-dark-color);
  font-size: 12px;
  font-weight: 600;
  padding-right: 36px;
}
.usage {
  display: flex;
}
.usage-value {
  padding: 0 5px;
  border-bottom: 2px solid var(--primary-color);
  font-size: 14px;
  font-weight: 700;
}
/* Temporary, remove once we have all live data */
.grayed-out {
  color: rgba(96, 108, 139, 0.18);
}
.grayed-out span {
  color: rgba(96, 108, 139, 0.18);
}

@media screen and (max-width: 1050px) {
  .desktop-happ-image {
    display: none;
  }
  .mobile-happ-image {
    display: flex;
  }
  .happ-card {
    margin-right: 0;
    max-width: none;
    flex-basis: 0;
  }
  .duration-row {
    display: none;
  }
  .mobile-row {
    display: flex;
    margin-bottom: 14px;
  }
  .mobile-column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .snapshot-label {
    font-size: 11px;
  }
  .snapshot-label {
    font-size: 11px;
  }
  .usage {
    flex-direction: column;
  }
  .usage-value {
    padding: 0;
    border: none;
  }
  .usage-unit {
    border-bottom: 2px solid var(--primary-color);
    margin-right: auto;
  }
}
</style>
