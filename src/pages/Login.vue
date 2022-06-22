<template>
  <div
    v-if="banner"
    class="banner"
  >
    {{ banner }}
  </div>
  <div class="container">
    <form
      class="form"
      @submit.prevent=""
    >
      <div class="form-box">
        <h1 class="title">
          Host Console Login
        </h1>

        <span class="subtitle">
          published by Holo
        </span>

        <BaseLoginInput
          v-model="email"
          :input-type="inputTypes.email"
          :is-valid="!errors.email"
          has-errors
          label="Email:"
          name="email"
          :message="errors.email"
          class="login-input"
        />

        <BaseLoginInput
          v-model="password"
          :input-type="inputTypes.password"
          :is-valid="!errors.password"
          has-errors
          label="Password:"
          name="password"
          :message="errors.password"
        />

        <BaseButton
          :is-disabled="!email || !password || isLoading"
          :is-busy="isLoading"
          :type="buttonType"
          class="login-button"
          @click="login"
        >
          Login
        </BaseButton>
      </div>
    </form>

    <div class="footer">
      <div>Hosted by</div>
      <div class="logo-row">
        <img
          src="/images/holo-logo-bw.png"
          alt="holo logo"
        /> HOLO
      </div>
      <div>
        *Remember, Holo doesn’t store your password so we can’t recover it for you. Please save your password securely!
      </div>
      <div>
        <a
          href="https://holo.host/control-your-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a> about controlling your own data.
      </div>
      <div class="version">
        Host Console version {{ uiVersion }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from 'components/BaseButton'
import BaseLoginInput from 'components/BaseLoginInput'
import validator from 'email-validator'
import HposInterface from 'src/interfaces/HposInterface'
import { getHpAdminKeypair, eraseHpAdminKeypair } from 'src/utils/keyManagement'
import { EButtonType, EInputType } from '../types/ui'

const kMinPasswordLength = 5

const validateEmail = (email) => validator.validate(email)
const validatePassword = (password) => password.length > kMinPasswordLength

async function createKeypairAndCheckAuth(email, password) {
  eraseHpAdminKeypair()

  // we call this to SET the singleton value of HpAdminKeypair
  await getHpAdminKeypair(email, password)

  return HposInterface.checkAuth()
}

export default {
  name: 'LoginPage',

  components: {
    BaseButton,
    BaseLoginInput
  },

  data() {
    return {
      email: '',
      password: '',
      errors: {},
      banner: '',
      isPasswordVisible: false,
      isLoading: false
    }
  },

  computed: {
    buttonType() {
      return EButtonType.secondary
    },

    inputTypes() {
      return EInputType
    },

    uiVersion() {
      return process.env.VUE_APP_UI_VERSION
    },

    passwordFieldType() {
      return this.isPasswordVisible ? 'text' : 'password'
    }
  },

  watch: {
    email(email) {
      this.banner = ''

      if (this.errors.email && validateEmail(email)) {
        this.errors.email = null
      }
    },

    password(password) {
      this.banner = ''

      if (this.errors.password && validatePassword(password)) {
        this.errors.password = null
        this.banner = ''
      }
    }
  },

  methods: {
    async login() {
      if (!validateEmail(this.email.toLowerCase())) {
        this.errors.email = 'Please enter a valid email.'
      }

      if (!validatePassword(this.password)) {
        this.errors.password = 'Password must have at least 6 characters.'
      }

      if (!this.errors.email && !this.errors.password) {
        this.isLoading = true

        try {
          const isAuthed = await createKeypairAndCheckAuth(this.email.toLowerCase(), this.password)

          if (isAuthed) {
            localStorage.setItem('isAuthed', 'true')

            if (this.$route.params.nextUrl !== null) {
              await this.$router.push(this.$route.params.nextUrl)
            } else {
              await this.$router.push('/dashboard')
            }
          } else {
            this.banner =
              'There was a problem logging you in. Please check your credentials and try again.'
          }
        } catch (e) {
          this.banner =
            'There was a problem logging you in. Please check your credentials and try again.'
        } finally {
          this.isLoading = false
        }
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
  background-color: #00cad9;
  opacity: 0.9;
  padding: 20px;
  margin: 0 -78px;
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
  background: #ffffff;
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 32px;
  padding: 58px 62px 54px 62px;
}

.title {
  color: #606c8b;
  align-self: center;
  font-weight: 600;
  font-size: 28px;
  margin: 0;
}

.subtitle {
  margin-top: 16px;
  color: #606c8b;
  align-self: center;
  font-weight: 400;
  font-size: 12px;
}

.login-input {
  margin-top: 45px;
}

.login-button {
  align-self: center;
  width: 192px;
  margin-top: 24px;
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

@media screen and (max-width: 1050px) {
  .title {
    text-align: center;
    font-size: 26px;
  }
}
</style>
