<template>
    <div v-ripple v-for="element in elements" :key="element.name" class="management__element"
        @click="onClicked(element.name)">
        <v-icon :icon="element.icon"></v-icon>
        <span class="management__element__text">{{ element.text }}</span>
    </div>
</template>

<script setup>
const elements = [
    {
        name: "Home",
        icon: "mdi-home",
        text: "Home"
    },
    {
        name: "Product",
        icon: "mdi-shoe-sneaker",
        text: "Product Management"
    },
    {
        name: "Account",
        icon: "mdi-account-multiple",
        text: "Account Management"
    }
];

const emit = defineEmits(['handleClick'])

function onClicked (event) {
    emit('handleClick', event);
}
</script>

<style lang="scss" scoped>
.management__element {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 20px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        background-color: #ebe8e8;
    }

    .management__element__text {
        margin-left: 10px;
    }
}
</style>