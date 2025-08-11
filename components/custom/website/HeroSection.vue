<script setup>
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-vue-next'

const router = useRouter()

const goToProducts = () => {
  router.push('/products')
}
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Background Image with Parallax Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <nuxt-img
        src="/images/hero77.jpg"
        alt="Premium Fashion Collection"
        class="absolute inset-0 w-full h-full object-cover opacity-95 dark:opacity-75"
        loading="eager"
        format="webp"
      />
      
      <!-- Subtle Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 dark:from-black/40 dark:to-black/20"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-start justify-center h-screen px-6 sm:px-12 lg:px-20 xl:px-32">
      <div class="max-w-2xl space-y-8">
        <!-- Main Heading -->
        <div class="space-y-4 animate-fadeInUp delay-200">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span class="block text-white drop-shadow-lg">
              <span class="relative">
                Define Your Moment
                <svg class="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 900 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M5,15 Q50,5 100,12 T200,8 Q250,15 295,10" 
                    stroke="url(#brush-gradient)" 
                    stroke-width="10" 
                    stroke-linecap="round"
                    fill="none"
                    class="animate-draw"
                  />
                  <defs>
                    <linearGradient id="brush-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
                      <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#C084FC;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h1>
          
          <p class="text-lg text-white drop-shadow-md font-normal">
            Premium streetwear for the modern lifestyle
          </p>
        </div>

        <!-- Call to Action Button -->
        <div class="animate-fadeInUp delay-400">
          <button
            @click="goToProducts"
            class="group relative overflow-hidden bg-white text-slate-900 px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 hover:bg-slate-100 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            <span class="relative z-10 flex items-center justify-center gap-3">
              Shop Now
              <arrow-right class="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Section - Multiple Stats -->
    <div class="absolute bottom-8 right-8 hidden xl:block animate-fadeInUp delay-600">
      <div class="bg-black/30 backdrop-blur-md rounded-xl p-6 text-white border border-white/40">
        <div class="grid grid-cols-2 gap-6 text-center">
          <div>
            <div class="text-2xl font-bold text-white">25K+</div>
            <div class="text-xs text-white font-medium">Happy Customers</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white">4.9</div>
            <div class="text-xs text-white flex items-center justify-center gap-1 font-medium">
              <star class="w-3 h-3 fill-white text-white" />
              Rating
            </div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white">200+</div>
            <div class="text-xs text-white font-medium">Products</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white">98%</div>
            <div class="text-xs text-white font-medium">Satisfaction</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white">5+ Years</div>
            <div class="text-xs text-white font-medium">Experience</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white">24/7</div>
            <div class="text-xs text-white font-medium">Support</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes draw {
  from {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
  }
  to {
    stroke-dasharray: 400;
    stroke-dashoffset: 0;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-draw {
  animation: draw 5s ease-out 3s forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-800 {
  animation-delay: 0.8s;
}
</style>