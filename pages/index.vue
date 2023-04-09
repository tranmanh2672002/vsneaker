<template>
  <div v-if="userStore.user?.role === 'admin'"></div>
  <div v-else>
    <MainSlider />
    <HomeBanner />
    <div style="display: flex; margin-top: 30px">
      <HomeFilters />
      <HomeProducts />

      <ScrollTopBtn />
    </div>
  </div>
</template>

<script setup>
import MainSlider from "~~/features/home/components/MainSlider.vue";
import HomeFilters from "~~/features/home/components/HomeFilters.vue";
import HomeProducts from "~~/features/home/components/HomeProducts.vue";
import HomeBanner from "~~/features/home/components/HomeBanner.vue";
import ScrollTopBtn from "~~/components/ScrollTopBtn.vue";
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
