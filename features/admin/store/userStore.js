import { defineStore } from "pinia";

export const useUserStore = defineStore("accounts", () => {
  const accounts = ref([]);
  const pages = ref(0);
  const currentPage = ref(1);

  function setCurrentPage(data) {
    currentPage.value = data;
  }

  function setPages(data) {
    pages.value = data;
  }

  function setAccount(data) {
    accounts.value = data;
  }

  async function getAccounts() {
    const { data: listAccounts } = await useAsyncData("accounts", () =>
      $fetch(
        `http://localhost:8000/user/all-accounts?offset=${
          currentPage.value - 1
        }`
      )
    );
    setAccount(listAccounts._rawValue.accounts);
    setPages(listAccounts._rawValue.countPage);
    return {
      accounts: listAccounts._rawValue.accounts,
      pages: listAccounts._rawValue.countPage,
    };
  }

  return { getAccounts, setCurrentPage, currentPage, accounts };
});
