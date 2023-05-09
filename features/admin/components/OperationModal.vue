<template>
  <v-form
    ref="form"
    @submit.prevent="addProduct"
    v-if="modalType === 'Product'"
  >
    <v-card class="pa-2">
      <v-card-title headline class="font-weight-bold mt-2"
        >Add Product</v-card-title
      >
      <v-card-text>
        <v-select
          density="comfortable"
          v-model="categorySelected"
          clearable
          label="Category Product"
          :items="categories"
          :rules="rules"
          class="mt-2"
        ></v-select>
        <v-text-field
          density="comfortable"
          v-model="productName"
          clearable
          label="Product Name"
          :rules="rules"
        ></v-text-field>

        <v-text-field
          density="comfortable"
          v-model="skuCode"
          clearable
          label="SKU Code"
          :rules="rules"
        ></v-text-field>

        <v-text-field
          density="comfortable"
          v-model="productImg"
          clearable
          label="Product Image"
          :rules="rules"
        ></v-text-field>

        <v-text-field
          density="comfortable"
          type="number"
          v-model="productPrice"
          clearable
          label="Product Price"
          :rules="rules"
        ></v-text-field>

        <v-textarea
          density="comfortable"
          v-model="descriptionProduct"
          label="Description"
          clearable
          rows="3"
          row-height="30"
          :rules="rules"
        ></v-textarea>
        <v-btn
          color="black"
          type="submit"
          class="mb-3 d-flex align-center float-right"
          prepend-icon="mdi-send-circle"
        >
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
  <v-form
    v-else-if="modalType === 'Account'"
    ref="form"
    @submit.prevent="addAccount"
  >
    <v-card class="pa-2">
      <v-card-title headline class="font-weight-bold mt-2"
        >Add Account</v-card-title
      >
      <v-card-text>
        <v-text-field
          density="comfortable"
          v-model="userName"
          clearable
          label="User Name"
          :rules="rules"
        ></v-text-field>

        <v-text-field
          density="comfortable"
          v-model="password"
          type="password"
          clearable
          label="Password"
          :rules="rules"
        ></v-text-field>
        <v-select
          density="comfortable"
          v-model="typeAccount"
          clearable
          label="Type Account"
          :items="['admin', 'customer']"
          :rules="rules"
          class="mt-2"
        ></v-select>

        <v-row>
          <v-col cols="6">
            <v-text-field
              density="comfortable"
              v-model="firstName"
              clearable
              label="First Name"
              :rules="rules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              density="comfortable"
              v-model="lastName"
              clearable
              label="Last Name"
              :rules="rules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          density="comfortable"
          type="number"
          v-model="phoneNumber"
          clearable
          label="Phone Number"
          :rules="phoneNUmberRules"
        ></v-text-field>

        <v-text-field
          density="comfortable"
          v-model="address"
          clearable
          label="Address"
          :rules="rules"
        ></v-text-field>

        <v-btn
          color="black"
          type="submit"
          class="mb-3 d-flex align-center float-right"
          prepend-icon="mdi-send-circle"
        >
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
  <v-form
    v-else-if="modalType === 'Discount'"
    ref="form"
    @submit.prevent="applyDiscount"
  >
    <v-card class="pa-2">
      <v-card-title headline class="font-weight-bold mt-2"
        >Apply Discount</v-card-title
      >
      <v-card-text>
        <v-text-field
          density="comfortable"
          v-model="discountName"
          clearable
          label="Discount Name"
          :rules="rules"
        ></v-text-field>
        <v-text-field
          density="comfortable"
          type="number"
          v-model="saleOff"
          clearable
          label="Sale-off"
          :rules="rules"
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
              density="comfortable"
              type="date"
              v-model="startAt"
              label="Start at"
              :rules="rules"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              density="comfortable"
              type="date"
              v-model="endAt"
              label="End at"
              :rules="rules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-textarea
          density="comfortable"
          v-model="descriptionDiscount"
          label="Description"
          clearable
          rows="3"
          row-height="30"
          :rules="rules"
        ></v-textarea>

        <v-btn
          color="black"
          type="submit"
          class="mb-3 d-flex align-center float-right"
          prepend-icon="mdi-send-circle"
        >
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
  <v-form
    v-else-if="modalType === 'Voucher'"
    ref="form"
    @submit.prevent="addVoucher"
  >
    <v-card class="pa-2">
      <v-card-title headline class="font-weight-bold mt-2"
        >Add Voucher</v-card-title
      >
      <v-card-text>
        <v-select
          density="comfortable"
          v-model="addedVoucher"
          clearable
          label="Add voucher"
          :items="listDiscount"
          :rules="rules"
          class="mt-2"
        ></v-select>
        <v-autocomplete
          v-model="productsDiscount"
          :items="listProducts"
          chips
          closable-chips
          color="blue-grey-lighten-2"
          item-title="Product_name"
          item-value="Product_name"
          label="Select"
          multiple
          class="selector-discount-product"
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.Product_IMG"
              :text="item.raw.Product_name"
            ></v-chip>
          </template>

          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="item?.raw?.Product_IMG"
              :title="item?.raw?.Product_name"
              :subtitle="item?.raw?.Sku"
            ></v-list-item>
          </template>
        </v-autocomplete>
        <v-btn
          color="black"
          type="submit"
          class="mb-3 d-flex align-center float-right"
          prepend-icon="mdi-send-circle"
        >
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
  <v-form v-else ref="form" @submit.prevent="deleteDiscount">
    <v-card class="pa-2">
      <v-card-title headline class="font-weight-bold mt-2"
        >Delete Discount</v-card-title
      >
      <v-card-text>
        <v-select
          density="comfortable"
          v-model="deletedDiscount"
          clearable
          label="Delete Discount"
          :items="listDiscount"
          :rules="rules"
          class="mt-2"
        ></v-select>
        <v-btn
          color="black"
          type="submit"
          class="mb-3 d-flex align-center float-right"
          prepend-icon="mdi-delete-circle"
        >
          Delete
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script setup>
import { useProducts } from "@/features/admin/store/productStore";
import { ref } from "vue";

