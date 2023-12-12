<template>
  <div class="main min-h-screen">
    <nav-bar v-if="navBar" />
    <router-view />
    <the-footer v-if="Footer" />
  </div>
</template>

<script>
import { initFlowbite } from "flowbite";

export default {
  data() {
    return {
      navBar: true,
      Footer: true,
    };
  },
  computed: {},
  methods: {
    hideFooter() {
      let currentRouter = this.$router.currentRoute.value.name;

      if (currentRouter == "Auth") {
        this.Footer = false;
        this.navBar = false;
      }
    },
  },
  watch: {
    $route(to, from) {
      this.hideFooter();
      initFlowbite();
    },
  },

  created() {
    this.hideFooter();
    this.$store.dispatch("auth/tryLogin");
  },
  mounted() {
    initFlowbite();
  },
};
</script>

<style src="./assets/tailwind.css"></style>
