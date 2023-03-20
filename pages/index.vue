<template>
  <MainSlider />
  <HomeBanner />
  <div style="display: flex; margin-top: 30px">
    <HomeFilters />
    <HomeProducts />
  </div>
</template>

<script setup>
import MainSlider from "~~/features/home/components/MainSlider.vue";
import HomeFilters from "~~/features/home/components/HomeFilters.vue";
import HomeProducts from "~~/features/home/components/HomeProducts.vue";
import HomeBanner from "~~/features/home/components/HomeBanner.vue";
</script>

<style lang="scss" scoped></style>
