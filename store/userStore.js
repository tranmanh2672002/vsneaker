import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        username: '',
        isLogin: false,
    });

    const setUser = (data) => {
        user.value.username = data.username;
        user.value.isLogin = data.isLogin;
    }



    return { user, setUser }
})