<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { products } from "~/lib/products";
import ProductCardComponent from "@/components/custom/website/ProductCardComponent.vue";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  X,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-vue-next";

// SEO and Meta
useSeoMeta({
  title: "Shop Categories – Hours Collection",
  description:
    "Browse our premium streetwear collection by category. Find hoodies, sweatshirts, pants, polos, shorts and more from Hours Collection.",
  ogTitle: "Shop by Category – Hours Collection",
  ogDescription:
    "Discover our complete range of premium streetwear organized by category.",
  ogImage: "/images/categories-hero.jpg",
  ogUrl: "https://hours-store.vercel.app/categories",
  twitterTitle: "Categories – Hours Collection",
  twitterDescription: "Browse our premium streetwear by category.",
  twitterImage: "/images/categories-hero.jpg",
  twitterCard: "summary_large_image",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
});

// Router and cart store
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

// Reactive state
const searchQuery = ref("");
const selectedCategory = ref(route.query.category || "all");
const selectedSize = ref(route.query.size || "all");
const selectedColor = ref(route.query.color || "all");
const priceRange = ref([0, 1000]);
const sortBy = ref(route.query.sort || "name");
const sortOrder = ref(route.query.order || "asc");
const viewMode = ref("grid");
const showFilters = ref(false);
const itemsPerPage = ref(12);
const currentPage = ref(1);

// Get unique values for filters
const categories = computed(() => {
  const cats = [...new Set(products.map((p) => p.category))];
  return ["all", ...cats];
});

const sizes = computed(() => {
  const allSizes = products.flatMap((p) => p.sizes || []);
  const uniqueSizes = [...new Set(allSizes)];
  return ["all", ...uniqueSizes];
});

const colors = computed(() => {
  const allColors = products.flatMap((p) => p.colors || []);
  const uniqueColors = [...new Set(allColors)];
  return ["all", ...uniqueColors];
});

const priceRangeMax = computed(() => {
  return Math.max(...products.map((p) => p.price));
});

// Filtered and sorted products
const filteredProducts = computed(() => {
  let filtered = products.filter((product) => {
    // Search filter
    if (
      searchQuery.value &&
      !product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (
      selectedCategory.value !== "all" &&
      product.category !== selectedCategory.value
    ) {
      return false;
    }

    // Size filter
    if (
      selectedSize.value !== "all" &&
      (!product.sizes || !product.sizes.includes(selectedSize.value))
    ) {
      return false;
    }

    // Color filter
    if (
      selectedColor.value !== "all" &&
      (!product.colors || !product.colors.includes(selectedColor.value))
    ) {
      return false;
    }

    // Price filter
    if (
      product.price < priceRange.value[0] ||
      product.price > priceRange.value[1]
    ) {
      return false;
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortBy.value) {
      case "price":
        comparison = a.price - b.price;
        break;
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "rating":
        const aRating = a.reviews
          ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
          : 0;
        const bRating = b.reviews
          ? b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length
          : 0;
        comparison = aRating - bRating;
        break;
      case "newest":
        comparison = new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }

    return sortOrder.value === "asc" ? comparison : -comparison;
  });

  return filtered;
});

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value)
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Active filters count
const activeFiltersCount = computed(() => {
  let count = 0;
  if (selectedCategory.value !== "all") count++;
  if (selectedSize.value !== "all") count++;
  if (selectedColor.value !== "all") count++;
  if (priceRange.value[0] > 0 || priceRange.value[1] < priceRangeMax.value)
    count++;
  if (searchQuery.value) count++;
  return count;
});

// Watch for route changes
watch(
  [selectedCategory, selectedSize, selectedColor, sortBy, sortOrder],
  () => {
    updateURL();
    currentPage.value = 1;
  }
);

watch(
  priceRange,
  () => {
    updateURL();
    currentPage.value = 1;
  },
  { deep: true }
);

// Functions
const updateURL = () => {
  const query = {};
  if (selectedCategory.value !== "all") query.category = selectedCategory.value;
  if (selectedSize.value !== "all") query.size = selectedSize.value;
  if (selectedColor.value !== "all") query.color = selectedColor.value;
  if (sortBy.value !== "name") query.sort = sortBy.value;
  if (sortOrder.value !== "asc") query.order = sortOrder.value;

  router.push({ query });
};

const clearAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  selectedSize.value = "all";
  selectedColor.value = "all";
  priceRange.value = [0, priceRangeMax.value];
  sortBy.value = "name";
  sortOrder.value = "asc";
  currentPage.value = 1;
  updateURL();
};

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const toggleSort = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const getProductRating = (product) => {
  if (!product.reviews || product.reviews.length === 0) return 0;
  return (
    product.reviews.reduce((sum, r) => sum + r.rating, 0) /
    product.reviews.length
  );
};

