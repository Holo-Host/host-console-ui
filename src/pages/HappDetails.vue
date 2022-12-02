<template>
  <PrimaryLayout :breadcrumbs="breadcrumbs">
    <div
      class="happ-details"
      :class="{ 'modal-open': hostingModalVisible }"
    >
      <router-link
        class="back-link"
        to="/happs"
      >
        <LeftChevronIcon class="left-chevron" />
        Back
      </router-link>
      <div class="columns">
        <div class="left-column desktop">
          <HappImage
            :happ="happ"
            size="178px"
            class="happ-image"
          />
          <div class="description-label">
            Description
          </div>
          <div class="description">
            {{ happ.description }}Happ to make you more productive.
          </div>
        </div>
        <div class="main-column">
          <div class="mobile-column">
            <HAppImage
              :happ="happ"
              size="124px"
              class="happ-image"
            />
            <h2 class="name">
              {{ happ.name }}
            </h2>
            <div class="description">
              {{ happ.description }}Happ to make you more productive.
            </div>
          </div>
          <h2 class="name desktop">
            {{ happ.name }}
          </h2>
          <div class="info-row large-text grayed-out">
            Total Earnings:<span class="info">&nbsp;{{ presentHolofuelAmount(happ.earnings) }} HF</span>
          </div>
          <div class="info-row grayed-out">
            Earned in last 7 days:<span class="info">&nbsp;{{ presentHolofuelAmount(happ.sevenDayEarnings) }} HF</span>
          </div>
          <div class="info-row earnings-margin grayed-out">
            Average weekly earnings:<span class="info">&nbsp;-- HF</span>
          </div>
          <div class="info-row">
            <ClockIcon class="clock-icon" /> Hosted for:&nbsp;<span class="info">{{ happ.hostedDays }} days</span>
          </div>
          <div class="info-row chains-margin">
            <ChainIcon class="chain-icon" /> Total source chains:&nbsp;<span class="info">{{ happ.hostedAgents }}</span>
          </div>
          <div class="usage-row">
            <span class="usage-label">Total usage:</span>
            <div class="usage">
              <span class="usage-value">{{ presentMicroSeconds(happ.usage.cpu) }}</span> CPU
            </div>
            <div class="usage">
              <span class="usage-value">{{ presentBytes(happ.usage.storage) }}</span> Storage
            </div>
            <div class="usage">
              <span class="usage-value">{{ presentBytes(happ.usage.bandwidth) }}</span> Bandwidth
            </div>
          </div>
          <div class="rates-title grayed-out">
            Rates (Default) <PencilIcon
              class="pencil-icon"
              @click="editRates"
            />
          </div>
          <div class="rate-row grayed-out">
            <div class="rate-label">
              CPU
            </div><span class="rate-value">-- HF per Min</span>
          </div>
          <div class="rate-row grayed-out">
            <div class="rate-label">
              Storage
            </div><span class="rate-value">-- HF per GB</span>
          </div>
          <div class="rate-row rates-margin grayed-out">
            <div class="rate-label">
              Bandwidth
            </div><span class="rate-value">-- HF per Gb</span>
          </div>
          <div class="stop-hosting-row grayed-out">
            <div
              class="stop-hosting"
              @click="stopHostingHapp"
            >
              Stop hosting
            </div>
            <div class="stop-hosting-warning">
              <AlertCircleIcon class="alert-circle-icon" />Stopping hosting of a hApp will remove it and all associated data from your HoloPort.
            </div>
          </div>
        </div>
      </div>
    </div>

    <StopHostingModal
      :is-visible="hostingModalVisible"
      :happ-name="happ.name"
      @close="closeHostingModal"
      @stop-hosting-happ="stopHostingHapp"
    />
  </PrimaryLayout>
</template>

<script>
import HAppImage from '@uicommon/components/HAppImage.vue'
import AlertCircleIcon from 'components/icons/AlertCircleIcon.vue'
import ChainIcon from 'components/icons/ChainIcon.vue'
import ClockIcon from 'components/icons/ClockIcon.vue'
import LeftChevronIcon from 'components/icons/LeftChevronIcon.vue'
import PencilIcon from 'components/icons/PencilIcon.vue'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import StopHostingModal from 'components/StopHostingModal.vue'
import HposInterface from 'src/interfaces/HposInterface'
import { presentHolofuelAmount, presentMicroSeconds, presentBytes } from 'src/utils'

const kInitialsLength = 2

