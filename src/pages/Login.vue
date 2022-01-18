<template>
  <div v-if="banner" class="banner">{{ banner }}</div>
  <div class="container">
      <form @submit.prevent="" class="form">
        <div class="form-box">
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
          <div class="password-input">
            <input
              v-model="password"
              :type="passwordFieldType"
              name="password"
              id="password"
              class="input"
            />
            <VisibleEyeIcon v-if="isPasswordVisible" @click="hidePassword" class='eye-icon' />
            <InvisibleEyeIcon v-else @click="showPassword" class='eye-icon' />
          </div>
          <small v-if="!!errors.password" class="field-error">
            {{ errors.password }}
          </small>
          <button @click="login" class="login-button">Login</Button>
        </div>
      </form>
      <div class="footer">
        <div>Hosted by</div>
        <div class="logo-row">
          <img src="/images/holo-logo-bw.png" /> HOLO
        </div>
        <div>*Remember, Holo doesn’t store your password so we can’t recover it for you. Please save your password securely!</div>
        <div>
          <a href="https://holo.host/control-your-data" target="_blank" rel="noopener noreferrer">Learn more</a> about controlling your own data.
        </div>
        <div class="version">Host Console version {{ uiVersion }}</div>
      </div>
  </div>
</template>

<script>

import validator from 'email-validator'
import HoloBadgeIcon from 'components/icons/HoloBadgeIcon.vue'
import InvisibleEyeIcon from 'components/icons/InvisibleEyeIcon.vue'
import VisibleEyeIcon from 'components/icons/VisibleEyeIcon.vue'
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
    HoloBadgeIcon,
    InvisibleEyeIcon,
    VisibleEyeIcon
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {},
      banner: '',
      isPasswordVisible: false
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
            this.$router.push('/dashboard')
          }
        } else {
          this.banner = 'There was a problem logging you in. Please check your credentials and try again.'
        }
      }

      e.preventDefault();
      return false
    },
    showPassword () {
      this.isPasswordVisible = true
    },
    hidePassword () {
      this.isPasswordVisible = false
    }
  },
  computed: {
    uiVersion () {
      return process.env.VUE_APP_UI_VERSION
    },
    passwordFieldType () {
      return this.isPasswordVisible ? 'text' : 'password'
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
  margin-bottom: 32px;
  padding: 58px 62px 54px 62px;
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
  color: #606C8B;
  align-self: center;
  margin-bottom: 29px;
  font-weight: 600;
  font-size: 28px;
  margin: 0 0 50px 0;
}
.label {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #606C8B;
  text-transform: uppercase;
}
.input {
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(44, 63, 89, 0.50);
  padding: 5px 5px;
  margin-bottom: 20px;
  color: rgba(44, 63, 89, 1);
}
.password-input {
  position: relative;
  display: flex;
}
.password-input input {
  flex-grow: 1;
}
.eye-icon {
  position: absolute;
  right: 0px;
  cursor: pointer;
}
.login-button {
  align-self: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  height: 34px;
  width: 192px;
  margin-top: 26px;
  color: #606C8B;
  border: 1px solid #606C8B;
  background: white;
  border-radius: 100px;
  cursor: pointer;
}
.field-error {
  font-size: 12px;
  font-weight: 500;
  color: #a00;
  margin: -10px 0 15px;
}

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
  font-family: 'Raleway';
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

.footer a, .footer a:visited {
  color: #000000;
}

.version {
  margin-top: 20px;
}

@media screen and (max-width: 1050px) {
  .title {
    text-align: center;
    font-size: 26px;
  }
}

</style>
