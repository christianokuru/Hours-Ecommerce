<script lang="ts">
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full";
</script>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "vue-router";

const router = useRouter();

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <sidebar-inset>
    <header
      class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <sidebar-trigger class="-ml-1 text-red-500" />
        <separator orientation="vertical" class="mr-2 h-4" />
        <breadcrumb>
          <breadcrumb-list>
            <breadcrumb-item class="hidden md:block">
              <breadcrumb-link nuxt-to="/"> Dashboard </breadcrumb-link>
            </breadcrumb-item>
            <breadcrumb-separator class="hidden md:block" />
            <breadcrumb-item>
              <breadcrumb-page>{{ router.currentRoute.value.name || "Admin Dashboard" }}</breadcrumb-page>
            </breadcrumb-item>
          </breadcrumb-list>
        </breadcrumb>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div class="grid auto-rows-min gap-4 md:grid-cols-7">
        <div class="aspect-video rounded-xl bg-muted/90" />
        <div class="aspect-video rounded-xl bg-muted/90" />
        <div class="aspect-video rounded-xl bg-muted/90" />
        <div class="aspect-video rounded-xl bg-muted/90" />
        <div class="aspect-video rounded-xl bg-muted/90" />
        <div class="aspect-video rounded-xl bg-muted/90" />
        <div class="aspect-video rounded-xl bg-muted/90" />
      </div>
      <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/80 md:min-h-min" />
    </div>
  </sidebar-inset>
</template>
