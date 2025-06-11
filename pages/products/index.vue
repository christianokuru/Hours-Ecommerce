<script setup>
import { products } from "~/lib/products";
import ProductCardComponent from "@/components/custom/website/ProductCardComponent.vue";
import { useCartStore } from "@/stores/cart";

useHead({
  title: "All Our Products",
});

const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>

<template>
  <div class="px-6 lg:px-36 py-10">
    <h1 class="text-4xl font-semibold mb-10 text-center">All Products</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCardComponent
        v-for="product in products"
        :key="product.id"
        :product="product"
        :on-add-to-cart="() => addToCart(product)"
      />
    </div>
  </div>
</template>
