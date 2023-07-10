<template>
  <div class="container">
    <admin-header />
    <div class="space"></div>
    <v-row>
      <v-col cols="3" class="management mt-3">
        <div>
          <router-link class="management__item" to="/admin" v-ripple exact>
            <v-icon icon="mdi-home" class="mr-1"></v-icon>
            Home
          </router-link>
        </div>
        <div>
          <router-link class="management__item" to="/admin/product" v-ripple exact>
            <v-icon icon="mdi-shoe-sneaker" class="mr-1"></v-icon>
            Product Management
          </router-link>
        </div>
        <div>
          <router-link class="management__item" to="/admin/account" v-ripple exact>
            <v-icon icon="mdi-account-multiple" class="mr-1"></v-icon>
            Account Management
          </router-link>
        </div>
      </v-col>
      <v-col cols="9" class="management-display">
        <slot />
      </v-col>
    </v-row>
    <main-footer />
  </div>
</template>

<script setup>
import MainFooter from "../components/MainFooter.vue";
import AdminHeader from "~~/components/AdminHeader.vue";


</script>

<style lang="scss" scoped>
.container {
  .space {
    height: 80px;
  }
}

.management {
  min-height: 528px;
  border-right: 2px solid black;
  font-size: 1.4rem;
  width: 100%;
  // text-align: center;
  font-weight: 550;

  .management__item {
    display: flex;
    text-decoration: none;
    color: black;
    margin-top: 8px;
    padding: 10px 0 10px 20px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    align-items: center;

    &:hover {
      background-color: #ebe8e8;
    }
  }

  .router-link-exact-active {
    background-color: #ebe8e8;
  }
}
</style>