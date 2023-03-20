<template>
  <div class="wrapper"><img :src="logo" alt="image" /></div>
</template>

<script setup>
import logo from "@/assets/images/Header-logo.png";
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background-color: black;
}
</style>
