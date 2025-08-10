<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import Cart from "@/assets/icons/cart.vue";
import DarkModeComponent from "@/components/custom/website/DarkModeComponent.vue";
import MobileNavbarComponent from "@/components/custom/website/MobileNavbarComponent.vue";
import CartComponent from "@/components/custom/website/CartComponent.vue";
import { links } from "@/lib/navlinks.js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/icons/logo.vue";

const route = useRoute();
const cartStore = useCartStore();
const isScrolled = ref(false);
const isHovering = ref(false);
const activeDropdown = ref(null);

// Enhanced scroll behavior
const handleScroll = () => {
  const scrollY = window.scrollY;
  isScrolled.value = scrollY > 20;
};

// Cart items count for badge
const cartItemsCount = computed(() => cartStore.totalItems);

// Check if user is authenticated (you can replace this with actual auth logic)
const isAuthenticated = ref(false);

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  activeDropdown.value = null;
};

const setActiveDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  // Check authentication status
  // isAuthenticated.value = checkAuthStatus()
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out"
    :class="[
      isScrolled || isHovering
        ? 'backdrop-blur-xl bg-background/95 border-b border-border/50 shadow-lg'
        : 'backdrop-blur-md bg-white/10 dark:bg-black/10 shadow-sm',
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Top announcement bar (optional) -->
    <div
      v-if="!isScrolled"
      class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium transition-all duration-500"
    >
      <p class="animate-pulse">
        🎉 Free shipping on orders over $50! Limited time offer.
      </p>
    </div>

    <div
      class="max-w-7xl mx-auto px-4 lg:px-6 sticky top-0 z-40 backdrop-blur-sm bg-white/15 dark:bg-gray-800/95"
    >
      <nav class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo Section -->
        <nuxt-link
          to="/"
          class="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
        >
          <div class="relative">
            <logo
              width="45px"
              height="45px"
              class="transition-all duration-300 group-hover:rotate-12"
            />
            <!-- Logo glow effect -->
            <div
              class="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            />
          </div>
          <span
            class="font-bold text-xl text-gray-800 dark:text-white bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hidden sm:block"
          >
            Hours Collection
          </span>
        </nuxt-link>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex items-center space-x-1">
          <nuxt-link
            v-for="item in links"
            :key="item.name"
            :to="item.path"
            class="relative px-4 py-2 rounded-lg transition-all duration-300 group"
            :class="{
              'bg-primary/20 text-primary font-semibold shadow-sm':
                route.path === item.path,
              'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-white/20 dark:hover:bg-black/20':
                route.path !== item.path,
            }"
          >
            <span class="relative z-10 font-medium">{{ item.name }}</span>

            <!-- Active indicator -->
            <div
              v-if="route.path === item.path"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
            />

            <!-- Hover effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
              :class="{ 'opacity-0': route.path === item.path }"
            />
          </nuxt-link>
        </div>

        <!-- Desktop Action Buttons -->
        <div class="hidden lg:flex items-center space-x-3">
          <!-- Cart Button with Badge -->
          <div class="relative">
            <cart-component />
          </div>

          <!-- Wishlist Button -->
          <button
            class="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors duration-200 group relative"
          >
            <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <!-- Auth Button -->
          <nuxt-link v-if="!isAuthenticated" to="/auth/login">
            <button
              class="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          </nuxt-link>

          <!-- User Profile (when authenticated) -->
          <div v-else class="relative">
            <button
              @click="setActiveDropdown('profile')"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors duration-200"
            >
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              >
                JD
              </div>
              <svg
                class="w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === 'profile' }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Profile Dropdown -->
            <div
              v-if="activeDropdown === 'profile'"
              class="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-xl py-2 animate-in slide-in-from-top-2 duration-200"
            >
              <nuxt-link
                to="/dashboard/users/profile"
                class="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                >Profile</nuxt-link
              >
              <nuxt-link
                to="/dashboard/users/orders"
                class="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                >Orders</nuxt-link
              >
              <nuxt-link
                to="/dashboard/users/settings"
                class="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                >Settings</nuxt-link
              >
              <hr class="my-2 border-border" />
              <button
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <dark-mode-component />
        </div>

        <!-- Mobile Menu Section -->
        <div class="lg:hidden flex items-center space-x-2">
          <!-- Mobile Cart -->
          <div class="relative">
            <button
              class="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors duration-200"
            >
              <cart-component />
            </button>
          </div>

          <!-- Dark Mode Toggle -->
          <dark-mode-component />

          <!-- Mobile Menu Toggle -->
          <mobile-navbar-component />
        </div>
      </nav>
    </div>

    <!-- Progress Bar for Scroll -->
    <div
      v-if="isScrolled"
      class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
      :style="{
        width: `${Math.min(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100,
          100
        )}%`,
      }"
    />
  </header>
</template>
