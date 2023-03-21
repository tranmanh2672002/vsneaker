<template>
  <v-container class="bg-surface-variant mb-6">
    <v-row align="start" no-gutters>
      <v-col v-for="n in 12" lg="3" md="4" sm="6" xs="12" :key="n">
        <div class="mx-4">
          <v-card class="card" style="margin-bottom: 20px">
            <div v-if="discount" class="card-discount">10%</div>
            <div v-if="discount" class="card-discount-border"></div>
            <v-card-item>
              <div>
                <v-img
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                  lazy-src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                  cover
                  class="text-white"
                >
                </v-img>
                <div class="card-title">Vans MN Skate Old School</div>
                <div class="card-price-old">Giá gốc: 2.000.000 đ</div>
                <div class="card-price-discount">Giảm giá: 2.000.000 đ</div>
              </div>
            </v-card-item>

            <div class="card-bottom">
              <HomeProductDetail />
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
  </v-container>
</template>

<script setup>
import HomeProductDetail from "./HomeProductDetail.vue";

const discount = ref(true);
const page = ref(1);
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  &:hover {
    scale: 1.05;
  }
  .card-discount {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 44px;
    color: #f10000;
    font-size: 1.2rem;
    background-color: yellow;
    padding: 8px 4px;
    z-index: 10;
  }
  .card-discount-border {
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 10;
    border-left: 25px solid yellow;
    border-right: 25px solid yellow;
    border-bottom: 10px solid transparent;
  }
}

.card-title {
  padding: 10px 0;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}

.card-price-old {
  padding: 4px;
  font-size: 0.8rem;
  text-decoration: line-through;
}

.card-price-discount {
  padding: 4px;
  color: #f10000;
  font-size: 1rem;
}

.card-bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px 20px;
}
</style>
