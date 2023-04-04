<template>
  <div class="wrapper">
    <PaymentHeader />
    <div class="content">
      <v-row>
        <v-col cols="6">
          <PaymentInfo />
        </v-col>
        <v-col cols="6">
          <PaymentProduct />
        </v-col>
      </v-row>
      <div @click="handleClickOrder" class="button">
        <v-btn color="black">Đặt hàng</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import PaymentHeader from "~~/features/payment/component/PaymentHeader.vue";
import PaymentInfo from "~~/features/payment/component/PaymentInfo.vue";
import PaymentProduct from "~~/features/payment/component/PaymentProduct.vue";
import { usePaymentStore } from "./paymentStore";
import { useUserStore } from "~~/store/userStore";
const paymentStore = usePaymentStore();
const userStore = useUserStore();
definePageMeta({
  layout: "payment",
});

const handleClickOrder = async () => {
  if (
    paymentStore.info.customerName == "" ||
    paymentStore.info.ShippingMethodId == 0 ||
    paymentStore.info.phone == "" ||
    paymentStore.info.shippingAddress == ""
  ) {
    return;
  }
  const data = {
    userId: userStore.user?.id,
    ...paymentStore.info,
    products: paymentStore.productOrder,
  };
  console.log(data);
  const res = await useAsyncData("payment", () =>
    $fetch("http://localhost:8000/order/submit-order", {
      method: "POST",
      body: data,
    })
  );
  console.log(res.data.value.order);
  if (res.data.value?.order) {
    alert("Order submitted successfully");
  } else {
    alert("Order failed");
  }
  paymentStore.setInfo(undefined);
  userStore.setUserCart(undefined);
  navigateTo("/");
};
</script>

<style lang="scss" scoped>
.wrapper {
}
.content {
  margin: 0 100px;
  padding: 30px 20px;
  background-color: #f6f6f6;
}

.button {
  display: flex;
  justify-content: center;
  margin: 40px;
}
</style>
