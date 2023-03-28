<template>
  <v-btn
    class="scroll-top"
    v-if="showScrollTop"
    @click="scrollToTop"
    icon="mdi-chevron-up "
  ></v-btn>
</template>

<script>
export default {
  data() {
    return {
      showScrollTop: true,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const limit = 100;
      if (scrollTop > limit) {
        this.showScrollTop = true;
      } else {
        this.showScrollTop = false;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.scroll-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #af0000;
  color: #fff;
  border: none;
  outline: none;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.scroll-top:hover {
  background-color: #8f0000;
}
</style>
