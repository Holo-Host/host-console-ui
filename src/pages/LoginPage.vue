<template>
  <div class="container">
    <div
      class="error-banner"
      data-test-login-page-error-banner
    >
      <LoginErrorBanner
        :is-visible="!!errors.api"
        :message="errors.api"
      />
    </div>

    <form
      class="form"
      data-test-login-page-form
      @submit.prevent=""
    >
      <div class="form-box">
        <h1
          class="title"
          data-test-login-page-form-title
        >
          {{ $t('login.title') }}
        </h1>

        <span
          class="subtitle"
          data-test-login-page-form-subtitle
        >
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
          data-test-login-page-form-email-input
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
          data-test-login-page-form-password-input
        />

        <BaseButton
          :is-disabled="!email || !password || isLoading"
          :is-busy="isLoading"
          :type="EButtonType.gray"
          class="login-button"
          data-test-login-page-form-submit-button
          @click="login"
        >
          {{ $t('$.login') }}
        </BaseButton>
      </div>
    </form>

    <LoginFooter data-test-login-page-footer />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseLoginInput from '@uicommon/components/BaseLoginInput.vue'
import { EButtonType, EInputType } from '@uicommon/types/ui'
import validator from 'email-validator'
import { reactive, ref, watch, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LoginErrorBanner from '@/components/LoginErrorBanner'
import LoginFooter from '@/components/LoginFooter.vue'
import { kAuthTokenLSKey } from '@/constants'
import { useHposInterface } from '@/interfaces/HposInterface'
import { kRoutes } from '@/router'
import { useUserStore } from '@/store/user'
import { isAdminSignature } from '@/types/predicates'
import type { AuthHeaders } from '@/types/types'
import { generateToken } from '@/utils'

const { checkAuth } = useHposInterface()

const kMinPasswordLength = 5

const validateEmail = (email: string): boolean => validator.validate(email)
const validatePassword = (password: string): boolean => password.length > kMinPasswordLength

// eslint-disable-next-line no-undef
let errorTimeoutInstance: NodeJS.Timeout | null = null
const kErrorTimeout = 5000

const router = useRouter()
const { t } = useI18n()

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errors = reactive({ email: '', password: '', api: '' })
const isLoading = ref(false)

onMounted(async (): Promise<void> => {
  // redirect from login page if user already logged in
  // To prevent infinite loop of redirects code will erase authToken
  // from localStorage whenever 401 from server is detected
  if (localStorage.getItem(kAuthTokenLSKey) !== null) {
    await router.push({ name: kRoutes.dashboard.name })
  }
})

watch(
  (): string => email.value,
  (value: string): void => {
    errors.api = ''

    if (errorTimeoutInstance) {
      clearTimeout(errorTimeoutInstance)
    }

    if (errors.email && validateEmail(value)) {
      errors.email = ''
    }
  }
)

watch(
  (): string => password.value,
  (value: string): void => {
    errors.api = ''

    if (errorTimeoutInstance) {
      clearTimeout(errorTimeoutInstance)
    }

    if (errors.password && validatePassword(value)) {
      errors.password = ''
    }
  }
)

async function createAuthHeaders(): Promise<AuthHeaders | null> {
  const authToken = generateToken()

  // make a call to API to check if it passes auth
  const checkAuthResult = await checkAuth(email.value.toLowerCase(), password.value, authToken)

  if (isAdminSignature(checkAuthResult)) {
    return { authToken, adminSignature: checkAuthResult.adminSignature }
  } else {
    return null
  }
}

function showApiError(message: string): void {
  if (errors.api) {
    errors.api = ''

    if (errorTimeoutInstance) {
      clearTimeout(errorTimeoutInstance)
    }
  }

  errors.api = message

  errorTimeoutInstance = setTimeout(() => {
    errors.api = ''
  }, kErrorTimeout)
}

async function login(): Promise<void> {
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
        const authHeaders = await createAuthHeaders()

        if (authHeaders) {
          localStorage.setItem(kAuthTokenLSKey, authHeaders.authToken)

          try {
            await userStore.getUser()
          } catch (e) {
            localStorage.removeItem(kAuthTokenLSKey)
            showApiError(t('login.errors.frozen_holochain'))
          }

          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          await nextTick(async (): Promise<void> => {
            await router.push({ name: kRoutes.dashboard.name })
          })
        } else {
          showApiError(t('$.errors.login_failed'))
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        await nextTick(async (): Promise<void> => {
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
