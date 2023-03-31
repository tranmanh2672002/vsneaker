import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        username: '',
        isLogin: false,
        id: ''
    });

    const userCart = ref();

    const setUser = (data) => {
        user.value.username = data.username;
        user.value.isLogin = data.isLogin;
        user.value.id = data.id;
    }

    const setUserCart = (data) => {
        userCart.value = data;
    }

    const getDataCart = async () => {
        const { data: dataCart } = await useAsyncData("cart", () =>
            $fetch(`http://localhost:8000/cart/${user.value.id}`)
        );
        userCart.value = dataCart.value;
    }



    return { user, userCart, setUser, setUserCart, getDataCart }
})