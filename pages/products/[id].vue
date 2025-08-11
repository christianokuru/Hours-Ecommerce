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

const newReview = ref("");
const showReviewModal = ref(false);
const reviewRating = ref(0);

function submitReview() {
  if (!newReview.value.trim()) return;
  showReviewModal.value = true;
}

function confirmReview() {
  if (!reviewRating.value) {
    toast.error("Please select a rating.");
    return;
  }
  // Here you would send the review and rating to your backend or update local state
  toast.success("Review submitted!", { description: `${newReview.value} (Rating: ${reviewRating.value}★)` });
  console.log("review: ", newReview.value, "rating:", reviewRating.value);
  newReview.value = "";
  reviewRating.value = 0;
  showReviewModal.value = false;
}

function closeReviewModal() {
  showReviewModal.value = false;
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
  <div class="max-w-6xl mx-auto px-4 py-10 mt-20 max-sm:mt-14">
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
        <!-- Review Submission -->
        <div class="mt-4 flex items-center gap-2">
          <input
            v-model="newReview"
            type="text"
            placeholder="Write a review..."
            class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-black dark:text-white bg-white dark:bg-gray-800"
            @keyup.enter="submitReview"
          />
          <button
            @click="submitReview"
            class="bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition flex items-center justify-center"
            :disabled="!newReview.trim()"
            aria-label="Submit Review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 17l6-6m0 0l6-6m-6 6v12" />
            </svg>
          </button>
        </div>

        <!-- Review Modal -->
        <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-xs relative">
            <button @click="closeReviewModal" class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl">&times;</button>
            <h3 class="text-lg font-semibold mb-4 text-center">Rate this product</h3>
            <div class="flex justify-center mb-4">
              <span
                v-for="star in 5"
                :key="star"
                class="cursor-pointer text-3xl"
                :class="reviewRating >= star ? 'text-yellow-400' : 'text-gray-300'"
                @click="reviewRating = star"
              >★</span>
            </div>
            <button
              @click="confirmReview"
              class="w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary/90 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
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
            <p class="text-green-600 text-sm">${{ item.price.toFixed(2) }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="text-center text-red-600 font-bold text-lg">
      ❌ Product not found!!!
    </div>
  </div>
</template>
