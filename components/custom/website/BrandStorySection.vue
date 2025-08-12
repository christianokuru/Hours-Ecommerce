<script setup>
const features = [
  {
    icon: '🌱',
    title: 'Sustainable Materials',
    description: 'Eco-friendly fabrics that care for both you and the planet'
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Carefully crafted pieces designed to last and improve with time'
  },
  {
    icon: '🎯',
    title: 'Modern Design',
    description: 'Contemporary styles that seamlessly blend comfort with street fashion'
  },
  {
    icon: '💝',
    title: 'Customer First',
    description: 'Your satisfaction is our priority, from design to delivery'
  }
]
</script>

<template>
  <section class="py-16 px-6 lg:px-36 bg-black text-white">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div>
          <div class="mb-8">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Redefining 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Streetwear
              </span>
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              Hours Collection was born from a simple belief: fashion should be comfortable, sustainable, and authentically you. We create pieces that don't just look good – they feel good and do good.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="flex items-start gap-4"
            >
              <div class="text-2xl">{{ feature.icon }}</div>
              <div>
                <h3 class="font-semibold mb-2">{{ feature.title }}</h3>
                <p class="text-sm text-gray-400">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <nuxt-link
            to="/about"
            class="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium"
          >
            <span>Learn Our Story</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </nuxt-link>
        </div>

        <!-- Right Visual -->
        <div class="relative">
          <div class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
            <img
              src="/images/products/oversized-swarshirt.jpeg"
              alt="Hours Collection Brand Story"
              class="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          
          <!-- Floating Stats -->
          <div class="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <div class="flex items-center gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-white">5K+</div>
                <div class="text-xs text-foreground">Happy Customers</div>
              </div>
              <div class="w-px h-12 bg-white/20"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">98%</div>
                <div class="text-xs text-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>