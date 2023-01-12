<template>
  <div id="app">
    <MainNavigation />
    <router-view />
  </div>
</template>

<script>
import MainNavigation from "./components/navigation/MainNavigation.vue";

export default {
  components: {
    MainNavigation,
  },
};
</script>

<style scoped>
@import "./assets/css/colors.css";
</style>
