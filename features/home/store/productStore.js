import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', () => {
  const products = ref([]);
  const pages = ref(0);
  const filter = ref(
    {
      sizes: [],
      brands: [],
      sale: false,
      price: null,
    }
  );
  const currPage = ref(1);

  const setFilter = (data) => {
    filter.value = data;
  }

  const setCurrPage = (data) => {
    currPage.value = data;
  }

  const resetFilter = () => {
    filter.value = null;
  }

  const setProducts = (data) => {
    products.value = data
  }

  const setPages = (data) => {
    pages.value = data
  }

  const getProducts = async () => {
    const { data: productsData } = await useAsyncData("products", () =>
      $fetch(`http://localhost:8000/product/filter?offset=${currPage.value - 1}`, {
        method: "POST",
        body: filter.value,
      })
    );
    setProducts(productsData.value?.products);
    setPages(productsData.value?.countPage);
    return {
      products: productsData.value?.products,
      pages: productsData.value?.countPage,
    };
  }

  return { products, pages, filter, currPage, setCurrPage, setProducts, setPages, getProducts, setFilter, resetFilter }
})