import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', () => {
    const products = ref([]);
    const pages = ref(0);

    const setProducts = (data) => {
        products.value = data
    }

    const setPages = (data) => {
        pages.value = data
    }

    const getProducts = async (page) => {
        const { data: productsData } = await useAsyncData("products", () =>
            $fetch(`http://localhost:8000/product/show?offset=${page - 1}`)
        );
        setProducts(productsData.value.products);
        setPages(productsData.value.count);
        return {
            products: productsData.value.products,
            pages: productsData.value.count,
        };
    }

    return { products, pages, setProducts, setPages, getProducts }
})