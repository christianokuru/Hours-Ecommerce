<script setup lang="ts">
import NavbarComponent from "~/components/custom/website/NavbarComponent.vue";
import FooterComponent from "~/components/custom/website/FooterComponent.vue";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div>
    <Toaster :position="'bottom-right'" :rich-colors="true" />
    <NavbarComponent />
    <NuxtPage />
    <FooterComponent />
  </div>
</template>
