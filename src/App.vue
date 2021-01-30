<template>
  <Navbar></Navbar>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Navbar from "@/components/Navbar.vue"

@Options({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
// @import "bulma/sass/utilities/_all.sass";
// @import "bulma/sass/elements/button.sass";
// @import "bulma/sass/components/navbar.sass";
</style>
