<template>
    <VExpansionPanels variant="popout" class="pa-4">
        <VProgressLinear
            v-if="(clickedElement == 'Product' && !listProducts) || (clickedElement == 'Account' && !listAccounts)"
            indeterminate absolute bottom color="black">
        </VProgressLinear>
        <v-expansion-panel v-if="clickedElement == 'Product'" v-for="product in listProducts" :key="product.ID">
            <VExpansionPanelTitle @click="showProductDetail(product.ID)">
                <VRow align-center class="spacer d-flex align-center">
                    <VCol cols="1">
                        <VAvatar size="40px" class="product-img">
                            <VImg alt="Avatar" :src="product?.Product_IMG" class="d-flex align-center">
                            </VImg>
                        </VAvatar>
                    </VCol>
                    <VCol cols="3">
                        {{ product?.Sku }}
                    </VCol>
                    <VCol cols="4">
                        {{ product?.Product_name }}
                    </VCol>
                    <VCol cols="2">
                        Price: {{ product?.Price }}đ
                    </VCol>
                    <VCol cols="2">
                        Sale Off: {{ product?.Discount_percent }}%
                    </VCol>
                </VRow>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
                <div class="img-wrapper">
                    <div class="img-content">
                        <VImg :src="product?.Product_IMG" :lazy-src="product?.Product_IMG" cover>
                        </VImg>
                    </div>
                </div>
                <div class="product-name d-flex align-center justify-center font-weight-bold mt-3">
                    {{ product?.Product_name }}
                </div>
                <div class="mt-4">
                    {{ product?.Description }}
                </div>

                <VTable class="mt-3 size-table">
                    <tr>
                        <th>Size</th>
                        <td v-for="size in sizes" :key="size.Size">{{ size.Size }}</td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td v-for="size in sizes" :key="size.Size">{{ size.Quantity }}</td>
                    </tr>
                </VTable>

                <div class="mt-3 d-flex justify-end">
                    <VBtn color="success" @click="showEditModal('product', product?.ID)">Edit</VBtn>
                    <VBtn color="warning" class="ml-4" @click="addSizes(product?.ID)">Add sizes</VBtn>
                </div>
            </VExpansionPanelText>
        </v-expansion-panel>

        <VExpansionPanel v-else v-for="account in listAccounts" :key="account?.ID">
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
    <VPagination v-if="clickedElement == 'Product'" v-model="productPage" :length="lengthProductPage" :total-visible="6"
        @update:model-value="handleClickUpdate"></VPagination>
    <VPagination v-else v-model="accountPage" :length="lengthAccountPage" :total-visible="6"
        @update:model-value="handleClickUpdate"></VPagination>
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
    <v-dialog v-model="isAddSizes" class="add-product-modal mx-auto">
        <v-card>
            <v-card-title>Add sizes</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="handleAddSizes">
                    <v-select density="comfortable" v-model="sizeSelected" clearable label="Size" :items="size"
                        :rules="rules" class="mt-2" :open-on-clear="true"></v-select>
                    <v-text-field density="comfortable" type="number" v-model="quantity" clearable label="Quantity"
                        :rules="rules"></v-text-field>
                    <v-btn type="submit" color="black" prepend-icon="mdi-send-circle" class="mt-4 float-right">
                        Submit
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="isEdit" class="add-product-modal mx-auto">
        <EditModal :edit-type="editType" :account-id="accountId" :product-id="productId" @is-status="updateStatus" />
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
import { useProducts } from "@/features/admin/store/productStore";
import { useUserStore } from "@/features/admin/store/userStore";

const form = ref(null);

const { clickedElement } = defineProps(['clickedElement']);
const isSuccessStatus = ref(false);
const isFailureStatus = ref(false);
const sizes = ref();
const isDelete = ref(false);
const isAddSizes = ref(false);
const productId = ref(null);
const accountId = ref(null);
const editType = ref(null);
const isEdit = ref(false);

const sizeSelected = ref(null);
const quantity = ref(null);
const size = ref(['3US', '3.5US', '4US', '4.5US', '5US', '5.5US', '6US', '6.5US', '7US', '7.5US', '8US', '8.5US', '9US', '9.5US', '10US', '10.5US', '11US', '11.5US', '12US', '12.5US', '13US']);

const productStore = useProducts();
const productPage = ref(productStore.currPage);

productStore.getProducts();
const listProducts = ref(null);
const lengthProductPage = ref(60);

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

watch(productPage, async (currPage) => {
    productStore.setCurrPage(currPage);
});

watch(() => userStore.accounts,
    async () => {
        const { accounts, pages } = await userStore.getAccounts();
        listAccounts.value = accounts;
        lengthAccountPage.value = pages;
        accountPage.value = userStore.currentPage;
    }
)

watch(
    () => productStore.products,
    async () => {
        const data = await productStore.getProducts();
        listProducts.value = data.products;
        lengthProductPage.value = data.pages;
        productPage.value = productStore.currPage;
    }
);

async function showProductDetail (event) {
    const { data } = await useAsyncData("product-detail", () =>
        $fetch(`http://localhost:8000/product/${event}`)
    );
    sizes.value = data.value.sizes;
    productId.value = event;
}



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

async function validate () {
    const { valid } = await form._value.validate();
    return valid;
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

function addSizes (event) {
    isAddSizes.value = !isAddSizes.value;
    sizeSelected.value = null;
    quantity.value = null;
    productId.value = event;
}

async function handleAddSizes () {
    const valid = await validate();
    if (valid) {
        const sizes = [{
            size: sizeSelected.value,
            quantity: quantity.value,
        }]
        try {
            const { data } = await useAsyncData('add-sizes', () =>
                $fetch(`http://localhost:8000/product/add-to-stock/${productId.value}`,
                    {
                        method: 'POST',
                        body: sizes,
                    }
                )
            )
            if (data._rawValue.addToStock) {
                isAddSizes.value = false;
                isSuccessStatus.value = true;
            }
            await showProductDetail(productId.value);

        } catch (error) {
            if (error) {
                isAddSizes.value = false;
                isFailureStatus.value = true;
            }
        }
    }
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

<style lang="scss">
.product-img {
    border: 1px solid black;
}

.img-wrapper {
    display: flex;
    justify-content: center;

    .img-content {
        width: 200px;
        border: 1px solid #c3c3c3;
        border-radius: 8px;
        overflow: hidden;
    }
}

.size-table {
    border: 1px solid #c3c3c3;
    padding: 6px;
    border-radius: 8px;
}

.account-table {
    width: 100%;
}
</style>