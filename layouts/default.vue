<template>
  <div class="default-layout-container">
    <MainHeader />
    <slot />
    <MainFooter />
  </div>
</template>
<script lang="ts" setup>
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";
</script>
<style lang="scss" scoped>
.default-layout-container {
}
</style>
