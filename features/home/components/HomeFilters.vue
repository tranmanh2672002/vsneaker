<template>
  <div class="Filters-wrapper">
    <h3 class="title">Lọc sản phẩm</h3>
    <v-select
      class="select brands"
      clearable
      v-model="brands"
      chips
      label="Thương hiệu"
      :items="dataBrands"
      menu-icon="mdi-chevron-down "
      multiple
    ></v-select>

    <v-select
      class="select sizes"
      clearable
      v-model="sizes"
      chips
      label="Size"
      :items="dataSizes"
      menu-icon="mdi-chevron-down "
      multiple
    ></v-select>

    <v-select
      class="select"
      v-model="price"
      label="Giá"
      menu-icon="mdi-currency-usd "
      :items="dataPrices"
    ></v-select>

    <v-select
      class="select sale"
      v-model="sale"
      label="Giảm giá"
      :items="dataSale"
      menu-icon="mdi-sale-outline "
      multiple
    ></v-select>

    <v-btn prepend-icon="mdi-magnify " color="black" @click="handleClickSearch"
      >Tìm kiếm</v-btn
    >
  </div>
</template>

<script setup>
import { useProductStore } from "../store/productStore";
const productStore = useProductStore();

const brands = ref([]);
const price = ref();
const sizes = ref([]);
const sale = ref([]);

const dataPrices = [
  "Dưới 1.000.000đ",
  "Dưới 2.000.000đ",
  "Dưới 3.000.000đ",
  "Dưới 4.000.000đ",
  "Dưới 5.000.000đ",
  "Dưới 10.000.000đ",
];

const dataBrands = ["Vans", "Converse", "Palladium", "Supra", "K-Swiss"];

const dataSizes = [
  "4US",
  "4.5US",
  "5US",
  "5.5US",
  "6US",
  "6.5US",
  "7US",
  "7.5US",
  "8US",
  "8.5US",
  "9US",
  "9.5US",
  "10US",
];

const dataSale = ["Giảm giá"];

const handleClickSearch = async () => {
  let priceValue = null;
  if (price.value) {
    switch (price.value) {
      case "Dưới 1.000.000đ":
        priceValue = 1000000;
        break;
      case "Dưới 2.000.000đ":
        priceValue = 2000000;

        break;
      case "Dưới 3.000.000đ":
        priceValue = 3000000;

        break;
      case "Dưới 4.000.000đ":
        priceValue = 4000000;

        break;
      case "Dưới 5.000.000đ":
        priceValue = 5000000;

        break;
      case "Dưới 10.000.000đ":
        priceValue = 10000000;

        break;
    }
  }
  const dataFilters = {
    brands: brands.value,
    sizes: sizes.value,
    price: priceValue,
    sale: sale.value.length !== 0 ? true : false,
  };
  productStore.setFilter(dataFilters);
  productStore.setCurrPage(1);
  productStore.getProducts(1);
};
</script>

<style lang="scss" scoped>
.Filters-wrapper {
  width: 360px;
  margin: 20px 0;
  padding: 0 20px;
  border-right: 2px solid black;
  .title {
    margin-bottom: 10px;
    font-size: 1.4rem;
  }
}

.select {
  border-radius: 10px;
}
</style>
