
<script setup>
import { ref, computed } from "vue";
import { products } from "~/lib/products";
import ProductCardComponent from "@/components/custom/website/ProductCardComponent.vue";
import { useCartStore } from "@/stores/cart";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

useHead({
  title: "All Our Products",
});

const cartStore = useCartStore();
const addToCart = (product) => {
  cartStore.addToCart(product);
};

// Pagination logic
const currentPage = ref(1);
const pageSize = 8;
const totalPages = computed(() => Math.ceil(products.length / pageSize));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return products.slice(start, start + pageSize);
});

const goToPrev = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const goToNext = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<template>
  <div class="px-6 lg:px-36 py-10">
    <h1 class="text-4xl font-semibold mb-10 text-center">All Products</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCardComponent
        v-for="product in paginatedProducts"
        :key="product.id"
        :product="product"
        :on-add-to-cart="() => addToCart(product)"
      />
    </div>

    <div class="flex justify-center mt-10">
      <Pagination :total="totalPages" :page="currentPage" class="">
        <PaginationContent>
          <PaginationPrevious @click="goToPrev" :disabled="currentPage === 1" />
          <PaginationItem
            v-for="page in totalPages"
            :key="page"
            :is-active="page === currentPage"
            @click="currentPage = page"
          >
            {{ page }}
          </PaginationItem>
          <PaginationNext @click="goToNext" :disabled="currentPage === totalPages" />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