const { modalType } = defineProps(["modalType"]);
const form = ref(null);
const emit = defineEmits(["isStatus"]);

const categorySelected = ref(null);
const productName = ref(null);
const skuCode = ref(null);
const descriptionProduct = ref(null);
const productImg = ref(null);
const productPrice = ref(null);
const categories = ref([]);

const userName = ref(null);
const password = ref(null);
const firstName = ref(null);
const lastName = ref(null);
const phoneNumber = ref(null);
const address = ref(null);
const typeAccount = ref(null);

const discountName = ref(null);
const saleOff = ref(null);
const startAt = ref(null);
const endAt = ref(null);
const descriptionDiscount = ref(null);

const addedVoucher = ref(null);
const productsDiscount = ref(null);

const listProductDiscount = ref([]);
const deletedDiscount = ref(null);
const listProducts = ref([]);
const listDiscount = ref([]);

const rules = [(value) => !!value || "Required."];

const phoneNUmberRules = [
  (value) => !!value || "Required.",
  (value) =>
    (value && value.length === 10) || "Phone number must have 10 digits.",
];
const { getCategory, getAllProduct, getAllDiscount } = useProducts();

function getProductDiscountId() {
  productsDiscount.value.forEach((currProduct) => {
    let productDiscount = listProducts.value.find(
      (product) => product.Product_name == currProduct
    );
    listProductDiscount.value.push(productDiscount.ID);
  });
}

if (modalType == "Voucher") {
  listProducts.value = await getAllProduct();
}

if (modalType === "Product") {
  const data = await getCategory();
  data.forEach((category) => {
    categories.value.push(category.Category_name);
  });
}

if (modalType === "DeleteDiscount" || modalType === "Voucher") {
  const data = await getAllDiscount();
  data.forEach((discount) => {
    listDiscount.value.push(
      `${discount.Discount_name}: ${discount.Description}`
    );
  });
}

async function validate() {
  const { valid } = await form._value.validate();
  return valid;
}

async function getCategoryId() {
  const data = await getCategory();
  const categoryId = data.find(
    (category) => category.Category_name == categorySelected.value
  );
  return categoryId.ID;
}

async function getDiscountId(event) {
  const data = await getAllDiscount();
  const discountId = data.find(
    (discount) => `${discount.Discount_name}: ${discount.Description}` == event
  );
  return discountId;
}

async function addProduct() {
  const valid = await validate();
  const categoryId = await getCategoryId();
  if (valid) {
    const product = {
      categoryId: categoryId,
      productName: productName.value,
      sku: skuCode.value,
      description: descriptionProduct.value,
      productImg: productImg.value,
      price: productPrice.value,
    };

    try {
      const { data } = await useAsyncData("add-product", () =>
        $fetch("http://localhost:8000/product/add", {
          method: "POST",
          body: product,
        })
      );
      if (data._rawValue.add) {
        emit("isStatus", true);
      }
    } catch (error) {
      if (error) {
        emit("isStatus", false);
      }
    }
  }
}

async function addAccount() {
  const valid = await validate();

  if (valid) {
    const user = {
      username: userName.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phoneNumber.value,
      address: address.value,
      role: typeAccount.value,
    };

    try {
      const { data } = await useAsyncData("add-account", () =>
        $fetch("http://localhost:8000/user/add", {
          method: "POST",
          body: user,
        })
      );
      if (data._rawValue.add) {
        emit("isStatus", true);
      }
    } catch (error) {
      if (error) {
        emit("isStatus", false);
      }
    }
  }
}
async function applyDiscount() {
  const valid = await validate();
  if (valid) {
    const discount = {
      discountName: discountName.value,
      description: descriptionDiscount.value,
      discountPercent: saleOff.value,
      startAt: startAt.value,
      endAt: endAt.value,
    };

    try {
      const { data } = await useAsyncData("apply-discount", () =>
        $fetch("http://localhost:8000/discount/add", {
          method: "POST",
          body: discount,
        })
      );
      if (data._rawValue.add) {
        emit("isStatus", true);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        emit("isStatus", false);
      }
    }
  }
}

async function addVoucher() {
  const valid = await validate();
  const discountId = await getDiscountId(addedVoucher.value);
  getProductDiscountId();

  if (valid) {
    const voucher = {
      discountId: discountId.ID,
      products: listProductDiscount.value,
    };
    try {
      const { data } = await useAsyncData("add-voucher", () =>
        $fetch("http://localhost:8000/discount/apply-code", {
          method: "POST",
          body: voucher,
        })
      );
      if (data._rawValue.apply) {
        emit("isStatus", true);
      }
    } catch (error) {
      if (error) {
        emit("isStatus", false);
      }
    }
  }
}

async function deleteDiscount() {
  const valid = await validate();
  const deleteDiscountId = await getDiscountId(deletedDiscount.value);
  if (valid) {
    try {
      const { data } = await useAsyncData("delete-product", () =>
        $fetch(`http://localhost:8000/discount/delete/${deleteDiscountId.ID}`, {
          method: "DELETE",
        })
      );
      if (data._rawValue.delete) {
        emit("isStatus", true);
      }
    } catch (error) {
      if (error) {
        emit("isStatus", false);
      }
    }
  }
}
</script>

<style lang="scss">
.v-list {
  contain: inline-size;
}
</style>
