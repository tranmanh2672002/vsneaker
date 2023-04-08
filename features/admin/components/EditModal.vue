<template>
    <v-form ref="form" @submit.prevent="editProduct" v-if="editType === 'product'">
        <v-card class="pa-2">
            <v-card-title headline class="font-weight-bold mt-2">Edit Product</v-card-title>
            <v-card-text>
                <v-select density="comfortable" v-model="categorySelected" clearable label="Category Product"
                    :items="categories" :rules="rules" class="mt-2"></v-select>
                <v-text-field density="comfortable" v-model="productName" clearable label="Product Name"
                    :rules="rules"></v-text-field>

                <v-text-field density="comfortable" v-model="skuCode" clearable label="SKU Code"
                    :rules="rules"></v-text-field>

                <v-text-field density="comfortable" v-model="productImg" clearable label="Product Image"
                    :rules="rules"></v-text-field>

                <v-text-field density="comfortable" type="number" v-model="productPrice" clearable label="Product Price"
                    :rules="rules"></v-text-field>

                <v-textarea density="comfortable" v-model="descriptionProduct" label="Description" clearable rows="3"
                    row-height="30" :rules="rules"></v-textarea>
                <v-btn color="black" type="submit" class="mb-3 d-flex align-center float-right"
                    prepend-icon="mdi-pencil-circle">
                    Edit
                </v-btn>
            </v-card-text>
        </v-card>
    </v-form>
    <v-form ref="form" @submit.prevent="editAccount" v-if="editType === 'account'">
        <v-card class="pa-2">
            <v-card-title headline class="font-weight-bold mt-2">Edit Account</v-card-title>
            <v-card-text>
                <v-text-field density="comfortable" v-model="userName" clearable label="User Name"
                    :rules="rules"></v-text-field>

                <v-text-field density="comfortable" v-model="password" clearable label="Password" :rules="rules"
                    type="password"></v-text-field>

                <v-btn color="black" type="submit" class="mb-3 d-flex align-center float-right"
                    prepend-icon="mdi-pencil-circle">
                    Edit
                </v-btn>
            </v-card-text>
        </v-card>
    </v-form>
</template>
<script setup>
import { useProducts } from '@/features/admin/store/productStore';

const { editType, productId, accountId } = defineProps(['editType', 'productId', 'accountId']);

const form = ref(null);

const categorySelected = ref(null);
const productName = ref(null);
const skuCode = ref(null);
const descriptionProduct = ref(null);
const productImg = ref(null);
const productPrice = ref(null);
const categories = ref([]);

const userName = ref(null);
const password = ref(null);
const emit = defineEmits(['isStatus'])

const rules = [
    value => !!value || 'Required.',
];

const { getCategory } = useProducts();

if (editType === 'product') {
    const data = await getCategory();
    data.forEach((category) => {
        categories.value.push(category.Category_name);
    })
}

async function validate () {
    const { valid } = await form._value.validate();
    return valid;
}

async function productDetail (productId) {
    const { data } = await useAsyncData("product-detail", () =>
        $fetch(`http://localhost:8000/product/${productId}`)
    );
    categorySelected.value = data._rawValue.detail.Category_name;
    productName.value = data._rawValue.detail.Product_name;
    skuCode.value = data._rawValue.detail.Sku;
    descriptionProduct.value = data._rawValue.detail.Description;
    productImg.value = data._rawValue.detail.Product_IMG;
    productPrice.value = data._rawValue.detail.Price;
}

async function accountDetail (accountId) {
    const { data } = await useAsyncData("account-detail", () =>
        $fetch(`http://localhost:8000/user/${accountId}/account`)
    );
    userName.value = data._rawValue.Username;
    password.value = data._rawValue.Password;
}

if (editType === 'product') {
    productDetail(productId);
}

if (editType === 'account') {
    accountDetail(accountId);
}

async function getCategoryId () {
    const data = await getCategory();
    const categoryId = data.find(category => category.Category_name == categorySelected.value)
    return categoryId.ID;
}

async function editProduct () {
    const valid = await validate();
    const categoryId = await getCategoryId();
    if (valid) {
        const product = {
            categoryId: categoryId,
            productName: productName.value,
            sku: skuCode.value,
            description: descriptionProduct.value,
            productImg: productImg.value,
            price: productPrice.value
        }
        try {
            const { data } = await useAsyncData('edit-product', () =>
                $fetch(`http://localhost:8000/product/edit/${productId}`,
                    {
                        method: 'PUT',
                        body: product,
                    }
                )
            )
            if (data._rawValue.update) {
                emit('isStatus', true)
            }
        } catch (error) {
            if (error) {
                emit('isStatus', false)
            }
        }
    }
}

async function editAccount () {
    const valid = await validate();
    if (valid) {
        const account = {
            username: userName.value,
            password: password.value,
        }
        try {
            const { data } = await useAsyncData('edit-account', () =>
                $fetch(`http://localhost:8000/user/${accountId}/edit`,
                    {
                        method: 'PUT',
                        body: account,
                    }
                )
            )
            if (data._rawValue.update) {
                emit('isStatus', true)
            }
        } catch (error) {
            if (error) {
                emit('isStatus', false)
            }
        }
    }
}
</script>
<style lang="scss"></style>