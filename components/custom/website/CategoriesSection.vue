<script setup>
const categories = [
  {
    name: 'Hoodies',
    image: '/images/products/black-hoodie.jpeg',
    description: 'Cozy and stylish hoodies',
    count: 3
  },
  {
    name: 'Trousers',
    image: '/images/products/blue-jeans.jpeg',
    description: 'Comfortable everyday wear',
    count: 4
  },
  {
    name: 'T-Shirts',
    image: '/images/products/red-graphic-tee.jpeg',
    description: 'Bold graphic designs',
    count: 1
  },
  {
    name: 'Sweatshirts',
    image: '/images/products/oversized-swarshirt.jpeg',
    description: 'Premium comfort wear',
    count: 2
  },
  {
    name: 'Footwear',
    image: '/images/products/white-sneakers.jpeg',
    description: 'Step out in style',
    count: 2
  },
  {
    name: 'Accessories',
    image: '/images/products/brown-leather-belt.jpeg',
    description: 'Complete your look',
    count: 3
  }
]
</script>

<template>
  <section class="py-16 px-6 lg:px-36 bg-gray-50 dark:bg-background">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-foreground">
          Shop by Category
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of premium streetwear and everyday essentials
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <nuxt-link
          v-for="category in categories"
          :key="category.name"
          :to="`/categories/${category.name.toLowerCase()}`"
          class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="aspect-square overflow-hidden">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          
          <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h3 class="text-2xl font-bold mb-2">{{ category.name }}</h3>
            <p class="text-white/90 text-sm mb-2">{{ category.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-white/80 text-xs">{{ category.count }} items</span>
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>