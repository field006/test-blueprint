<template>
  <v-app id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" prepend-icon="mdi-account-circle" name="login" label="Login" type="text"></v-text-field>
                <v-text-field v-model="password" id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn to="/" color="primary">Return</v-btn>
              <v-btn @click="login" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
export default {
  layout: 'noheader',

  // middleware: 'NotAuthenticated', // Apply the middleware to the login page
  // Other login page logic

  data() {
    return {
      email: '',
      password: ''
    };
  },

  mounted() {
    // Call the login method if needed
    // this.login();
    // console.log(process.env.VUE_APP_BACKEND_URL);
  },

  methods: {
    //async fetchData() {
    //  try {
    //    const response = await this.$axios.get('http://127.0.0.1:8000/user');
        // Handle response...
    //  } catch (error) {
    //    console.error('Fetch data failed', error);
    //  }
    //},

    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        }).then((res)=>{
          // localStorage.setItem('token', token);
          this.$auth.setUser(res.data.user)
        });
        
        // Optionally, you can store the token in local storage or Vuex store
        // Redirect the user after successful login
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
