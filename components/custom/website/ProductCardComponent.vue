<script setup>
import { toast } from "vue-sonner";
import { ref } from "vue";

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

const isHovered = ref(false);
const isLoading = ref(false);

const handleAddToCart = async () => {
  if (!props.product.inStock) return;
  
  isLoading.value = true;
  
  // Add a slight delay for better UX
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("Product added to cart:", props.product);
  props.onAddToCart();
  
  toast.success(`Added to cart! 🛍️`, {
    description: `${props.product.name} is ready for checkout.`,
    duration: 3000,
  });
  
  isLoading.value = false;
};

// Get discount percentage if any (for demo purposes)
const getDiscountPercentage = () => {
  if (props.product.price > 50) return 10;
  if (props.product.price > 30) return 5;
  return 0;
};

const discount = getDiscountPercentage();
const originalPrice = discount ? props.product.price / (1 - discount / 100) : null;
</script>

<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="group relative bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-3xl shadow-sm hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/20 transition-all duration-500 overflow-hidden"
    :class="{ 
      'opacity-75 saturate-50': !product.inStock,
      'transform hover:-translate-y-2': product.inStock
    }"
  >
    <!-- Gradient Overlay for Premium Feel -->
    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-900/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <!-- Top Badge Area -->
    <div class="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
      <!-- Stock Status -->
      <div class="flex flex-col gap-2">
        <span
          v-if="product.inStock"
          class="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
        >
          <div class="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          In Stock
        </span>
        <span
          v-else
          class="inline-flex items-center gap-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
        >
          <div class="w-1.5 h-1.5 bg-white rounded-full" />
          Sold Out
        </span>
        
        <!-- Discount Badge -->
        <span
          v-if="discount > 0"
          class="inline-flex items-center bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
        >
          -{{ discount }}%
        </span>
      </div>

      <!-- Wishlist Button -->
      <button class="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
        <svg class="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Product Image -->
    <nuxt-link :to="`/products/${product.id}`" class="block relative">
      <div class="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <nuxt-img
          :src="product.image"
          :alt="product.name"
          class="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
          :class="{ 'grayscale': !product.inStock }"
        />
        
        <!-- Image Overlay on Hover -->
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <!-- Quick View Button -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white px-4 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Quick View
          </div>
        </div>
      </div>
    </nuxt-link>

    <!-- Product Details -->
    <div class="p-6 space-y-4">
      <!-- Category & Rating -->
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {{ product.category }}
        </span>
        <div class="flex items-center gap-1">
          <div class="flex text-yellow-400">
            <svg v-for="star in Math.floor(product.rating)" :key="star" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">{{ product.rating }}</span>
        </div>
      </div>

      <!-- Product Name -->
      <nuxt-link :to="`/products/${product.id}`">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
          {{ product.name }}
        </h3>
      </nuxt-link>

      <!-- Price Section -->
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-gray-900 dark:text-white">
          ${{ product.price.toFixed(2) }}
        </span>
        <span v-if="originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">
          ${{ originalPrice.toFixed(2) }}
        </span>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 min-h-[28px]">
        <span
          v-for="tag in product.tags.slice(0, 2)"
          :key="tag"
          class="inline-flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200/50 dark:border-blue-700/50"
        >
          #{{ tag }}
        </span>
        <span
          v-if="product.tags.length > 2"
          class="inline-flex items-center px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full"
        >
          +{{ product.tags.length - 2 }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        :disabled="!product.inStock || isLoading"
        @click="handleAddToCart"
        class="w-full relative overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-100 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        <span class="relative z-10 flex items-center justify-center gap-2">
          <svg
            v-if="isLoading"
            class="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <svg
            v-else-if="product.inStock"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6-2.5L17.5 18.5M17.5 18.5L20 21" />
          </svg>
          
          <span>
            {{ isLoading ? 'Adding...' : (product.inStock ? 'Add to Cart' : 'Sold Out') }}
          </span>
        </span>
        
        <!-- Button hover effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>