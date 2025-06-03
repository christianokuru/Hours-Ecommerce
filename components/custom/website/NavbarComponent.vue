<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from "vue-router"
import Cart from "@/assets/icons/cart.vue"
import DarkModeComponent from "@/components/custom/website/DarkModeComponent.vue"
import MobileNavbarComponent from "@/components/custom/website/MobileNavbarComponent.vue"
import CartComponent from "@/components/custom/website/CartComponent.vue"
import { links } from '@/lib/navlinks.js'
import { Button } from '@/components/ui/button'
import logo from "@/assets/icons/logo.vue"

const route = useRoute()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="top-0 left-0 w-full z-50 fixed transition-all duration-1000 ease-in-out"
    :class="isScrolled ? 'backdrop-blur-xl bg-background/30' : 'backdrop-blur-none bg-transparent'"
  >
    <div class="max-w-[1280px] mx-auto p-4">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <nuxt-link to="/" class="font-bold transition-colors flex items-center">
          <logo width="50px" height="50px" />
        </nuxt-link>

        <!-- Nav Links -->
        <div class="hidden md:flex items-center justify-center space-x-8">
          <nuxt-link
            v-for="item in links"
            :key="item.name"
            :to="item.path"
            class="relative py-4 transition-colors"
            :class="{
              'text-primary-foreground border-b-[3px] border-primary-foreground font-[700] text-lg': route.path === item.path,
              'hover:text-primary': route.path !== item.path,
            }"
          >
            {{ item.name }}
          </nuxt-link>
        </div>

        <!-- Buttons -->
        <div class="hidden md:flex items-center space-x-5">
          <button
            class="mr-5 hover:text-primary-foreground transition-colors flex items-center"
          >
            <cart-component />
          </button>
          <nuxt-link to="/auth/login">
            <button
              class="px-4 py-2 rounded-full bg-primary text-primary-foreground font-[600] transition-colors flex items-center"
            >
              Login
            </button>
          </nuxt-link>
          <dark-mode-component />
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden flex items-center">
          <Button
            variant="ghost"
            class="px-4 py-2 rounded-full hover:text-primary-foreground transition-colors flex items-center"
          >
          <cart-component />
          </Button>
          <dark-mode-component />
          <mobile-navbar-component />
        </div>
      </nav>
    </div>
  </div>
</template>
