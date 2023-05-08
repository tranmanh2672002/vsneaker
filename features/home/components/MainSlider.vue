<template>
  <v-carousel cycle height="520" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="n in images" :key="n.id">
      <img class="MainBanner-slider" :src="n.src" alt="slider" />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import Slider1 from "~/assets/images/banner/slider1.jpg";
import Slider2 from "~/assets/images/banner/slider2.jpg";
import Slider3 from "~/assets/images/banner/slider3.jpg";

const images = ref([
  { id: 1, src: Slider3 },
  { id: 2, src: Slider2 },
  { id: 3, src: Slider1 },
]);
</script>

<style lang="scss" scoped>
.MainBanner-slider {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
