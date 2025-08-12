<script setup>
import { products } from "~/lib/products";
import ProductCardComponent from "@/components/custom/website/ProductCardComponent.vue";
import { useCartStore } from "@/stores/cart";
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

useHead({
  title: "All Our Products - Hours Collection",
});

const cartStore = useCartStore();

// Reactive state
const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedSort = ref("name");
const currentView = ref("grid"); // grid or list
const showFilters = ref(false);

// Get unique categories
const categories = computed(() => {
  const cats = [...new Set(products.map(p => p.category))];
  return [{ value: "all", label: "All Categories" }, ...cats.map(cat => ({ value: cat, label: cat }))];
});

// Filter and sort products
const filteredProducts = computed(() => {
  let filtered = products;

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }

  // Category filter
  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (selectedSort.value) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return filtered;
});

// Stats
const inStockCount = computed(() => products.filter(p => p.inStock).length);
const avgRating = computed(() => {
  const total = products.reduce((sum, p) => sum + p.rating, 0);
  return (total / products.length).toFixed(1);
});

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  selectedSort.value = "name";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Hero Section -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="px-6 lg:px-36 py-16 mt-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Our Complete
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Collection
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Discover our full range of premium streetwear and everyday essentials, 
            carefully curated for style, comfort, and quality.
          </p>
          
          <!-- Quick Stats -->
          <div class="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{{ inStockCount }} items in stock</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>{{ avgRating }}★ average rating</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{{ products.length }} total products</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="px-6 lg:px-36 py-6">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="relative flex-1 max-w-md">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- Filter Controls -->
          <div class="flex items-center gap-4 flex-wrap">
            <!-- Category Filter -->
            <select
              v-model="selectedCategory"
              class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
            >
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>

            <!-- Sort Filter -->
            <select
              v-model="selectedSort"
              class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <!-- View Toggle -->
            <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              <button
                @click="currentView = 'grid'"
                :class="[
                  'p-2 rounded-full transition-all',
                  currentView === 'grid' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                @click="currentView = 'list'"
                :class="[
                  'p-2 rounded-full transition-all',
                  currentView === 'list' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
            >
              Clear All
            </button>
          </div>
        </div>

        <!-- Results Info -->
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {{ filteredProducts.length }} of {{ products.length }} products
          <span v-if="searchQuery || selectedCategory !== 'all'">
            <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
            <span v-if="selectedCategory !== 'all'"> in {{ selectedCategory }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="px-6 lg:px-36 py-12">
      <!-- No Results -->
      <div v-if="filteredProducts.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
        <button
          @click="clearFilters"
          class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Clear All Filters
        </button>
      </div>

      <!-- Grid View -->
      <div
        v-else-if="currentView === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <product-card-component
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :on-add-to-cart="() => addToCart(product)"
        />
      </div>

      <!-- List View -->
      <div v-else class="space-y-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
        >
          <!-- Product Image -->
          <div class="w-full sm:w-48 aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 flex-shrink-0">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Product Info -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ product.name }}</h3>
                  <span class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                    {{ product.category }}
                  </span>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">${{ product.price.toFixed(2) }}</div>
                  <div class="flex items-center gap-1 text-sm text-yellow-500">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{{ product.rating }}</span>
                  </div>
                </div>
              </div>

              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{{ product.description }}</p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in product.tags"
                  :key="tag"
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- Sizes & Colors -->
              <div class="flex flex-wrap gap-4 mb-4 text-sm">
                <div v-if="product.sizes?.length">
                  <span class="text-gray-500 dark:text-gray-400">Sizes:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ product.sizes.join(', ') }}</span>
                </div>
                <div v-if="product.colors?.length">
                  <span class="text-gray-500 dark:text-gray-400">Colors:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ product.colors.join(', ') }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    product.inStock
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  ]"
                >
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </div>

              <div class="flex items-center gap-3">
                <nuxt-link
                  :to="`/products/${product.id}`"
                  class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline"
                >
                  View Details
                </nuxt-link>
                <button
                  @click="addToCart(product)"
                  :disabled="!product.inStock"
                  class="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Load More (if you want to implement pagination later) -->
    <section class="px-6 lg:px-36 py-8 text-center">
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        You've seen all {{ filteredProducts.length }} products
      </p>
      <nuxt-link
        to="/"
        class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <svg class="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span>Back to Home</span>
      </nuxt-link>
    </section>
  </div>
</template>