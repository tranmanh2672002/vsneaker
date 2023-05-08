<template>
  <div class="wrapper">
    <div class="back">
      <v-btn
        @click="navigateTo('/')"
        color="black"
        icon="mdi-chevron-left "
      ></v-btn>
    </div>
    <div class="title">Thanh toán</div>
    <div class="Header-logo">
      <img :src="logo" alt="logo" />
    </div>
  </div>
</template>

<script setup>
import logo from "../../../assets/images/Footer-logo.png";
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 20px 100px 0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
  position: relative;
  .back {
    position: absolute;
    left: 20px;
  }
  .title {
    font-size: 2.4rem;
    font-weight: 600;
    color: #444;
    margin: 25px 45px 0 20px;
  }
}
</style>
