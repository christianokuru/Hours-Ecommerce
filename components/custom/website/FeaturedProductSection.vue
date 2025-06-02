<script setup>
import ProductCardComponent from "@/components/custom/website/ProductCardComponent.vue";
import StepperComponent from "@/components/custom/website/StepperComponent.vue";
import { products } from "~/lib/products";
</script>

<template>
  <div class="mt-20 mx-36">
    <stepper-component />
    <h1 class="text-4xl font-[600] mb-16">Our Top Sales</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCardComponent
        v-for="product in products.slice(0, 3)"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
