<template>
  <div class="container">
    <admin-header />
    <div class="space"></div>
    <slot />
    <main-footer />
  </div>
</template>

<script setup>
import MainFooter from "../components/MainFooter.vue";
import AdminHeader from "~~/components/AdminHeader.vue";

</script>

<style lang="scss" scoped>
.container {
  .space {
    height: 80px;
  }
}
</style>