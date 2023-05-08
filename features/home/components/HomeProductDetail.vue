<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto" persistent>
      <div class="dialog-wrapper">
        <v-row>
          <v-col cols="6">
            <div class="dialog-img">
              <v-img
                :src="productDetail?.Product_IMG"
                :lazy-src="productDetail?.Product_IMG"
                cover
              ></v-img>
            </div>
            <div class="dialog-bottom">
              <div class="dialog-groupBtn">
                <v-btn
                  @click="clickMinus"
                  class="dialog-btn"
                  rounded="0"
                  size="small"
                  icon="mdi-minus "
                ></v-btn>
                <span class="order-number">{{ numberOrder }}</span>
                <v-btn
                  @click="clickAdd"
                  class="dialog-btn"
                  rounded="0"
                  size="small"
                  icon="mdi-plus "
                ></v-btn>
              </div>
              <div class="dialog-amount">SL: {{ numberStorage }}</div>
            </div>
          </v-col>
          <v-col cols="6">
            <span class="dialog-title">{{ productDetail?.Product_name }}</span>
            <span class="dialog-sku">{{ productDetail?.Sku }}</span>

            <div class="dialog-description">
              {{ productDetail?.Description }}
            </div>
            <div class="size">
              <v-btn-toggle v-model="size" mandatory>
                <v-btn
                  @click="setSizeStorage"
                  class="btn"
                  v-for="size in sizes"
                >
                  {{ size?.Size }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <div class="price">
              Giá:
              {{
                productDetail?.Price -
                (productDetail?.Price * productDetail?.Discount_percent) / 100
              }}
              đ
            </div>
          </v-col>
        </v-row>
        <div style="display: flex; justify-content: center">
          <v-btn @click="handleClickAddToCart" color="error" height="40px"
            >Thêm giỏ hàng</v-btn
          >
        </div>
        <div
          class="btn-close"
          @click="handleCloseDialog"
          color="error"
          height="40px"
        >
          <v-icon icon="mdi-close "></v-icon>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useUserStore } from "~~/store/userStore";

const userStore = useUserStore();

const props = defineProps({
  idProduct: {
    type: Number,
  },
  isShowDetail: {
    type: Boolean,
    default: true,
  },
});

const size = ref();

const emit = defineEmits(["setShowDetail"]);

const dialog = ref(props.isShowDetail);

const productDetail = ref();
const sizes = ref();
const numberOrder = ref(0);
const numberStorage = ref(0);

onUpdated(() => {
  numberStorage.value = 0;
  numberOrder.value = 0;
});

watchEffect(async () => {
  dialog.value = props.isShowDetail;
  const { data } = await useAsyncData("product-detail", () =>
    $fetch(`http://localhost:8000/product/${props.idProduct}`)
  );

  productDetail.value = data.value?.detail;
  sizes.value = data.value?.sizes;
});

const handleCloseDialog = () => {
  dialog.value = false;
  emit("setShowDetail");
};

const clickAdd = () => {
  if (numberStorage.value > numberOrder.value) {
    numberOrder.value = numberOrder.value + 1;
  }
};

const clickMinus = () => {
  if (numberOrder.value > 0) {
    numberOrder.value = numberOrder.value - 1;
  }
};

const setSizeStorage = () => {
  numberStorage.value = sizes.value[size.value].Quantity;
};

const handleClickAddToCart = async () => {
  if (!userStore.user?.isLogin) {
    navigateTo("/login");
    toast.warning("Login please!");
    return;
  }
  if (numberOrder.value > 0) {
    const newProduct = {
      productId: props.idProduct,
      size: sizes.value[size.value]?.Size,
      quantity: numberOrder.value,
    };
    // console.log(newProduct);
    const data = await useAsyncData("addToCart", () =>
      $fetch(`http://localhost:8000/cart/${userStore.user.id}/add-to-cart`, {
        method: "POST",
        body: newProduct,
      })
    );
    if (data.data.value?.add) {
      toast.success("Add to cart");
      userStore.getDataCart();
      dialog.value = false;
      emit("setShowDetail");
    }
  } else {
    toast.warning("Please select number order");
  }
  numberOrder.value = 0;
};
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  width: 640px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #606060;
    cursor: pointer;
    &:hover {
      color: #888888;
    }
  }
  .dialog-img {
  }

  .dialog-title {
    display: block;
    margin-bottom: 4px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .dialog-sku {
    display: block;
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .dialog-description {
    font-size: 1rem;
    color: rgb(71, 71, 71);
    line-height: 24px;
    height: 120px;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
  }

  .dialog-bottom {
    margin: 20px 0;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .dialog-groupBtn {
    display: flex;
    align-items: center;
  }

  .price {
    color: rgb(201, 12, 12);
    padding: 10px 0;
  }

  .dialog-btn {
    // margin: 0 4px;
  }

  .dialog-amount {
    margin-left: 20px;
  }

  .order-number {
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  }

  .size {
    :deep(.v-btn-group) {
      flex-wrap: wrap;
      height: 100px;
      .v-btn {
        max-height: 50px;
      }
    }
    margin-top: 20px;
    .btn {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
