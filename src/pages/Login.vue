<template>
  <div v-if="banner" class="banner">{{ banner }}</div>
  <div class="container">
      <form @submit.prevent="" class="form">
        <div class="form-box">
          <div class="holofuel-icon-disc">
            <HoloBadgeIcon class="holofuel-icon" fill="#fff" />
          </div>
          <h1 class="title">Host Console Login</h1>
          <label class="label" htmlFor="email">Email:</label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="input"
          />
          <small v-if="!!errors.email" class="field-error">
            {{ errors.email }}
          </small>
          <label class="label" htmlFor="password">Password:</label>
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="input"
          />
          <small v-if="!!errors.password" class="field-error">
            {{ errors.password }}
          </small>
        </div>
        <button @click="login" class="login-button">Login</Button>
      </form>
      <div class="reminder-text reminder-text-padding">*Remember, Holo doesn’t store your password so we can’t recover it for you. Please save your password securely!</div>
      <div class="reminder-text reminder-text-padding">
        <a class="reminder-text" href="https://holo.host/control-your-data" target="_blank" rel="noopener noreferrer">Learn more</a> about controlling your own data.
      </div>
      <div class="reminder-text reminder-text-padding">Host Console version {{ uiVersion }}</div>
  </div>
</template>

<script>

import validator from 'email-validator'
import HoloBadgeIcon from 'components/icons/HoloBadgeIcon.vue'
import { getHpAdminKeypair, eraseHpAdminKeypair } from 'src/utils/keyManagement'
import HposInterface from 'src/interfaces/HposInterface'

const validateEmail = email => validator.validate(email)
const validatePassword = password => password.length > 5

async function createKeypairAndCheckAuth (email, password) {
  eraseHpAdminKeypair()

  // we call this to SET the singleton value of HpAdminKeypair
  await getHpAdminKeypair(email, password)

  return HposInterface.checkAuth()
}

export default {
  name: 'HappDetails',
  components: {
    HoloBadgeIcon
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {},
      banner: ''
    }
  },
  methods: {
    login: async function (e) {
      if (!validateEmail(this.email)) {
        this.errors.email = 'Please enter a valid email.'
      }

      if (!validatePassword(this.password)) {
        this.errors.password = 'Password must have at least 6 characters.'
      }

      if (!this.errors.email && !this.errors.password) {
        const isAuthed = await createKeypairAndCheckAuth(this.email, this.password)
        if (isAuthed) {
          localStorage.setItem('isAuthed', 'true')
          if(this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl)
          } else {
            this.$router.push('/happs')
          }
        } else {
          this.banner = 'There was a problem logging you in. Please check your credentials and try again.'
        }
      }

      e.preventDefault();
      return false
    }
  },
  computed: {
    uiVersion () {
      return process.env.VUE_APP_UI_VERSION
    }
  },
  watch: {
    email (email) {
      this.banner = ''
      if (this.errors.email && validateEmail(email)) {
        this.errors.email = null
      }
    },
    password (password) {
      this.banner = ''
      if (this.errors.password && validatePassword(password)) {
        this.errors.password = null
        this.banner = ''
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 70px;
  margin-left: 78px;
  margin-right: 78px;
  max-width: 466px;
  align-self: center;
}
.banner {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #00CAD9;
  opacity: 0.9;
  padding: 20px;
  margin: 0px -78px;
  text-align: center;
  align-self: center;
  z-index: 30;
  color: white;
}
.form {
  display: flex;
  flex-direction: column;
}
.form-box {
  background: #FFFFFF;
  box-shadow: 0px 2.5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 40px;
  padding: 0 24px 32px 24px;
}
.holofuel-icon-disc {
  border-radius: 50%;
  width: 55px;
  height: 55px;
  background-color:#03838d;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: relative;
  top: -27px;
}
.holofuel-icon {
  width: 35px;
  height: 25px;
}
.title {
  color: rgba(44, 63, 89, 0.80);
  align-self: center;
  margin-bottom: 29px;
  font-weight: 200;
}
.label {
  font-weight: bold;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: rgba(44, 63, 89, 0.60);
}
.input {
  border: none;
  border-bottom: 1px solid rgba(44, 63, 89, 0.50);
  padding: 5px 5px;
  margin-bottom: 20px;
  color: rgba(44, 63, 89, 1);
}
.login-button {
  align-self: center;
  font-size: 16px;
  height: 43px;
  width: 192px;
  margin-bottom: 32px;
  color: white;
  border: 1px solid #00CAD9;
  background: #00CAD9;
  border-radius: 100px;
  cursor: pointer;
}
.field-error {
  font-size: .9em;
  font-weight: 500;
  color: #a00;
  margin: .3em 0 .0;
}
.reminder-text {
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.4px;
  color: rgba(44, 63, 89, 0.50);
}
.reminder-text-padding {
  margin-bottom: 13px;
  padding: 0 22px;
}

@media screen and (max-width: 1050px) {
  .title {
    text-align: center;
    font-size: 26px;
  }
}

</style>
