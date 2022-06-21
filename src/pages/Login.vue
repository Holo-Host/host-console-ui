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

        <label
          class="label"
          htmlFor="email"
        >
          Email:
        </label>

        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="input"
        />

        <small
          v-if="!!errors.email"
          class="field-error"
        >
          {{ errors.email }}
        </small>

        <label
          class="label"
          htmlFor="password"
        >
          Password:
        </label>

        <div class="password-input">
          <input
            id="password"
            v-model="password"
            :type="passwordFieldType"
            name="password"
            class="input"
          />
          <VisibleEyeIcon
            v-if="isPasswordVisible"
            class="eye-icon"
            @click="hidePassword"
          />
          <InvisibleEyeIcon
            v-else
            class="eye-icon"
            @click="showPassword"
          />
        </div>

        <small
          v-if="!!errors.password"
          class="field-error"
        >
          {{ errors.password }}
        </small>

        <button
          class="login-button"
          @click="login"
        >
          Login
        </Button>
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
import InvisibleEyeIcon from 'components/icons/InvisibleEyeIcon.vue'
import VisibleEyeIcon from 'components/icons/VisibleEyeIcon.vue'
import validator from 'email-validator'
import HposInterface from 'src/interfaces/HposInterface'
import { getHpAdminKeypair, eraseHpAdminKeypair } from 'src/utils/keyManagement'

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
    InvisibleEyeIcon,
    VisibleEyeIcon
  },

  data() {
    return {
      email: '',
      password: '',
      errors: {},
      banner: '',
      isPasswordVisible: false
    }
  },

  computed: {
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
    async login(e) {
      if (!validateEmail(this.email.toLowerCase())) {
        this.errors.email = 'Please enter a valid email.'
      }

      if (!validatePassword(this.password)) {
        this.errors.password = 'Password must have at least 6 characters.'
      }

      if (!this.errors.email && !this.errors.password) {
        const isAuthed = await createKeypairAndCheckAuth(this.email.toLowerCase(), this.password)

        if (isAuthed) {
          localStorage.setItem('isAuthed', 'true')

          if (this.$route.params.nextUrl !== null) {
            this.$router.push(this.$route.params.nextUrl)
          } else {
            this.$router.push('/dashboard')
          }
        } else {
          this.banner =
            'There was a problem logging you in. Please check your credentials and try again.'
        }
      }

      e.preventDefault()
      return false
    },

    showPassword() {
      this.isPasswordVisible = true
    },

    hidePassword() {
      this.isPasswordVisible = false
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
  margin: 0 0 50px 0;
}
.label {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #606c8b;
  text-transform: uppercase;
}
.input {
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(44, 63, 89, 0.5);
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
  right: 0;
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
  color: #606c8b;
  border: 1px solid #606c8b;
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
