<script setup>
import ProductCardComponent from "@/components/custom/website/ProductCardComponent.vue";
import StepperComponent from "@/components/custom/website/StepperComponent.vue";
import { products } from "~/lib/products";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

// ✅ Define this function
const addToCart = (product) => {
  console.log(cartStore)
  cartStore.addToCart(product);
};
</script>

<template>
  <div class="mx-36 max-sm:mx-6 max-sm:mt-0">
    <!-- <stepper-component /> -->
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-[600] my-16 max-sm:text-2xl">Our Top Sales</h1>
      <ui-button variant="outline" size="lg">
        <nuxt-link :to="{ name: 'products' }">View All</nuxt-link>
      </ui-button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-sm:grid-cols-1">
      <product-card-component
        v-for="product in products.slice(0, 3)"
        :key="product.id"
        :product="product"
        :on-add-to-cart="() => addToCart(product)"
      />
    </div>
  </div>
</template>
