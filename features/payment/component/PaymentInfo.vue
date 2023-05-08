<template>
  <div class="wrapper">
    <div class="header">Thông tin vận chuyển</div>
    <div class="content">
      <div class="item">
        <div class="item-title">Tên</div>
        <v-text-field
          v-model="name"
          variant="underlined"
          placeholder="Nhập tên của bạn"
          round="4"
          class="item-input"
          clearable
          label=""
        ></v-text-field>
      </div>
      <div class="item">
        <div class="item-title">SĐT</div>
        <v-text-field
          v-model="phone"
          variant="underlined"
          placeholder="Nhập SĐT của bạn"
          class="item-input"
          type="number"
          clearable
          label=""
        ></v-text-field>
      </div>
      <div class="item">
        <div class="item-title">Địa chỉ</div>
        <v-text-field
          v-model="address"
          variant="underlined"
          placeholder="Nhập địa chỉ giao hàng"
          class="item-input"
          clearable
          label=""
        ></v-text-field>
      </div>
      <div class="item">
        <div class="item-title">Vận chuyển</div>
        <v-select
          v-model="shipping"
          :items="[
            'Giao hàng tiết kiệm',
            'Giao hàng nhanh',
            'Giao hàng hỏa tốc',
          ]"
          variant="underlined"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePaymentStore } from "../../../pages/Payment/paymentStore";
const paymentStore = usePaymentStore();

const name = ref("");
const phone = ref("");
const address = ref("");
const shipping = ref("");

const onChangeInfo = () => {
  let ship = 0;
  switch (shipping.value) {
    case "Giao hàng tiết kiệm":
      ship = 1;
      break;
    case "Giao hàng nhanh":
      ship = 2;
      break;
    case "Giao hàng hỏa tốc":
      ship = 3;
      break;
    default:
      ship = 0;
      break;
  }
  paymentStore.setInfo({
    customerName: name.value,
    phone: phone.value,
    shippingAddress: address.value,
    shippingMethodId: ship,
  });
};

watch(name, () => {
  onChangeInfo();
});
watch(phone, () => {
  onChangeInfo();
});
watch(address, () => {
  onChangeInfo();
});
watch(shipping, () => {
  onChangeInfo();
});
</script>

<style lang="scss" scoped>
.wrapper {
  color: #444;
  .header {
    font-size: 1.2rem;
    margin: 0px 0 10px;
  }
  .content {
    .item {
      display: flex;
      align-items: center;
      margin-right: 30px;
      .item-title {
        font-size: 1rem;
        width: 100px;
      }
      .item-input {
      }
    }
  }
}
</style>
