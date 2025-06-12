<script setup>
import { useRoute } from "vue-router";
import { products } from "~/lib/products";
import { useSeoMeta } from "#imports";

const route = useRoute();
const id = route.params.id;
const product = products.find((p) => p.id === id);

if (product) {
  useSeoMeta({
    title: `${product.name} – Hours Collection`,
    description: product.description,
    ogTitle: `${product.name} – Hours Collection`,
    ogDescription: product.description,
    ogImage: product.image,
    ogUrl: `https://yourdomain.com/products/${product.id}`,
    twitterTitle: `${product.name} – Hours Collection`,
    twitterDescription: product.description,
    twitterImage: product.image,
    twitterCard: "summary_large_image",
  });
}

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10 mt-32">
    <div
      v-if="product"
      class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
    >
      <!-- Product Image -->
      <div class="bg-gray-100 rounded-lg overflow-hidden">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="text-lg text-gray-700 mt-2">{{ product.description }}</p>
        </div>

        <div class="text-2xl font-semibold text-green-600">
          ₦{{ product.price.toFixed(2) }}
        </div>

        <div class="text-sm text-gray-500">
          <span
            :class="product.inStock ? 'text-green-500' : 'text-red-500'"
            class="font-medium"
          >
            {{ product.inStock ? "In Stock" : "Out of Stock" }}
          </span>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="size in product.sizes"
            :key="size"
            class="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600"
          >
            {{ size }}
          </span>
        </div>

        <button
          :disabled="!product.inStock"
          class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <div v-else class="text-center text-red-600 font-bold text-lg">
      ❌ Product not found!
    </div>
  </div>
</template>

<style scoped>
/* You can add custom styles if needed */
</style>
