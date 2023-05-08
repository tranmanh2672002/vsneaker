<template>
  <div class="wrapper">
    <div class="cart-wrapper">
      <div class="cart-header">
        <h1 class="cart-title">Đơn hàng của bạn</h1>
        <div class="back">
          <v-btn
            @click="navigateTo('/')"
            color="black"
            icon="mdi-chevron-left "
          ></v-btn>
        </div>
      </div>
      <div class="cart-lists">
        <div class="cart-item" v-for="product in products" :key="item">
          <div class="cart-item-left">
            <div class="cart-thumbnail">
              <v-img
                class="img"
                width="60px"
                :src="product?.Product_IMG"
                :lazy-src="product?.Product_IMG"
                cover
              ></v-img>
            </div>
            <div class="cart-content">
              <h4 class="cart-content-title">{{ product?.Product_name }}</h4>
              <div class="cart-content-bottom">
                <div style="display: flex; align-items: center">
                  <div class="cart-content-price">
                    Giá:
                    <span>{{ product?.Price }}</span>
                  </div>
                  <div class="cart-content-amount">
                    SL: <span>{{ product?.Quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <v-icon color="success" icon="mdi-check"></v-icon>
            <span class="cart-status">Đặt hàng thành công</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();
definePageMeta({
  layout: "payment",
});

const data = await useAsyncData("order", () =>
  $fetch(`http://localhost:8000/order/${userStore.user?.id}`)
);
const products = ref([]);
if (data.data?.value) {
  data.data?.value.map((item) => {
    products.value = [...products.value, ...item.detail];
  });
}
</script>

<style lang="scss" scoped>
.wrapper {
  color: #444;
  background-color: #f6f6f6;
  height: 100vh;
  .cart-wrapper {
    .cart-header {
      display: flex;
      justify-content: center;
      padding: 40px 0;
      position: relative;
    }
    .back {
      position: absolute;
      left: 10%;
    }
    .cart-title {
      font-size: 1.8rem;
      font-weight: 400;
      padding: 0 0 10px;
      text-align: left;
    }
    .cart-lists {
      margin: 10px auto;
      width: 80%;
      max-height: 70vh;
      overflow-y: scroll;
    }
    .cart-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
      border-bottom: 1px solid #ccc;
      .cart-item-left {
        display: flex;
        align-items: center;
      }
      .cart-status {
        margin: 0 10px;
        font-size: 1.125rem;
      }
      .cart-thumbnail {
        padding: 4px;
      }
      .cart-content {
        flex: 1;
        .cart-content-title {
          font-size: 0.95rem;
          font-weight: 400;
          text-align: left;
          line-height: 1.8rem;
        }
        .cart-content-bottom {
          height: 1.8rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          align-items: center;
          .cart-content-price {
          }
          .cart-content-amount {
            margin-left: 10px;
          }
          .cart-content-delete {
            color: #e91717;
            margin: 0 20px;
            cursor: pointer;
            &:hover {
              opacity: 0.8;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .cart-addToCart {
      border-top: 1px solid #ccc;
      padding: 10px 0;
    }
  }
}
</style>
