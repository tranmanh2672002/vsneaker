<template>
    <div class="management-form">
        <div class="title">
            <h2>
                Product
            </h2>
        </div>
        <div class="mt-4 add-product-group">
            <button v-ripple class="add-btn" @click="showProductModal('Product')">
                <v-icon icon="mdi-plus-circle" class="mr-1"></v-icon>
                Add Product
            </button>
            <button v-ripple class="ml-4 add-btn" @click="showProductModal('Discount')">
                <v-icon icon="mdi-plus-circle" class="mr-1"></v-icon>
                Apply Discount
            </button>
            <button v-ripple class="ml-4 add-btn" @click="showProductModal('Voucher')">
                <v-icon icon="mdi-plus-circle" class="mr-1"></v-icon>
                Add Voucher
            </button>
            <button v-ripple class="ml-4 add-btn" @click="showProductModal('DeleteDiscount')">
                <v-icon icon="mdi-delete-circle" class="mr-1"></v-icon>
                Delete Discount
            </button>
        </div>
        <v-dialog v-model="isModal" class="add-product-modal mx-auto">
            <ProductModal :modal-type="modalType" @is-status="updateStatus" />
        </v-dialog>
        <div class="table-wrapper mt-4 mr-4 mb-6">
            <ProductTable />
        </div>
    </div>
    <v-snackbar v-model="isSuccessStatus" color="success" :timeout="3000">
        Success!!!

        <template v-slot:actions>
            <v-btn variant="text" @click="isSuccessStatus = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
    <v-snackbar v-model="isFailureStatus" color="error" :timeout="3000">
        Failure!!!

        <template v-slot:actions>
            <v-btn variant="text" @click="isFailureStatus = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
import ProductTable from '~~/features/admin/components/ProductTable.vue';
import ProductModal from '~~/features/admin/components/ProductModal.vue';
useHead({
    meta: [{
        key: 'unique-page-key',
    }]
});
definePageMeta({
    layout: "admin",
    middleware: 'auth'
});

const isModal = ref(false);
const isSuccessStatus = ref(false);
const isFailureStatus = ref(false);
const modalType = ref(null);

function showProductModal (event) {
    isModal.value = !isModal.value;
    modalType.value = event;
}

function updateStatus (event) {
    isModal.value = false;
    if (event) {
        isSuccessStatus.value = event;
    } else {
        isFailureStatus.value = true;
    }
}
</script>

<style lang="scss">
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
</style>
