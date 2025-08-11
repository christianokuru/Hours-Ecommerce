<script setup lang="ts">
import NavbarComponent from "~/components/custom/website/NavbarComponent.vue";
import FooterComponent from "~/components/custom/website/FooterComponent.vue";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <NuxtLoadingIndicator color="orange" />
  <div>
    <Toaster :position="'bottom-right'" :rich-colors="true" />
    <NavbarComponent />

    <!-- Apply padding-top only if NOT home page -->
    <main :class="{ 'pt-20': route.path !== '/' }">
      <NuxtPage />
    </main>

    <FooterComponent />
  </div>
</template>
