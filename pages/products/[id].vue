<script setup>
import { useRoute } from "vue-router";
import { products } from "~/lib/products";
import { useSeoMeta, useHead } from "#imports";
import { toast } from "vue-sonner";

const route = useRoute();
const id = route.params.id;
const product = products.find((p) => p.id === id);
const relatedProducts = products.filter(
  (p) => p.category === product?.category && p.id !== product?.id
);

// Default selected color (first one)
const selectedColor = ref(product?.colors?.[0] || "");

const selectedSize = ref(product?.sizes?.[0] || "");

const cartStore = useCartStore();
const addToCart = (product) => {
  cartStore.addToCart(product, {
    color: selectedColor.value,
    size: selectedSize.value,
  });
  toast.success(`Product added to cart 🎉`, {
    description: `${product.name} (${selectedColor.value}, ${selectedSize.value}) has been added to your cart.`,
  });
  console.log("product: ", product, "color:", selectedColor.value, "size:", selectedSize.value);
}

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
  <div class="max-w-6xl mx-auto px-4 py-10 mt-20 max-sm:mt-0">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Zoomable Product Image -->
      <div class="relative group overflow-hidden rounded-lg bg-gray-100">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
            <p class="text-lg text-gray-700 mt-2">{{ product.description }}</p>
          </div>
          <button
            class="text-gray-500 hover:text-red-500 transition text-2xl"
            aria-label="Add to Wishlist"
          >
            ❤️
          </button>
        </div>

        <div class="text-2xl font-semibold text-green-600">
          ${{ product.price.toFixed(2) }}
        </div>

        <!-- In stock -->
        <div class="text-sm">
          <span
            :class="product.inStock ? 'text-green-600' : 'text-red-500'"
            class="font-medium"
          >
            {{ product.inStock ? "In Stock" : "Out of Stock" }}
          </span>
        </div>

        <!-- Color Variants -->
        <div v-if="product.colors?.length" class="space-y-1">
          <p class="text-sm font-medium text-gray-600">Color:</p>
          <div class="flex gap-3">
            <div
              v-for="color in product.colors"
              :key="color"
              :class="[
                'w-8 h-8 rounded-full border-2 cursor-pointer',
                selectedColor === color ? 'ring-2 ring-black' : '',
              ]"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            />
          </div>
        </div>

        <!-- Sizes -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="size in product.sizes"
            :key="size"
            :class="['px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 cursor-pointer', selectedSize === size ? 'bg-gray-200' : '']"
            @click="selectedSize = size"
          >
            {{ size }}
          </span>
        </div>

        <!-- Add to Cart -->
        <button
          :disabled="!product.inStock"
          class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          @click="() => addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Reviews -->
    <div class="mt-16">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>

      <!-- Grid layout instead of vertical stack -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          v-for="review in product.reviews || []"
          :key="review.id"
          class="border rounded-lg p-4 bg-white shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <p class="font-semibold text-gray-800">{{ review.user }}</p>
            <div class="text-yellow-400">
              <!-- Use Math.floor for filled stars -->
              <span
                v-for="star in Math.floor(review.rating)"
                :key="'filled-' + star"
                >★</span
              >
              <!-- For empty stars, do 5 - floor(rating) -->
              <span
                v-for="star in 5 - Math.floor(review.rating)"
                :key="'empty-' + star"
                >☆</span
              >
            </div>
          </div>
          <p class="text-gray-600 text-sm">{{ review.comment }}</p>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length" class="mt-20">
      <h2 class="text-xl font-bold text-gray-800 mb-4">You might also like</h2>
      <div class="flex gap-6 overflow-x-auto pb-4">
        <div
          v-for="item in relatedProducts"
          :key="item.id"
          class="min-w-[200px] bg-white rounded-lg shadow-sm hover:shadow-md transition p-3"
        >
          <NuxtLink :to="`/products/${item.id}`">
            <img
              :src="item.image"
              :alt="item.name"
              class="rounded-lg w-full h-40 object-cover mb-2"
            />
            <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
            <p class="text-green-600 text-sm">₦{{ item.price.toFixed(2) }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="text-center text-red-600 font-bold text-lg">
      ❌ Product not found!
    </div>
  </div>
</template>
