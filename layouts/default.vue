<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      temporary
      app
    >
      <v-list>
        <v-list-item v-for="(item, index) in sidebarItems" :key="index" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="navigateTo(item.route)">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  <v-app-bar :fixed="fixed"
  app
  >
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
  <v-btn icon @click.stop="miniVariant = !miniVariant">
  </v-btn> 
  <v-toolbar-title>{{ title }}</v-toolbar-title>
  <v-spacer />
  <v-btn @click="logout">
      logout
      </v-btn>
</v-app-bar> 
  
    <v-main>
      <v-container>
      
        <Nuxt />
      </v-container>
    </v-main>   
    <v-footer :fixed="fixed">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware:['auth'],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'M-RYE Tech APP',  
      sidebarItems: [
        { icon: 'mdi-home', text: 'Home', route: '/' },
        { icon: 'mdi-apps', text: 'Products', route: '/products' },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      if (route.startsWith('http')) {
        window.location.href = route;
      } else {
        this.$router.push(route);
      }
    },
    logout(){
      this.$auth.logout();
      this.$router.push('/login');
    }
  },
};
</script>
