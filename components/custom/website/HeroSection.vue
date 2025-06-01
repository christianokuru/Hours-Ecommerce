<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProducts = () => {
  router.push('/products')
}
</script>

<template>
  <div class="relative w-full h-screen">
    <!-- Hero Image -->
    <NuxtImg
      src="/images/hero77.jpg"
      alt="Hero"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay Text -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black/10">
      <h1 class="text-6xl md:text-6xl font-bold mb-4">Elevate Your Wardrobe</h1>
      <p class="text-lg md:text-xl mb-6">Minimalist fashion for every season</p>
      <button
        @click="goToProducts"
        class="pulse px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all"
      >
        Shop Now
      </button>
    </div>
  </div>
</template>
