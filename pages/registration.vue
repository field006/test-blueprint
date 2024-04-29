<template>
  <div class="registration-container">
    <v-card class="registration-card">
      <v-card-title class="headline">Registration Form</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="registerUser">
          <!-- Name Field with Validation -->
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="name"
              label="Name"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>

          <!-- Email Field with Validation -->
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <v-text-field
              v-model="email"
              label="Email"
              :error-messages="errors"
              required
            ></v-text-field>
          </ValidationProvider>

          <!-- Password Field with Validation -->
          <ValidationProvider rules="required|min:6" v-slot="{ errors }">
            <v-text-field
              v-model="password"
              label="Password"
              :error-messages="errors"
              required
              type="password"
            ></v-text-field>
          </ValidationProvider>

          <!-- Confirm Password Field with Validation -->
          <ValidationProvider rules="required|min:6" v-slot="{ errors, validate }">
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :error-messages="errors"
              required
              type="password"
              @input="validate"
            ></v-text-field>
          </ValidationProvider>
          
          <!-- Submit Button -->
          <v-btn
            type="submit"
            color="primary"
            :disabled="!validForm"
          >
            Register
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import axios from 'axios'; // Import Axios

import { ValidationProvider, extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules'; // Importing the email and min rules

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('email', {
  ...email,
  message: 'Invalid email format'
});

extend('min', {
  ...min,
  message: 'Password must be at least 6 characters'
});

export default {
  layout: 'noheader',
  components: {
    ValidationProvider
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    validForm() {
      const isFormValid = this.$refs.form && this.$refs.form.validate();
      const passwordsMatch = this.password === this.confirmPassword;
      return isFormValid && passwordsMatch;
    },
  },
  methods: {
    registerUser() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      // Make API request to register user
      axios.post('/api/register', userData)
        .then(response => {
          // Handle successful registration
          console.log('User registered successfully:', response.data);
        })
        .catch(error => {
          // Handle registration error
          console.error('Registration failed:', error.response.data);
        });
    }
  },
};
</script>

<style>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ensure the container takes up the full viewport height */
}
.registration-card {
  width: 400px; /* Adjust the width to your preference */
}
</style>
