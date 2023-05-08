import { defineStore } from 'pinia'
import { useUserStore } from '~~/store/userStore';
const userStore = useUserStore();

export const usePaymentStore = defineStore('payment', () => {
    const info = ref(
        {
            customerName: '',
            phone: '',
            shippingAddress: '',
            shippingMethodId: '',
        }
    );

    const productOrder = ref(userStore.userCart);

    const setInfo = (value) => {
        info.value = value;
    }

    return { info, productOrder, setInfo };
})