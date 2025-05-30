<script setup>
import { useRoute } from "vue-router";
import Cart from "@/assets/icons/cart.vue";
import Hamburger from "@/assets/icons/Hamburger.vue";
import DarkModeComponent from "@/components/custom/website/DarkModeComponent.vue";
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
        <details class="md:hidden relative">
          <summary class="list-none focus:outline-none">
            <button
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Hamburger />
            </button>
          </summary>
          <div
            class="absolute right-0 mt-2 w-48 bg-white rounded-md border py-2 z-10"
          >
            <nuxt-link
              v-for="item in links"
              :key="item.name + '-mobile'"
              :to="item.path"
              class="block px-4 py-2 hover:bg-gray-100"
            >
              {{ item.name }}
            </nuxt-link>
            <hr class="my-2 border-gray-200" />
            <nuxt-link
              to="/auth/login"
              class="block px-4 py-2 hover:bg-gray-100"
              >Login</nuxt-link
            >
            <nuxt-link
              to="/auth/registeration"
              class="block px-4 py-2 text-primary-500 font-medium hover:bg-gray-100"
              >Sign Up</nuxt-link
            >
          </div>
        </details>
      </nav>

      <!-- Mobile Bottom Buttons -->
      <div class="mt-4 md:hidden flex justify-center space-x-4">
        <nuxt-link
          to="/login"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center"
        >
          <Icon name="lucide:user" class="w-5 h-5 mr-1" />
          Login
        </nuxt-link>
        <nuxt-link
          to="/signup"
          class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
        >
          Sign Up
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
