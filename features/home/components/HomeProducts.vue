<template>
  <v-container class="bg-surface-variant mb-6">
    <v-row align="start" no-gutters>
      <v-col
        v-for="product in listProducts"
        lg="3"
        md="4"
        sm="6"
        xs="12"
        :key="product.ID"
      >
        <div class="mx-4">
          <v-card class="card" style="margin-bottom: 20px">
            <div v-if="product.Discount_percent !== 0" class="card-discount">
              {{ product.Discount_percent }}%
            </div>
            <div
              v-if="product.Discount_percent !== 0"
              class="card-discount-border"
            ></div>
            <v-card-item>
              <div>
                <v-img
                  :src="product.Product_IMG"
                  :lazy-src="product.Product_IMG"
                  cover
                  class="text-white"
                >
                </v-img>
                <div class="card-title">
                  {{ product.Product_name }}
                </div>
                <div class="card-sku">
                  {{ product.Sku }}
                </div>
                <div class="card-price-old">
                  Giá gốc: {{ formatNumber(product.Price) }} đ
                </div>
                <div class="card-price-discount">
                  Giá:
                  {{
                    formatNumber(
                      product.Price -
                        (product.Price * product.Discount_percent) / 100
                    )
                  }}
                  đ
                </div>
              </div>
            </v-card-item>

            <div class="card-bottom">
              <v-btn color="error" @click="handelShowDetailProduct(product.ID)">
                Chi tiết
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-pagination
      size="small"
      v-model="page"
      :length="lengthPage"
      :total-visible="6"
      @update:model-value="handleClickUpdate"
    ></v-pagination>
  </v-container>
  <HomeProductDetail
    :isShowDetail="isShowDetail"
    :id-product="currIdProduct"
    @setShowDetail="handleCloseShowDetail"
  />
</template>

<script setup>
import HomeProductDetail from "./HomeProductDetail.vue";
import { useProductStore } from "../store/productStore";

const isShowDetail = ref(false);
const currIdProduct = ref(0);

const productStore = useProductStore();
const page = ref(productStore.currPage);

productStore.getProducts();
const listProducts = ref(productStore.products);
const lengthPage = ref(60);

watch(page, async (currPage) => {
  productStore.setCurrPage(currPage);
  const data = await productStore.getProducts();
});

watch(
  () => productStore.products,
  async () => {
    const data = await productStore.getProducts();
    listProducts.value = data.products;
    lengthPage.value = data.pages;
    page.value = productStore.currPage;
  }
);

const handleClickUpdate = async () => {
  window.scrollTo({ top: 600, behavior: "smooth" });
};

const formatNumber = (value) => {
  const formattedNumber = value.toLocaleString("vi-VN");
  return formattedNumber;
};

const handelShowDetailProduct = (id) => {
  isShowDetail.value = true;
  currIdProduct.value = id;
};

const handleCloseShowDetail = () => {
  isShowDetail.value = false;
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  scroll-behavior: smooth;
}

.card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    scale: 1.05;
  }

  .card-discount {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 44px;
    color: #f10000;
    font-size: 1.1rem;
    text-align: center;
    background-color: yellow;
    padding: 8px 4px;
    z-index: 10;
  }

  .card-discount-border {
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 10;
    border-left: 25px solid yellow;
    border-right: 25px solid yellow;
    border-bottom: 10px solid transparent;
  }
}

.card-title {
  text-align: left;
  font-size: 0.9rem;
  font-weight: bold;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-sku {
  text-align: left;
  font-size: 0.9rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-price-old {
  padding: 4px;
  font-size: 0.8rem;
  text-decoration: line-through;
}

.card-price-discount {
  padding: 4px;
  color: #f10000;
  font-size: 1rem;
}

.card-bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px 20px;
}
</style>
