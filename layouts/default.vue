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
        <v-btn @click="logout">
      logout
      </v-btn>
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

    <v-app-bar :clipped-left="clipped">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
     
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
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
      items: [
        { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire' },
        { icon: 'mdi-apps', title: 'Products', to: '/products' },
        { icon: 'mdi-wrench', title: 'Settings', to: '/settings' },
        { icon: 'mdi-alert-circle', title: 'About Us', to: '/info' },
        //{ icon: 'mdi-logout', title: 'Log Out', to: '/' },

      ],
      miniVariant: false,
      title: 'M-RYE Tech APP',  
      sidebarItems: [
        { icon: 'mdi-account-circle', text: 'Profile', route: '/profile' },
        { icon: 'mdi-home', text: 'Home', route: 'http://localhost:3000/dashboard' },
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
