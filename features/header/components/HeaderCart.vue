<template>
  <v-btn class="Header-user-btn" icon="">
    <v-badge @click="handleClickShowCart" dot color="success">
      <v-icon>mdi-cart-outline</v-icon>
    </v-badge>
    <div v-if="showCart" class="border-triangle"></div>
    <div v-if="showCart" class="cart-products">
      <div class="cart-noProduct" v-if="!userStore.userCart?.length">
        <v-img class="img" width="50%" :src="NoProduct" cover></v-img>
        <span class="text">Không có sản phẩm</span>
      </div>
      <div class="cart-wrapper" v-else>
        <h1 class="cart-title">Sản phẩm của bạn</h1>
        <div class="cart-lists">
          <div class="cart-item" v-for="product in products" :key="product.ID">
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
              <h4 class="cart-content-title">
                {{ product?.Product_name }}
              </h4>
              <div class="cart-content-bottom">
                <div style="display: flex; align-items: center">
                  <div class="cart-content-price">
                    Giá:
                    {{ formatNumber(product?.Amount) }}
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
        <div class="cart-addToCart">
          <v-btn @click="navigateTo('/payment')" color="error" size="small"
            >Thanh toán</v-btn
          >
        </div>
      </div>
    </div>
  </v-btn>
</template>

<script setup>
import NoProduct from "../../../assets/images/noProduct.png";
import { useUserStore } from "~~/store/userStore";
import ConfirmDelete from "./ConfirmDelete.vue";

const userStore = useUserStore();
const showCart = ref(false);
// const products = ref([]);

if (userStore.user?.id) {
  userStore.getDataCart();
}

// products.value = userStore.userCart;
const products = computed(() => {
  return userStore.userCart;
});

const handleClickShowCart = () => {
  console.log(userStore.userCart);
  if (!userStore.user?.isLogin) {
    navigateTo("/login");
  }
  showCart.value = !showCart.value;
};

const formatNumber = (value) => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
</script>

<style lang="scss" scoped>
.Header-user-btn {
  position: relative;
  background-color: black;
  color: white;
  margin-left: 14px;
  .cart-products {
    position: absolute;
    top: calc(100% + 16px);
    right: 0;
    width: 360px;
    background-color: white;
    border-radius: 4px;
    z-index: 100;
    overflow: hidden;
    text-transform: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .cart-noProduct {
      widows: 100%;
      .img {
        margin: auto;
      }
      .text {
        display: block;
        color: red;
        font-size: 1rem;
        text-transform: none;
        margin-bottom: 20px;
      }
    }

    .cart-wrapper {
      color: black;
      .cart-title {
        font-size: 1.2rem;
        font-weight: 400;
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ccc;
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
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
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
  .border-triangle {
    position: absolute;
    top: calc(100% + 6px);
    right: 14px;
    z-index: 10;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
}
</style>
