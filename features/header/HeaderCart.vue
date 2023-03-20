<template>
  <v-btn class="Header-user-btn" icon="">
    <v-badge @click="handleClickShowCart" dot color="success">
      <v-icon>mdi-cart-outline</v-icon>
    </v-badge>
    <div v-if="showCart" class="cart-products"></div>
    <div v-if="showCart" class="border-triangle"></div>
  </v-btn>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";

const userStore = useUserStore();
const { user } = userStore;
const showCart = ref(false);
const handleClickShowCart = () => {
  if (!user?.isLogin) {
    navigateTo("/login");
  }
  showCart.value = !showCart.value;
  console.log(showCart.value);
};
</script>

<style lang="scss" scoped>
.Header-user-btn {
  position: relative;
  background-color: black;
  color: white;
  margin-left: 14px;
  .cart-products {
    position: absolute;
    top: calc(100% + 16px);
    right: 0;
    width: 400px;
    height: 200px;
    background-color: aliceblue;
    padding: 10px;
    z-index: 100;
  }
  .border-triangle {
    position: absolute;
    top: calc(100% + 6px);
    right: 14px;
    z-index: 10;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
}
</style>
