import { useUserStore } from "~~/store/userStore";

const userStore = useUserStore();
const { user } = userStore;

export default defineNuxtRouteMiddleware((to, from) => {
  if ((user?.isLogin === false) || user?.role !== "admin") {
    return navigateTo('/login');
  }
});