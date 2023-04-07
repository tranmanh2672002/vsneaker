<template>
  <div class="wrapper">
    <div class="cart-wrapper">
      <div class="cart-header">
        <h1 class="cart-title">Sản phẩm của bạn</h1>
        <h1 class="cart-title">Tổng: {{ formatNumber(total) }}</h1>
      </div>
      <div class="cart-lists">
        <div class="cart-item" v-for="product in productList" :key="item">
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
                  <span>{{ formatNumber(product?.Amount) }}</span>
                </div>
                <div class="cart-content-amount">
                  SL: <span>{{ product?.Quantity }}</span>
                </div>
              </div>
              <div class="cart-content-delete">
                <ConfirmDelete :id="product?.cartItemId.toString()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfirmDelete from "~~/features/header/components/ConfirmDelete.vue";
import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore();
const productList = computed(() => {
  return userStore.userCart;
});
const total = computed(() => {
  let x = 0;
  userStore.userCart?.map((item) => {
    x = x + item.Amount;
  });
  return x;
});

const formatNumber = (value) => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
</script>

<style lang="scss" scoped>
.wrapper {
  color: #444;
  .cart-wrapper {
    .cart-header {
      display: flex;
      justify-content: space-between;
      padding: 0 4px;
    }
    .cart-title {
      font-size: 1.2rem;
      font-weight: 400;
      padding: 0 0 10px;
      text-align: left;
    }
    .cart-lists {
      // margin: 10px 0;
      max-height: 44vh;
      overflow-y: scroll;
    }
    .cart-item {
      display: flex;
      align-items: center;
      height: 68px;
      border-bottom: 1px solid #ccc;
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