// Initialize price range
priceRange.value = [0, priceRangeMax.value];
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero Section -->
    <section
      class="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Shop
            <span
              class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Categories
            </span>
          </h1>
          <p
            class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Discover our complete collection of premium streetwear, organized by
            category for easy browsing.
          </p>
        </div>

        <!-- Quick Category Links -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <button
            v-for="category in categories.slice(0, 6)"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card hover:bg-card/80 text-foreground border',
            ]"
          >
            {{
              category === "all"
                ? "All Categories"
                : category.charAt(0).toUpperCase() + category.slice(1)
            }}
          </button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-80 space-y-6">
          <!-- Mobile Filter Toggle -->
          <div class="lg:hidden">
            <button
              @click="showFilters = !showFilters"
              class="flex items-center justify-between w-full p-4 bg-card rounded-lg border"
            >
              <div class="flex items-center space-x-2">
                <filter class="w-5 h-5" />
                <span class="font-medium">Filters</span>
                <badge v-if="activeFiltersCount > 0" class="ml-2">
                  {{ activeFiltersCount }}
                </badge>
              </div>
              <chevron-down
                :class="[
                  'w-5 h-5 transition-transform',
                  showFilters ? 'rotate-180' : '',
                ]"
              />
            </button>
          </div>

          <!-- Filter Content -->
          <div :class="['space-y-6', { 'hidden lg:block': !showFilters }]">
            <!-- Search -->
            <card class="p-4">
              <h3 class="font-semibold mb-3 flex items-center">
                <search class="w-4 h-4 mr-2" />
                Search Products
              </h3>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <search
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <x class="w-4 h-4" />
                </button>
              </div>
            </card>

            <!-- Category Filter -->
            <card class="p-4">
              <h3 class="font-semibold mb-3">Category</h3>
              <div class="space-y-2">
                <label
                  v-for="category in categories"
                  :key="category"
                  class="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 rounded p-2"
                >
                  <input
                    v-model="selectedCategory"
                    :value="category"
                    type="radio"
                    name="category"
                    class="text-primary focus:ring-primary"
                  />
                  <span class="text-sm">
                    {{
                      category === "all"
                        ? "All Categories"
                        : category.charAt(0).toUpperCase() + category.slice(1)
                    }}
                  </span>
                  <span class="ml-auto text-xs text-muted-foreground">
                    {{
                      category === "all"
                        ? products.length
                        : products.filter((p) => p.category === category).length
                    }}
                  </span>
                </label>
              </div>
            </card>

            <!-- Size Filter -->
            <card class="p-4">
              <h3 class="font-semibold mb-3">Size</h3>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="size in sizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'p-2 text-xs font-medium rounded border transition-colors',
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted border-border',
                  ]"
                >
                  {{ size === "all" ? "All" : size }}
                </button>
              </div>
            </card>

            <!-- Clear Filters -->
            <button
              v-if="activeFiltersCount > 0"
              @click="clearAllFilters"
              class="w-full p-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              Clear All Filters ({{ activeFiltersCount }})
            </button>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1">
          <!-- Results Header -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
          >
            <div>
              <h2 class="text-xl font-semibold">
                {{ filteredProducts.length }} Products Found
              </h2>
              <p class="text-sm text-muted-foreground">
                Showing {{ paginatedProducts.length }} of
                {{ filteredProducts.length }} products
              </p>
            </div>

            <!-- View Controls -->
            <div class="flex items-center space-x-4">
              <!-- Sort Options -->
              <div class="flex items-center space-x-2">
                <select
                  v-model="sortBy"
                  class="px-3 py-2 border rounded-lg bg-background text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>

                <button
                  @click="toggleSort"
                  class="p-2 border rounded-lg hover:bg-muted transition-colors"
                  :title="
                    sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'
                  "
                >
                  <sort-asc v-if="sortOrder === 'asc'" class="w-4 h-4" />
                  <sort-desc v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div v-if="paginatedProducts.length > 0">
            <!-- Grid View -->
            <div
              v-if="viewMode === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8"
            >
              <product-card-component
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
                :on-add-to-cart="() => addToCart(product)"
                class="transform transition-transform duration-300"
              />
            </div>

            <!-- List View -->
            <div v-else class="space-y-4 mb-8">
              <card
                v-for="product in paginatedProducts"
                :key="product.id"
                class="p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div class="flex flex-col sm:flex-row gap-4">
                  <div class="w-full sm:w-32 h-32 flex-shrink-0">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div class="flex-1 space-y-2">
                    <div class="flex justify-between items-start">
                      <h3 class="font-semibold text-lg">{{ product.name }}</h3>
                      <button
                        class="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <heart class="w-5 h-5" />
                      </button>
                    </div>
                    <p class="text-sm text-muted-foreground line-clamp-2">
                      {{ product.description }}
                    </p>
                    <div class="flex items-center space-x-2">
                      <div class="flex items-center">
                        <star
                          v-for="star in 5"
                          :key="star"
                          :class="[
                            'w-4 h-4',
                            star <= getProductRating(product)
                              ? 'text-yellow-400 fill-current'
                              : 'text-muted-foreground',
                          ]"
                        />
                      </div>
                      <span class="text-sm text-muted-foreground">
                        ({{ product.reviews?.length || 0 }} reviews)
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <span class="text-2xl font-bold text-primary">
                          {{ formatPrice(product.price) }}
                        </span>
                        <badge
                          v-if="product.inStock"
                          class="bg-green-100 text-green-800"
                        >
                          In Stock
                        </badge>
                        <badge v-else class="bg-red-100 text-red-800">
                          Out of Stock
                        </badge>
                      </div>
                      <button
                        @click="addToCart(product)"
                        :disabled="!product.inStock"
                        class="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <shopping-cart class="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </card>
            </div>

            <!-- Pagination -->
            <div
              v-if="totalPages > 1"
              class="flex justify-center items-center space-x-2"
            >
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div class="flex space-x-1">
                <button
                  v-for="page in Math.min(5, totalPages)"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-3 py-2 rounded-lg transition-colors',
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted',
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-16">
            <div
              class="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <search class="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 class="text-xl font-semibold mb-2">No products found</h3>
            <p class="text-muted-foreground mb-6">
              Try adjusting your filters or search terms to find what you're
              looking for.
            </p>
            <button
              @click="clearAllFilters"
              class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.15s ease-in-out;
}

.slider::-webkit-slider-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: none;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.15s ease-in-out;
}

.slider::-moz-range-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
