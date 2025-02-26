<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <template v-if="!isAuthenticated">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </template>
    <template v-else>
      <router-link to="/dashboard">Dashboard</router-link> |
      <a href="#" @click.prevent="logout">Logout</a>
    </template>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return !!this.$store.state.token;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
