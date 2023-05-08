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
      <div class="loading" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
import { toast } from "vue3-toastify";
definePageMeta({
  layout: "auth",
});

const userStore = useUserStore();
const { setUser } = userStore;

const username = ref("");
const password = ref("");
const loading = ref(false);

const handleClickLogin = async () => {
  loading.value = true;
  if (username.value == "" || password.value == "") {
    loading.value = false;
    return;
  }
  const user = {
    username: username.value,
    password: password.value,
  };
  const data = await useAsyncData("login", () =>
    $fetch("http://localhost:8000/user/login", {
      method: "POST",
      body: user,
    })
  );
  if (data.data.value.login) {
    const user = data.data.value.profile;
    setUser({
      username: user[0].Username,
      isLogin: true,
      id: user[0].ID,
      role: user[0].User_type,
    });
    console.log(user);
    if (user[0].User_type === "admin") {
      navigateTo("/admin");
      toast.success("Login successfully");
    } else {
      navigateTo("/");
      toast.success("Login successfully");
    }
  } else {
    toast.error("Login failed");
  }
  loading.value = false;
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

.loading {
  display: flex;
  justify-content: center;
}
</style>
