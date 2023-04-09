<template>
  <div class="management-display-wrapper">
    <div v-if="clickedElement === 'Home'" class="manager-home">
      <MainSlider />
      <HomeBanner />
    </div>
    <div v-else class="management-form">
      <div class="title">
        <h2>
          {{ clickedElement }}
        </h2>
      </div>
      <div class="mt-4 add-product-group">
        <button
          v-ripple
          class="add-btn"
          @click="showOperationModal(clickedElement)"
        >
          <v-icon icon="mdi-plus-circle" class="mr-1"></v-icon>
          Add {{ clickedElement }}
        </button>
        <button
          v-if="clickedElement === 'Product'"
          v-ripple
          class="ml-4 add-btn"
          @click="showOperationModal('Discount')"
        >
          <v-icon icon="mdi-plus-circle" class="mr-1"></v-icon>
          Apply Discount
        </button>
        <button
          v-if="clickedElement === 'Product'"
          v-ripple
          class="ml-4 add-btn"
          @click="showOperationModal('Voucher')"
        >
          <v-icon icon="mdi-plus-circle" class="mr-1"></v-icon>
          Add Voucher
        </button>
        <button
          v-if="clickedElement === 'Product'"
          v-ripple
          class="ml-4 add-btn"
          @click="showOperationModal('DeleteDiscount')"
        >
          <v-icon icon="mdi-delete-circle" class="mr-1"></v-icon>
          Delete Discount
        </button>
      </div>
      <v-dialog v-model="isModal" class="add-product-modal mx-auto">
        <operation-modal :modal-type="modalType" @is-status="updateStatus" />
      </v-dialog>
      <div class="table-wrapper mt-4">
        <table-management :clicked-element="clickedElement" />
      </div>
    </div>
    <v-snackbar v-model="isSuccessStatus" color="success" :timeout="3000">
      Success!!!

      <template v-slot:actions>
        <v-btn variant="text" @click="isSuccessStatus = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="isFailureStatus" color="error" :timeout="3000">
      Failure!!!

      <template v-slot:actions>
        <v-btn variant="text" @click="isFailureStatus = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import MainSlider from "~~/features/home/components/MainSlider.vue";
import HomeBanner from "~~/features/home/components/HomeBanner.vue";
import OperationModal from "./OperationModal.vue";
import TableManagement from "./TableManagement.vue";

const { clickedElement } = defineProps(["clickedElement"]);
const isModal = ref(false);
const modalType = ref(null);
const isSuccessStatus = ref(false);
const isFailureStatus = ref(false);

function showOperationModal(event) {
  isModal.value = !isModal.value;
  modalType.value = event;
}

function updateStatus(event) {
  isModal.value = false;
  if (event) {
    isSuccessStatus.value = event;
  } else {
    isFailureStatus.value = true;
  }
}
</script>

<style lang="scss">
.management-display-wrapper {
  padding: 20px;
}

.add-product-group {
  display: flex;

  .add-btn {
    padding: 8px 16px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    font-weight: 550;
  }
}

.add-product-modal {
  width: 600px;
  min-height: 500px;
}

.table-wrapper {
  border: 1px solid #c3c3c3;
  border-radius: 8px;
}
</style>
