<template>
    <div class="header">
        <div class="header__logo">
            <img :src="logo" alt="logo" />
        </div>
        <div class="header__user">
            <header-user-avatar />
        </div>
    </div>
</template>

<script setup>
import logo from "../assets/images/Header-logo.png";
import HeaderUserAvatar from "../features/header/components/HeaderUserAvatar.vue";

</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: black;
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
}

.header__logo {
    flex: 1;
    height: 60px;

    img {
        width: 140px;
        cursor: pointer;
    }
}

.header__user {
    font-size: 20px;
    color: white;
}
</style>
