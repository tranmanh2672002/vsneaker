<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="480" class="mx-auto wrapper">
      <div class="text-h2 d-flex justify-center header">VSneaker</div>
      <div class="text-h4 d-flex justify-center header">Login</div>
      <v-form fast-fail @submit.prevent="handleClickLogin">
        <v-text-field v-model="username" label="User Name"></v-text-field>

        <v-text-field
          v-model="password"
          label="password"
          type="password"
        ></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
        <div class="register">
          <nuxt-link
            class="link text-h6 d-flex justify-center header"
            to="/register"
            ><v-btn color="success" block class="mt-2"
              >Sign up</v-btn
            ></nuxt-link
          >
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
definePageMeta({
  layout: "auth",
});

const userStore = useUserStore();
const { setUser } = userStore;

const username = ref("");
const password = ref("");

const handleClickLogin = () => {
  setUser({
    username: username,
    isLogin: true,
  });
  navigateTo("/");
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.header {
  margin-bottom: 20px;
}

.register {
  display: flex;
  justify-content: center;
}

.link {
  width: 100px;
  text-decoration: none;
  margin-top: 20px;
}
</style>
