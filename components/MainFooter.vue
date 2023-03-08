<template>
  <div class="Main-footer">
    <v-row align="start" no-gutters>
      <v-col class="Footer-col" cols="12" sm="6" md="3" lg="3">
        <h2 class="Footer-title">V-Sneaker</h2>
        <ul class="Footer-list">
          <li class="Footer-item" v-for="d in Discovery" :key="d">
            {{ d.title }}
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3">
        <h2 class="Footer-title">Contact</h2>
        <ul class="Footer-list">
          <li class="Footer-item" v-for="d in Contact" :key="d">
            {{ d.title }}
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3">
        <h2 class="Footer-title">Blog page</h2>
        <ul class="Footer-list">
          <li class="Footer-item" v-for="d in Blog" :key="d">
            {{ d.title }}
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3">
        <div class="Footer-col-img">
          <img :src="logoSneaker" alt="logo-sneaker" />
        </div>
      </v-col>
    </v-row>
    <v-col style="margin-top: 40px" cols="12">
      <img :src="HeaderLogo" alt="logo" />
    </v-col>
  </div>
</template>

<script setup>
import logoSneaker from "../assets/images/Footer-logo.png";
import HeaderLogo from "../assets/images/Header-logo.png";

const Discovery = ref([
  { id: 1, title: "Home" },
  { id: 2, title: "About" },
  { id: 3, title: "Sales" },
  { id: 4, title: "Blog" },
]);
const Contact = ref([
  { id: 1, title: "085.907.3125 (Zalo)" },
  { id: 2, title: "Fb.com/vsneakerday" },
  { id: 3, title: "Vsneaker.weebly.com" },
  { id: 4, title: "Vsneakershop.weebly.com" },
]);
const Blog = ref([
  { id: 1, title: "Chúng tôi là ai?" },
  { id: 2, title: "Bán những loại giày nào" },
  { id: 3, title: "Uy tín 100%" },
  { id: 4, title: "V-Sneak" },
]);
</script>

<style lang="scss" scoped>
.Main-footer {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;

  .Footer-title {
    padding-top: 40px;
    font-size: 1.6rem;
  }

  .Footer-list {
    padding-left: 20px;
    margin-top: 10px;
    list-style: none;
  }

  .Footer-item {
    font-size: 1.2rem;
    padding-top: 4px;
  }

  .Footer-col-img {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
