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
      <div class="button"><v-btn color="black">Đặt hàng</v-btn></div>
    </div>
  </div>
</template>

<script setup>
import PaymentHeader from "~~/features/payment/component/PaymentHeader.vue";
import PaymentInfo from "~~/features/payment/component/PaymentInfo.vue";
import PaymentProduct from "~~/features/payment/component/PaymentProduct.vue";

definePageMeta({
  layout: "payment",
});
</script>

<style lang="scss" scoped>
.wrapper {
}
.content {
  margin: 0 100px;
  padding: 10px 20px;
  background-color: #f6f6f6;
}

.button {
  display: flex;
  justify-content: center;
  margin: 40px;
}
</style>
