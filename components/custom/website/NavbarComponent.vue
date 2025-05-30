<script setup>
import { useRoute } from "vue-router";
import Cart from "@/assets/icons/cart.vue";
import DarkModeComponent from "@/components/custom/website/DarkModeComponent.vue";
import MobileNavbarComponent from "@/components/custom/website/MobileNavbarComponent.vue";
import logo from "@/assets/icons/logo.vue";

const route = useRoute();

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];
</script>

<template>
  <div id="webcrumbs" class="bg-background border-b">
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
            class="relative group py-2 transition-colors"
            :class="{
              'text-primary font-[600]': route.path === item.path,
              'hover:text-primary': route.path !== item.path,
            }"
          >
            {{ item.name }}
          </nuxt-link>
        </div>

        <!-- Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            class="px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex items-center"
          >
            <Cart />
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
            <Cart width="20px" height="20px" />
          </Button>
          <dark-mode-component />
          <mobile-navbar-component />
        </div>
      </nav>
    </div>
  </div>
</template>
