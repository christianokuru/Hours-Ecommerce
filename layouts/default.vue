<script setup lang="ts">
import NavbarComponent from "~/components/custom/website/NavbarComponent.vue";
import FooterComponent from "~/components/custom/website/FooterComponent.vue";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

const { progress, isLoading, error, start, finish, clear } =
  useLoadingIndicator({
    throttle: 900,
    duration: 1000,
  });
</script>

<template>
  <NuxtLoadingIndicator color="orange" />
  <div>
    <Toaster :position="'bottom-right'" :rich-colors="true" />
    <NavbarComponent />
    <NuxtPage />
    <FooterComponent />
  </div>
</template>
