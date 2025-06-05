<script setup>
import { products } from '~/lib/products'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const product = products.find(p => p.id === id)

</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4">The Product Pagesssss</h2>

    <div v-if="product">
      <h1 class="text-3xl font-bold">{{ product.name }}</h1>
      <p>{{ product.description || 'No description available' }}</p>
      <p>₦{{ product.price.toFixed(2) }}</p>
      <img :src="product.image" :alt="product.name" class="w-60 rounded" />
    </div>

    <div v-else class="text-red-600 font-bold">
      ❌ Product not found!
    </div>
  </div>
</template>