export default {
  name: 'HappDetails',

  components: {
    PrimaryLayout,
    HAppImage,
    ClockIcon,
    LeftChevronIcon,
    ChainIcon,
    PencilIcon,
    AlertCircleIcon,
    StopHostingModal
  },

  data() {
    return {
      happ: {
        name: '',
        usage: {}
      },
      hostingModalVisible: false
    }
  },

  computed: {
    breadcrumbs() {
      return [
        {
          label: 'hApps',
          path: '/happs'
        },
        {
          label: this.happ.name || 'loading'
        }
      ]
    },

    initials() {
      return this.happ.name
        .replace(/[^a-z]/giu, '')
        .slice(0, kInitialsLength)
        .toUpperCase()
    }
  },

  async created() {
    const happs = await HposInterface.getHostedHapps()
    const happId = decodeURIComponent(this.$route.params.id)
    const happ = happs.find(({ id }) => id === happId)

    if (!happ) {
      throw new Error(`Failed to load happ with id: ${happId}`)
    }

    this.happ = happ
  },

  methods: {
    editRates() {
      console.error('Editing rates is not implemented in this version')
    },

    openHostingModal() {
      // This function is not currently used but should replace the call to stopHostingHapp once we have implemented stopping hosting
      this.hostingModalVisible = true
    },

    closeHostingModal() {
      this.hostingModalVisible = false
    },

    stopHostingHapp() {
      console.log('NOT YET IMPLEMENTED: Stopping hosting happ', this.happ.name)
    },

    presentHolofuelAmount,
    presentMicroSeconds,
    presentBytes
  }
}
</script>

<style scoped>
.happ-details {
  display: flex;
  flex-direction: column;
  background-color: var(--white-color);
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 5px;
  margin: 0 10px 20px 12px;
  padding: 30px;
  color: var(--grey-color);
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.back-link {
  color: var(--grey-color);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 32px;
}
.columns {
  display: flex;
}
.left-column {
  display: flex;
  flex: 0;
  flex-direction: column;
  margin-right: 32px;
}
.happ-image {
  margin-bottom: 34px;
}
.description-label {
  margin-bottom: 4px;
}
.description {
  font-weight: 700;
  color: var(--grey-dark-color);
}
.main-column {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.mobile-column {
  display: none;
  align-items: center;
  flex-direction: column;
}
.name {
  margin: 0 0 34px 0;
  color: var(--grey-dark-color);
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
}
.info-row {
  display: flex;
  align-items: center;
  color: var(--grey-color);
  margin-bottom: 14px;
  font-size: 14px;
}
.large-text {
  font-size: 16px;
}
.info {
  font-weight: 700;
  color: var(--grey-dark-color);
}
.earnings-margin {
  margin-bottom: 48px;
}
.chains-margin {
  margin-bottom: 38px;
}
.clock-icon {
  margin-left: 2px;
  margin-right: 10px;
}
.chain-icon {
  margin-right: 8px;
}
.usage-row {
  display: flex;
  color: var(--grey-dark-color);
  font-size: 12px;
  font-weight: 600;
  padding-right: 36px;
  margin-bottom: 42px;
}
.usage-label {
  font-size: 14px;
}
.usage {
  display: flex;
  margin-left: 30px;
}
.usage-value {
  padding: 0 5px;
  border-bottom: 2px solid var(--primary-color);
  font-size: 13px;
  font-weight: 700;
  margin-right: 7px;
}
.rates-title {
  display: flex;
  color: var(--grey-dark-color);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}
.pencil-icon {
  margin-left: 8px;
  cursor: pointer;
  opacity: 0.3;
}
.rate-row {
  display: flex;
  margin-bottom: 14px;
}
.rate-label {
  flex: 0 0 100px;
}
.rate-value {
  color: var(--grey-dark-color);
  font-weight: 700;
}
.rates-margin {
  margin-bottom: 120px;
}
.stop-hosting-row {
  display: flex;
  align-items: center;
}
.stop-hosting {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-decoration-line: underline;
  color: var(--grey-dark-color);
  margin-right: 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.stop-hosting-warning {
  display: flex;
  align-items: flex-start;
  background: #f3f5f8;
  border-radius: 4px;
  color: var(--grey-dark-color);
  font-size: 12px;
  font-weight: 400;
  padding: 4px 12px;
}
.alert-circle-icon {
  flex-shrink: 0;
  margin-right: 12px;
}
/* Temporary, remove once we have all live data */
.grayed-out {
  color: rgba(96, 108, 139, 0.18);
}
.grayed-out div {
  color: rgba(96, 108, 139, 0.18);
}
.grayed-out span {
  color: rgba(96, 108, 139, 0.18);
}

@media screen and (max-width: 1050px) {
  .happ-details {
    margin: 0 0 20px 0;
    padding: 18px;
  }
  .mobile-column {
    display: flex;
  }
  .main-column {
    margin: 0 4px;
  }
  .back-link {
    margin-bottom: 4px;
  }
  .desktop {
    display: none;
  }
  .happ-image {
    margin-bottom: 10px;
  }
  .name {
    margin-bottom: 8px;
  }
  .description {
    font-size: 11px;
    margin-bottom: 46px;
  }
  .info-row {
    font-size: 14px;
  }
  .earnings-margin {
    margin-bottom: 40px;
  }
  .usage-row {
    flex-direction: column;
    margin-bottom: 24px;
  }
  .usage-label {
    margin-bottom: 10px;
  }
  .usage {
    margin: 0 0 10px 0;
  }
  .rate-row {
    margin-bottom: 11px;
  }
  .rates-margin {
    margin-bottom: 70px;
  }
  .stop-hosting-row {
    align-items: flex-start;
  }
  .modal-open {
    display: none;
  }
}
</style>
