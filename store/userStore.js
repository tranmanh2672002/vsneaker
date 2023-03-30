import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        username: '',
        isLogin: false,
        id: ''
    });

    const setUser = (data) => {
        user.value.username = data.username;
        user.value.isLogin = data.isLogin;
        user.value.id = data.id;
    }



    return { user, setUser }
})