<script setup lang="ts">
import AppSidebar from "~/components/custom/dashboard/AppSidebar.vue";
import { SidebarProvider } from "@/components/ui/sidebar";
</script>

<template>
  <!-- the sidebarprovider must only be in this layout file -->
  <sidebar-provider>
    <div class="flex h-screen w-full">
      <app-sidebar />
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </sidebar-provider>
</template>
