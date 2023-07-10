<template>
    <v-form ref="form" @submit.prevent="addAccount">
        <v-card class="pa-2">
            <v-card-title headline class="font-weight-bold mt-2">Add Account</v-card-title>
            <v-card-text>
                <v-text-field density="comfortable" v-model="userName" clearable label="User Name"
                    :rules="rules"></v-text-field>

                <v-text-field density="comfortable" v-model="password" clearable label="Password"
                    :rules="rules"></v-text-field>
                <v-select density="comfortable" v-model="typeAccount" clearable label="Type Account"
                    :items="['admin', 'customer']" :rules="rules" class="mt-2"></v-select>

                <v-row>
                    <v-col cols="6">
                        <v-text-field density="comfortable" v-model="firstName" clearable label="First Name"
                            :rules="rules"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field density="comfortable" v-model="lastName" clearable label="Last Name"
                            :rules="rules"></v-text-field>
                    </v-col>
                </v-row>

                <v-text-field density="comfortable" type="number" v-model="phoneNumber" clearable label="Phone Number"
                    :rules="phoneNUmberRules"></v-text-field>

                <v-text-field density="comfortable" v-model="address" clearable label="Address"
                    :rules="rules"></v-text-field>

                <v-btn color="black" type="submit" class="mb-3 d-flex align-center float-right"
                    prepend-icon="mdi-send-circle">
                    Submit
                </v-btn>
            </v-card-text>
        </v-card>
    </v-form>
</template>

<script setup>
const form = ref(null);
const emit = defineEmits(['isStatus']);

const userName = ref(null);
const password = ref(null);
const firstName = ref(null);
const lastName = ref(null);
const phoneNumber = ref(null);
const address = ref(null);
const typeAccount = ref(null);

const rules = [
    value => !!value || 'Required.',
];


const phoneNUmberRules = [
    value => !!value || 'Required.',
    value => (value && value.length === 10) || "Phone number must have 10 digits.",
];

async function validate () {
    const { valid } = await form._value.validate();
    return valid;
}


async function addAccount () {
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
        }

        try {
            const { data } = await useAsyncData('add-account', () =>
                $fetch('http://localhost:8000/user/add',
                    {
                        method: 'POST',
                        body: user,
                    }
                )
            )
            if (data._rawValue.add) {
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