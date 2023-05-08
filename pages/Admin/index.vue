<template>
  <div v-if="userStore.user?.role === 'admin'" class="container">
    <v-row no-gutters>
      <v-col cols="3" class="management">
        <SidebarAdmin @handle-click="handleClick" />
      </v-col>
      <v-col cols="9" class="management-display">
        <ManagementDisplay :clicked-element="clickedElement" />
      </v-col>
    </v-row>
  </div>
  <div v-else>Authorization</div>
</template>

<script setup>
import SidebarAdmin from "~~/features/admin/components/SidebarAdmin.vue";
import ManagementDisplay from "../../features/admin/components/ManagementDisplay.vue";
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();

definePageMeta({
  layout: "admin",
});

const clickedElement = ref("Home");

function handleClick(event) {
  clickedElement.value = event;
}
</script>

<style lang="scss" scoped>
.container {
  margin: 20px 0;
}

.management {
  min-height: 528px;
  border-right: 2px solid black;
  // background-color: aquamarine;
}
</style>
