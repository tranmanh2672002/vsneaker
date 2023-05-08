<template>
  <v-dialog v-model="isShowPopup" persistent width="auto" no-click-animation>
    <template v-slot:activator="{ props }">
      <v-icon color="red" v-bind="props" size="small"> mdi-trash-can </v-icon>
    </template>
    <div class="delete-wrapper">
      <div class="delete-content">
        <h4 class="delete-content-title">Are you want delete product?</h4>
      </div>
      <div class="delete-groupBtn">
        <v-btn @click="handleClickDelete" class="delete-btn" color="primary">
          delete
        </v-btn>
        <v-btn
          class="delete-btn"
          color="error"
          @click="() => (isShowPopup = false)"
          >cancel</v-btn
        >
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();

const props = defineProps({
  id: {
    type: String,
  },
});

const isShowPopup = ref(false);

const handleClickDelete = async () => {
  const { data } = await useAsyncData("deleteItem", () =>
    $fetch(`http://localhost:8000/cart/delete/${props.id}`, {
      method: "DELETE",
    })
  );
  if (data.value?.delete) {
    userStore.getDataCart();
    toast.success("Delete successfully");
  }
  isShowPopup.value = false;
};
</script>

<style lang="scss" scoped>
.delete-wrapper {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  width: 640px;

  .delete-content-title {
    margin: 0 0 30px;
    color: #444;
  }

  .delete-groupBtn {
    display: flex;
    justify-content: center;
    .delete-btn {
      margin: 0 10px;
    }
  }
}
</style>
