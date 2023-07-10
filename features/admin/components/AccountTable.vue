<template>
    <VExpansionPanels variant="popout" class="pa-4">
        <VProgressLinear v-if="!listAccounts" indeterminate absolute bottom color="black">
        </VProgressLinear>
        <VExpansionPanel v-for="account in listAccounts" :key="account?.ID">
            <VExpansionPanelTitle @click="showPurchaseHistory(account?.ID)">
                <VRow align-center class="spacer d-flex align-center">
                    <v-col cols="3">
                        User name: {{ account?.Username }}
                    </v-col>
                    <v-col cols="3">
                        Name: {{ account?.First_name }} {{ account?.Last_name }}
                    </v-col>
                    <v-col cols="3">
                        Phone number: {{ account?.Phone }}
                    </v-col>
                    <v-col cols="3">
                        Address: {{ account?.Address }}
                    </v-col>
                </VRow>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
                <div v-if="(!listPurchaseHistory) || (listPurchaseHistory.length < 1)">
                    Chưa có đơn hàng
                </div>
                <v-expansion-panels v-else>
                    <v-expansion-panel v-for="item in listPurchaseHistory" :key="item?.ID">
                        <v-expansion-panel-title @click="showDetailOrder(item.ID)" class="d-flex align-center">
                            <v-row>
                                <v-col cols="2">
                                    Name: {{ item?.Customer_name }}
                                </v-col>
                                <v-col cols="3">
                                    Phone: {{ item?.Phone }}
                                </v-col>
                                <v-col cols="3">
                                    Address: {{ item?.Shipping_address }}
                                </v-col>
                                <v-col cols="2">
                                    Date: {{ convertDate(item?.Order_date) }}
                                </v-col>
                                <v-col cols="2">
                                    Total: {{ item?.Total }}
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row v-for="item in orderDetail" :key="item?.Sku" class="d-flex align-center">
                                <v-col cols="1">
                                    <VAvatar size="40px" class="product-img">
                                        <VImg alt="Avatar" :src="item?.Product_IMG" class="d-flex align-center">
                                        </VImg>
                                    </VAvatar>
                                </v-col>
                                <v-col cols="2">
                                    {{ item?.Sku }}
                                </v-col>
                                <v-col cols="4">
                                    {{ item?.Product_name }}
                                </v-col>
                                <v-col cols="1">
                                    {{ item?.Size }}
                                </v-col>
                                <v-col cols="2">
                                    Price: {{ item?.Price }}đ
                                </v-col>
                                <v-col cols="2">
                                    Quantity: {{ item?.Quantity }}
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <div class="mt-3 d-flex justify-end">
                    <VBtn color="success" @click="showEditModal('account', account?.ID)">Edit</VBtn>
                    <VBtn color="error" class="ml-4" @click="showDeleteModal(account?.ID)">Delete</VBtn>
                </div>
            </VExpansionPanelText>
        </VExpansionPanel>
    </VExpansionPanels>
    <VPagination v-model="accountPage" :length="lengthAccountPage" :total-visible="6"
        @update:model-value="handleClickUpdate"></VPagination>
    <v-dialog v-model="isEdit" class="add-product-modal mx-auto">
        <EditModal :edit-type="editType" :account-id="accountId" :product-id="productId" @is-status="updateStatus" />
    </v-dialog>
    <v-dialog v-model="isDelete" class="add-product-modal mx-auto">
        <v-card>
            <v-card-title>Delete Account</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="deleteAccount">
                    <div>
                        Are you sure you want to delete this Account?
                    </div>
                    <v-btn type="submit" color="black" prepend-icon="mdi-delete-circle" class="mt-4 float-right">
                        Delete
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
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
import EditModal from "./EditModal.vue";
import { useUserStore } from "@/features/admin/store/userStore";

const form = ref(null);

const isSuccessStatus = ref(false);
const isFailureStatus = ref(false);
const isDelete = ref(false);
const editType = ref(null);
const isEdit = ref(false);
const accountId = ref(null);

const listPurchaseHistory = ref(null);
const listAccounts = ref(null);
const orderDetail = ref(null);
const lengthAccountPage = ref(1);
const userStore = useUserStore();
const accountPage = ref(userStore.currentPage);
userStore.getAccounts();

watch(accountPage, async (currentPage) => {
    userStore.setCurrentPage(currentPage);
})

watch(() => userStore.accounts,
    async () => {
        const { accounts, pages } = await userStore.getAccounts();
        listAccounts.value = accounts;
        lengthAccountPage.value = pages;
        accountPage.value = userStore.currentPage;
    }
)

async function showPurchaseHistory (accountId) {
    const { data } = await useAsyncData("purchase-history", () =>
        $fetch(`http://localhost:8000/order/${accountId}/all`)
    )
    listPurchaseHistory.value = data._rawValue;
}

async function showDetailOrder (orderId) {
    const { data } = await useAsyncData("order-detail", () =>
        $fetch(`http://localhost:8000/order/orderdetail/${orderId}`)
    )
    orderDetail.value = data._rawValue;
}

function handleClickUpdate () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

function convertDate (date) {
    let convertDate = new Date(date);
    return `${convertDate.getDate()}-${convertDate.getMonth()}-${convertDate.getFullYear()}`
}

function showDeleteModal (event) {
    isDelete.value = !isDelete.value;
    accountId.value = event;
}

async function deleteAccount () {
    try {
        const { data } = await useAsyncData('delete-account', () =>
            $fetch(`http://localhost:8000/user/${accountId.value}/delete`,
                {
                    method: 'DELETE',
                    body: []
                }
            )
        )
        if (data._rawValue.delete) {
            isDelete.value = false;
            isSuccessStatus.value = true;
        }
    } catch (error) {
        if (error) {
            isDelete.value = false;
            isFailureStatus.value = true;
        }
    }
}

function showEditModal (title, event) {
    editType.value = title;
    isEdit.value = !isEdit.value;

    if (title === 'product') {
        productId.value = event;
    }
    if (title === 'account') {
        accountId.value = event;
    }
}

function updateStatus (event) {
    isEdit.value = false;
    if (event) {
        isSuccessStatus.value = true
    } else {
        isFailureStatus.value = true
    }
}
</script>

<style lang="scss" scoped>
.product-img {
    border: 1px solid black;
}
</style>