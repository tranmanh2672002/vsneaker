<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto" persistent>
      <div class="dialog-wrapper">
        <v-row>
          <v-col cols="6">
            <div class="dialog-img">
              <v-img
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                lazy-src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
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
            <div>
              <v-btn color="error" height="40px">Thêm giỏ hàng</v-btn>
            </div>
          </v-col>
          <v-col cols="6">
            <span class="dialog-title">Vans MN Skate Old School</span>

            <div class="dialog-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates error, saepe repellendus quidem accusantium odit
              placeat non recusandae neque impedit? neque impedit? neque
              impedit?neque impedit? neque impedit? neque impedit? neque
              impedit? neque impedit?
            </div>
          </v-col>
        </v-row>
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
const props = defineProps({
  idProduct: {
    type: Number,
  },
  isShowDetail: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["setShowDetail"]);

const dialog = ref(props.isShowDetail);

watchEffect(() => {
  dialog.value = props.isShowDetail;
});

const numberOrder = ref(0);
const numberStorage = ref(10);

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
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  width: 800px;
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
    font-size: 1.4rem;
    font-weight: 600;
  }
  .dialog-description {
    font-size: 1.2rem;
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
}
</style>
