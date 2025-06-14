<script setup>
import { toast } from "vue-sonner";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  onAddToCart: {
    type: Function,
    required: true,
  },
});

const handleAddToCart = () => {
  console.log("Product added to cart:", props.product);
  props.onAddToCart();
  toast.success(`Product added to cart 🎉`, {
    description: `${props.product.name} has been added to your cart.`,
  });
};
</script>

<template>
  <div
    class="bg-white dark:bg-background border border-border rounded-2xl shadow-lg p-4 max-sm:p-0 flex flex-col"
    :class="{ 'opacity-50 cursor-not-allowed': !product.inStock }"
  >
    <!-- Product Image + Name wrapped with nuxt-link -->
    <nuxt-link :to="`/products/${product.id}`">
      <div
        class="relative w-full aspect-[4/5] mb-4 overflow-hidden rounded-xl transition-transform hover:scale-105 duration-300"
      >
        <NuxtImg
          :src="product.image"
          :alt="product.name"
          class="object-cover w-full h-full"
        />
        <span
          v-if="product.inStock"
          class="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
        >
          In Stock
        </span>
        <span
          v-else
          class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
        >
          Out of Stock
        </span>
      </div>
    </nuxt-link>

    <!-- Product Details -->
    <div class="flex flex-col gap-2 max-sm:px-4 max-sm:pb-4">
      <nuxt-link :to="`/products/${product.id}`">
        <h2
          class="text-lg font-semibold text-gray-800 dark:text-white hover:underline"
        >
          {{ product.name }}
        </h2>
      </nuxt-link>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ product.category }}
      </p>
      <p class="text-primary font-bold text-xl">
        ${{ product.price.toFixed(2) }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="text-xs bg-blue-100 dark:bg-green-700 dark:text-white text-blue-700 px-2 py-0.5 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-1 text-yellow-400">
        <span class="text-sm">⭐</span>
        <span class="text-sm text-gray-600 dark:text-gray-300">
          {{ product.rating }}/5
        </span>
      </div>

      <!-- Sizes -->
      <div class="flex gap-2 mt-2">
        <span
          v-for="size in product.sizes"
          :key="size"
          class="border border-destructive/30 dark:border-red-300 px-2 py-1 text-sm rounded"
        >
          {{ size }}
        </span>
      </div>

      <!-- Button -->
      <button
        :disabled="!product.inStock"
        @click="handleAddToCart"
        class="mt-4 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition"
      >
        {{ product.inStock ? "Add to Cart" : "Out of Stock" }}
      </button>
    </div>
  </div>
</template>
