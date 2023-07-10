<template>
    <div class="management-form">
        <div class="title">
            <h2>
                Account
            </h2>
        </div>
        <div class="mt-4">
            <button v-ripple class="add-btn" @click="showAccountModal()">
                <v-icon icon="mdi-plus-circle"></v-icon>
                Add Account
            </button>
            <div class="table-wrapper mt-4 mr-4 mb-6">
                <AccountTable />
            </div>
        </div>
    </div>
    <v-dialog v-model="isModal" class="add-product-modal mx-auto">
        <AccountModal @is-status="updateStatus" />
    </v-dialog>
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
import AccountModal from '~~/features/admin/components/AccountModal.vue';
import AccountTable from '~~/features/admin/components/AccountTable.vue';

definePageMeta({
    layout: "admin",
    middleware: 'auth'
});

const isModal = ref(false);
const isSuccessStatus = ref(false);
const isFailureStatus = ref(false);

function showAccountModal () {
    isModal.value = !isModal.value;
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
.add-btn {
    padding: 8px 16px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    font-weight: 550;
}

.table-wrapper {
    border: 1px solid #c3c3c3;
    border-radius: 8px;
}
</style>