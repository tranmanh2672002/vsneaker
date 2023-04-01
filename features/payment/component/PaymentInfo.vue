<template>
  <div class="wrapper">
    <div class="header">Thông tin vận chuyển</div>
    <div class="content">
      <div class="item">
        <div class="item-title">Tên</div>
        <v-text-field
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
          variant="underlined"
          placeholder="Nhập địa chỉ giao hàng"
          class="item-input"
          clearable
          label=""
        ></v-text-field>
      </div>
      <div class="item">
        <div class="item-title">Ghi chú</div>
        <v-text-field
          variant="underlined"
          placeholder="Ghi chú"
          class="item-input"
          clearable
          label=""
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
