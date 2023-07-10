<template>
  <div class="management-form">
    <h1>Home</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: "admin",
});

</script>

<style lang="scss">
.container {
  margin: 20px 0;
}

.management {
  min-height: 528px;
  border-right: 2px solid black;
  // background-color: aquamarine;
}
</style>