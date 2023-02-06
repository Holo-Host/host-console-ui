<template>
  <div class="container">
    <div class="error-banner">
      <LoginErrorBanner
        :is-visible="!!errors.api"
        :message="errors.api"
      />
    </div>

    <form
      class="form"
      @submit.prevent=""
    >
      <div class="form-box">
        <h1 class="title">
          {{ $t('login.title') }}
        </h1>

        <span class="subtitle">
          {{ $t('login.subtitle') }}
        </span>

        <BaseLoginInput
          id="email"
          v-model="email"
          :input-type="EInputType.email"
          :is-valid="!errors.email"
          has-errors
          :label="$t('login.email')"
          name="email"
          :message="errors.email"
          class="login-input"
        />

        <BaseLoginInput
          id="password"
          v-model="password"
          :input-type="EInputType.password"
          :is-valid="!errors.password"
          has-errors
          :label="$t('login.password')"
          name="password"
          :message="errors.password"
        />

        <BaseButton
          :is-disabled="!email || !password || isLoading"
          :is-busy="isLoading"
          :type="EButtonType.gray"
          class="login-button"
          @click="login"
        >
          {{ $t('$.login') }}
        </BaseButton>
      </div>
    </form>

    <div class="footer">
      <div>{{ $t('$.hosted_by') }}</div>
      <div class="logo-row">
        <img
          src="/images/holo-logo-bw.png"
          alt="holo logo"
        /> {{ $t('$.holo') }}
      </div>
      <div>
        {{ $t('login.password_reminder') }}
      </div>
      <div>
        <a
          href="https://holo.host/control-your-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('$.learn_more') }}
        </a> {{ $t('login.controlling_your_data') }}
      </div>
      <div class="version">
        {{ $t('$.app_version', { app: 'Host Console', version }) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseLoginInput from '@uicommon/components/BaseLoginInput.vue'
import { EButtonType, EInputType } from '@uicommon/types/ui'
import LoginErrorBanner from 'components/LoginErrorBanner'
import validator from 'email-validator'
import { reactive, ref, computed, watch, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useHposInterface } from '@/interfaces/HposInterface'
import { kAuthTokenLSKey } from '@/constants'
import { kRoutes } from '@/router'
import { useUserStore } from '@/store/user'
import { generateToken } from '@/utils'

const { checkAuth } = useHposInterface()

const kMinPasswordLength = 5

const validateEmail = (email) => validator.validate(email)
const validatePassword = (password) => password.length > kMinPasswordLength

let errorTimeoutInstance = null
const kErrorTimeout = 5000

const router = useRouter()
const { t } = useI18n()

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errors = reactive({ email: '', password: '', api: '' })
const isLoading = ref(false)

const version = computed(() => process.env.VUE_APP_UI_VERSION)

onMounted(async () => {
  // redirect from login page if user already logged in
  // To prevent infinite loop of redirects code will erase authToken
  // from localStorage whenever 401 from server is detected
  if (localStorage.getItem(kAuthTokenLSKey) !== null) {
    await router.push({ name: kRoutes.dashboard.name })
  }
})

watch(
  () => email.value,
  (value) => {
    errors.api = ''
    clearTimeout(errorTimeoutInstance)

    if (errors.email && validateEmail(value)) {
      errors.email = ''
    }
  }
)

watch(
  () => password.value,
  (value) => {
    errors.api = ''
    clearTimeout(errorTimeoutInstance)

    if (errors.password && validatePassword(value)) {
      errors.password = ''
    }
  }
)

async function createAuthHeaders(email, password) {
  const authToken = generateToken()

  // make a call to API to check if it passes auth
  const { adminSignature } = await checkAuth(email.toLowerCase(), password, authToken)

  if (adminSignature) {
    return { authToken, adminSignature }
  } else {
    return null
  }
}

function showApiError(message) {
  if (errors.api) {
    errors.api = ''
    clearTimeout(errorTimeoutInstance)
  }

  errors.api = message

  errorTimeoutInstance = setTimeout(() => {
    errors.api = ''
  }, kErrorTimeout)
}

async function login() {
  if (!validateEmail(email.value.toLowerCase())) {
    errors.email = t('$.errors.email')
  }

  if (!validatePassword(password.value)) {
    errors.password = t('$.errors.password')
  }

  if (!errors.email && !errors.password) {
    isLoading.value = true

    try {
      if (localStorage.getItem(kAuthTokenLSKey) === null) {
        const authHeaders = await createAuthHeaders(email.value, password.value)

        if (authHeaders) {
          localStorage.setItem(kAuthTokenLSKey, authHeaders.authToken)

          try {
            await userStore.getUser()
          } catch (e) {
            localStorage.removeItem(kAuthTokenLSKey)
            showApiError(t('login.errors.frozen_holochain'))
          }

          await nextTick(async () => {
            await router.push({ name: kRoutes.dashboard.name })
          })
        } else {
          showApiError(t('$.errors.login_failed'))
        }
      } else {
        await nextTick(async () => {
          await router.push({ name: kRoutes.dashboard.name })
        })
      }
    } catch (e) {
      showApiError(t('$.errors.login_failed'))
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<style scoped>
.container {
  padding: 24px;
  align-self: center;
}

.error-banner {
  display: flex;
  justify-content: center;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-box {
  background: #ffffff;
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 32px;
  padding: 42px 24px 38px;
}

.title {
  text-align: center;
  font-size: 26px;
  color: var(--grey-color);
  font-weight: 600;
  margin: 0;
}

.subtitle {
  margin-top: 16px;
  color: var(--grey-color);
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
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width: 1050px) {
  .container {
    width: 720px;
    padding-top: 64px;
    margin-left: 78px;
    margin-right: 78px;
  }

  .error-banner {
    padding: 0 24px;
  }

  .title {
    font-size: 28px;
  }

  .form-box {
    padding: 58px 62px 54px 62px;
  }
}
</style>
