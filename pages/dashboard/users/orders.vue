<script lang="ts">
export const description = 'A stylish ecommerce user dashboard with stats, orders, cart, and wishlist.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>
<script setup lang="ts">
import { ref } from 'vue'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import UserDashboardSidebarComponent from '~/components/custom/dashboard/UserDashboardSidebarComponent.vue'

definePageMeta({
  layout: false
})

const orders = ref([
  {
    id: '#12345',
    date: '2024-06-01',
    status: 'Delivered',
    total: '$120.00',
    items: 3
  },
  {
    id: '#12344',
    date: '2024-05-28',
    status: 'Processing',
    total: '$89.99',
    items: 2
  },
  {
    id: '#12343',
    date: '2024-05-20',
    status: 'Cancelled',
    total: '$45.50',
    items: 1
  }
])

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700'
}
</script>

<template>
   <SidebarProvider>
    <UserDashboardSidebarComponent />
    <SidebarInset>
      <!-- HEADER -->
      <header class="flex h-16 items-center gap-2 mt-6 px-4 bg-white dark:bg-gray-900 shadow rounded-lg">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mx-2 h-5" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
  <div class="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen mt-3">
      <!-- PAGE HEADER -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold dark:text-white">My Orders</h1>
        <div class="flex gap-3">
          <input type="text" placeholder="Search orders..." class="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700" />
          <select class="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700">
            <option>Status: All</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>
          <input type="date" class="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700" />
        </div>
      </div>

      <!-- ORDERS TABLE -->
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th class="py-3 px-4 text-left">Order #</th>
              <th class="py-3 px-4 text-left">Date</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-left">Items</th>
              <th class="py-3 px-4 text-left">Total</th>
              <th class="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <td class="py-3 px-4 font-medium dark:text-white">{{ order.id }}</td>
              <td class="py-3 px-4 dark:text-gray-200">{{ order.date }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 text-xs font-semibold rounded-full',
                  order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                  order.status === 'Processing' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' :
                  order.status === 'Cancelled' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                  '']">
                  {{ order.status }}
                </span>
              </td>
              <td class="py-3 px-4 dark:text-gray-200">{{ order.items }}</td>
              <td class="py-3 px-4 font-medium dark:text-white">{{ order.total }}</td>
              <td class="py-3 px-4 flex gap-2">
                <button class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition">View</button>
                <button class="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition">Track</button>
                <button class="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">Reorder</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </SidebarInset>
  </SidebarProvider>
</template>
