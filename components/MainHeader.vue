<template>
  <div class="Header-wrapper">
    <div class="Header-logo">
      <img :src="logo" alt="logo" />
    </div>

    <div class="Header-link">
      <router-link class="Header-link-item" to="/">Home</router-link>
      <router-link class="Header-link-item" to="/about">About</router-link>
      <router-link class="Header-link-item" to="/sale">Sales</router-link>
      <router-link class="Header-link-item" to="/blog">Blog</router-link>
    </div>
    <div class="Header-user">
      <HeaderUserAvatar />
      <HeaderCart />
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/images/Header-logo.png";
import HeaderCart from "../features/header/components/HeaderCart.vue";
import HeaderUserAvatar from "../features/header/components/HeaderUserAvatar.vue";
</script>

<style lang="scss" scoped>
.Header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 80px;
  padding: 10px 40px;
  background-color: black;
}

.Header-logo {
  flex: 1;
  height: 60px;
  img {
    width: 140px;
    cursor: pointer;
  }
}

.Header-link {
  .Header-link-item {
    color: white;
    padding: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    text-decoration: none;
  }
  .router-link-exact-active {
    color: #f12f2f;
  }
}

.Header-user {
  margin-left: 40px;
  display: flex;
  align-items: center;
}
</style>
