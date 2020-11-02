<template>
  <div class="container">
      <form @submit.prevent="login" class='form'>
        <div class='form-box'>
          <div class='holofuel-icon-disc'>
            <HoloBadgeIcon class='holofuel-icon' fill='#fff' />
          </div>
          <h1 class='title'>Login to Host Console</h1>
          <label class='label' htmlFor='email'>Email:</label>
          <input
            v-model="email"
            name='email'
            id='email'
            type='email'
            class='input'
          />
          <small v-if="!!errors.email" class="field-error">
            {{ errors.email }}
          </small>
          <label class='label' htmlFor='password'>Password:</label>
          <input
            v-model="password" 
            type='password'
            name='password'
            id='password'
            class='input'
          />
          <small v-if="!!errors.password" class='field-error'>
            {{ errors.password }}
          </small>
        </div>
        <button type='submit' class='login-button'>Login</Button>
      </form>
      <div class="reminder-text reminder-text-padding">*Remember, Holo doesn’t store your password so we can’t recover it for you. Please save your password securely!</div>
      <div class="reminder-text reminder-text-padding">
        <a class="reminder-text" href='https://holo.host/control-your-data' target='_blank' rel='noopener noreferrer'>Learn more</a> about controlling your own data.
      </div>
      <div class="reminder-text reminder-text-padding">UI v0.1.0</div>
  </div>
</template>

<script>

import validator from 'email-validator'
import HoloBadgeIcon from 'components/icons/HoloBadgeIcon.vue'

const validateEmail = email => validator.validate(email)
const validatePassword = password => password.length > 5

export default {
  name: 'HappDetails',
  components: {
    HoloBadgeIcon
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    login: function (e) {
      if (!validateEmail(this.email)) {
        this.errors.email = "Please enter a valid email."
      }

      if (!validatePassword(this.password)) {
        this.errors.password = "Password must have at least 6 characters."
      }

      if (!this.errors.email && !this.errors.password) {
        localStorage.setItem("auth_token", "true")
        if(this.$route.params.nextUrl != null){
          this.$router.push(this.$route.params.nextUrl)
        } else {
          this.$router.push('/happs')
        }
      }

      e.preventDefault();
      return false
    }
  },
  watch: {
    email (email) {
      if (this.errors.email && validateEmail(email)) {
        this.errors.email = null
      }
    },
    password (password) {
      if (this.errors.password && validatePassword(password)) {
        this.errors.password = null
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
}
.backdrop {
  background-color: rgba(0, 202, 217, 0.06);
  height: 354px;
  right: 0;
  top: 0;
  left: 0;
  z-index: -10;
  position: absolute;
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
  font-family: 'MPLUS1p';
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
  font-size: 18px;
  padding: 5px 5px;
  margin-bottom: 20px;
  font-family: 'MPLUS1p';
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
  font-family: 'MPLUS1p';
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.4px;
  color: rgba(44, 63, 89, 0.50);
}
.reminder-text-padding {
  margin-bottom: 13px;
  padding: 0 22px;
}

</style>
