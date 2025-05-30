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
import AreaGraphComponent from "~/components/custom/dashboard/AreaGraphComponent.vue";

const route = useRouter();

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
              <breadcrumb-page>{{
                route.currentRoute.value.name || "Admin Dashboard"
              }}</breadcrumb-page>
            </breadcrumb-item>
          </breadcrumb-list>
        </breadcrumb>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div class="grid auto-rows-min gap-4 md:grid-cols-4">
        <div
          class="apect-video rounded-xl bg-card text-card-foreground shadow space-y-1 border"
        >
          <div
            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h1 class="tracking-tight text-sm font-medium">Total Sales</h1>
          </div>
          <div class="p-6 pt-0">
            <h2 class="text-4xl font-bold text-black">
              $12🥲<span class="text-sm text-black font-light"> /month</span>
            </h2>
          </div>
        </div>
        <div
          class="apect-video rounded-xl bg-card text-card-foreground shadow space-y-1 border"
        >
          <div
            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h1 class="tracking-tight text-sm font-medium">Orders</h1>
          </div>
          <div class="p-6 pt-0">
            <h2 class="text-4xl font-bold text-lime-600">
              2<span class="text-sm text-black font-light"> /month</span>
            </h2>
          </div>
        </div>
        <div
          class="apect-video rounded-xl bg-card text-card-foreground shadow space-y-1 border"
        >
          <div
            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h1 class="tracking-tight text-sm font-medium">Top Product</h1>
          </div>
          <div class="p-6 pt-0">
            <h2 class="text-4xl font-bold text-black">Sweat Pants</h2>
          </div>
        </div>
        <div
          class="apect-video rounded-xl bg-card text-card-foreground shadow space-y-1 border"
        >
          <div
            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h1 class="tracking-tight text-sm font-medium">New Customers</h1>
          </div>
          <div class="p-6 pt-0">
            <h2 class="text-4xl font-bold text-black">
              10<span class="text-sm text-black font-light"> /month</span>
            </h2>
          </div>
        </div>
      </div>
      <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/8 md:min-h-min">
        <div class="grid auto-rows-min gap-4 md:grid-cols-6">
          <div class=" rounded-xl border col-span-3">
            <area-graph-component class="flex-grow"/>
          </div>
          <div class="aspect-video rounded-xl bg-muted/90 col-span-3" > </div>
        </div>
      </div>
    </div>
  </sidebar-inset>
</template>
