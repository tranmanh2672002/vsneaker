import { defineStore } from "pinia";

export const useProducts = defineStore("CRUD_Product", () => {
  const discountNames = ref([]);
  const products = ref([]);
  const pages = ref(0);
  const currPage = ref(1);

  const setCurrPage = (data) => {
    currPage.value = data;
  };

  const setProducts = (data) => {
    products.value = data;
  };

  const setPages = (data) => {
    pages.value = data;
  };

  const getProducts = async () => {
    const { data: productsData } = await useAsyncData("products", () =>
      $fetch(`http://localhost:8000/product/show?offset=${currPage.value - 1}`)
    );
    setProducts(productsData._rawValue.products);
    setPages(productsData._rawValue.countPage);
    return {
      products: productsData._rawValue.products,
      pages: productsData._rawValue.countPage,
    };
  };

  const getAllProduct = async () => {
    const { data } = await useAsyncData("all-products", () =>
      $fetch("http://localhost:8000/product/all")
    );
    return data._rawValue;
  };

  const getAllDiscount = async () => {
    const { data } = await useAsyncData("all-discount", () =>
      $fetch("http://localhost:8000/discount/all")
    );
    return data._rawValue;
  };

  async function getCategory() {
    const { data } = await useAsyncData("category", () =>
      $fetch("http://localhost:8000/category/all")
    );
    return data._rawValue;
  }

  return {
    products,
    pages,
    currPage,
    setCurrPage,
    setProducts,
    setPages,
    getProducts,
    getCategory,
    getAllProduct,
    getAllDiscount,
  };
});
