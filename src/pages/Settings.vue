<template>
  <PrimaryLayout title="HoloPort Settings">
    <div class='settings'>
      <h3>{{ deviceName }}</h3>
      
      <div class='settings-row'>
        <div class='row-label'>
          HPOS Version
        </div>
        <div class='row-value'>
          {{ hposVersion }}
        </div>
      </div>

      <div class='settings-row'>
        <div class='row-label'>
          Device Name
        </div>
        <div class='row-value'>
          {{ deviceName }}
        </div>
      </div>

      <div class='settings-row'>
        <div class='row-label'>
          Network
        </div>
        <div class='row-value'>
          {{ networkStatus }}
        </div>
      </div>

      <div class='settings-row'>
        <div class='row-label'>
          Access for HoloPort support (SSH)
        </div>
        <div class='row-value'>
          <input type="checkbox" id="checkbox" v-model="sshAccess">
        </div>
      </div>

    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'Settings',
  components: {
    PrimaryLayout
  },
  data () {
    return {
      settings: {},
      isLoading: true
    }
  },
  async mounted () {
    const settings = await HposInterface.settings()
    this.settings = settings
    this.isLoading = false
  },
  computed: {
    hposVersion () {
      return '70791b'
    },
    deviceName () {
      return this.isLoading ? 'Loading...' : this.settings.deviceName
    },
    networkStatus () {
      return this.isLoading ? 'Loading...' : this.settings.networkStatus
    },
    sshAccess: {
      get () {
        return this.settings.sshAccess
      },
      set (newValue) {
        HposInterface.updateSettings({
          sshAccess: newValue
        })
        this.settings.sshAccess = newValue
      },
    },
  }
}

</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 5px;
  margin: 40px 18px 20px 0;
  padding: 30px;
  color: #606C8B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.settings-row {
  display: flex;
}
.row-label {
  flex-basis: 200px;
}
</style>
