<template>
  <MainSlider />
  <HomeBanner />
  <div style="display: flex; margin-top: 30px">
    <HomeFilters />
    <HomeProducts />

    <!-- <div class="d-flex flex-column align-center bg-grey-lighten-4 pa-6">
      <v-btn-toggle v-model="toggle" color="primary" mandatory>
        <v-btn icon="mdi-format-align-left" value="left"></v-btn>
        <v-btn icon="mdi-format-align-center" value="center"></v-btn>
        <v-btn icon="mdi-format-align-right" value="right"></v-btn>
        <v-btn icon="mdi-format-align-justify" value="justify"></v-btn>
      </v-btn-toggle>
      <pre class="pt-2">{{ toggle }}</pre>
    </div> -->
  </div>
</template>

<script setup>
import MainSlider from "~~/features/home/components/MainSlider.vue";
import HomeFilters from "~~/features/home/components/HomeFilters.vue";
import HomeProducts from "~~/features/home/components/HomeProducts.vue";
import HomeBanner from "~~/features/home/components/HomeBanner.vue";

const toggle = ref();
</script>

<style lang="scss" scoped></style>
