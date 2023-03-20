<template>
  <v-btn
    v-if="!user?.isLogin"
    @click="handleClickLogin"
    class="Header-user-btn"
    icon="mdi-account"
  ></v-btn>
  <span v-else class="username"
    >{{ user?.username }}
    <v-btn @click="showLogOut" class="Header-user-btn" icon="mdi-account">
    </v-btn>
    <div v-if="isShowLogOut" class="logout">
      <div @click="handleLogout" class="content">Log out</div>
    </div>
    <div v-if="isShowLogOut" class="border-triangle"></div>
  </span>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";

const userStore = useUserStore();
const { user, setUser } = userStore;

const isShowLogOut = ref(false);

const showLogOut = () => {
  isShowLogOut.value = !isShowLogOut.value;
};

const handleLogout = () => {
  setUser({
    username: "",
    isLogin: false,
  });
};

const handleClickLogin = () => {
  navigateTo("/login");
};
</script>

<style lang="scss" scoped>
.username {
  color: white;
  font-size: 1.2rem;
  position: relative;
  .logout {
    position: absolute;
    top: calc(100% + 16px);
    right: 0;
    width: 120px;
    background-color: white;
    color: black;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    .content {
      padding-left: 14px;
      &:hover {
        background-color: rgb(228, 228, 228);
      }
    }
  }
  .border-triangle {
    position: absolute;
    top: calc(100% + 6px);
    right: 14px;
    z-index: 10;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
}

.Header-user-btn {
  background-color: black;
  color: white;
  margin-left: 14px;
}
</style>
