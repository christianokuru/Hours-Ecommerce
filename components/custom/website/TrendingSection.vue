<script setup>
import { products } from '~/lib/products';
import ProductCardComponent from '@/components/custom/website/ProductCardComponent.vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

// Get top rated products (rating >= 4.5)
const trendingProducts = products
  .filter(product => product.rating >= 4.5)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>

<template>
  <section class="py-16 px-6 lg:px-36 dark:bg-background">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-foreground">
            Trending Now
          </h2>
          <p class="text-lg text-gray-600">
            Most loved items by our community
          </p>
        </div>
        
        <nuxt-link
          to="/products"
          class="hidden md:flex items-center gap-2 text-black hover:text-gray-600 transition-colors group"
        >
          <span>View All</span>
          <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </nuxt-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <product-card-component
          v-for="product in trendingProducts"
          :key="product.id"
          :product="product"
          :on-add-to-cart="() => addToCart(product)"
        />
      </div>

      <div class="text-center md:hidden">
        <nuxt-link
          to="/products"
          class="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          <span>View All Products</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>