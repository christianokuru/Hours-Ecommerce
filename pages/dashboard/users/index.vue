<script lang="ts">
export const description = 'A stylish ecommerce user dashboard with stats, orders, cart, and wishlist.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
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
import { computed } from 'vue'

import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()

// Define the type for cart items if not already defined
type CartItem = {
  id: string | number
  name: string
  price: number
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

// Tell TypeScript the type of cartStore.cart
const cart = cartStore.cart as CartItem[]


const total = computed(() =>
  cart.reduce((sum, item) => sum + item.quantity, 0)
)
</script>

<template>
  <SidebarProvider>
    <UserDashboardSidebarComponent />
    <SidebarInset>
      <!-- HEADER -->
  <header class="flex h-16 items-center gap-2 mt-4 px-4 bg-white dark:bg-gray-900 shadow rounded-lg">
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

      <!-- CONTENT -->
  <div class="flex flex-1 flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">

        <!-- STATS CARDS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-500 dark:text-gray-300 text-sm">Total Orders</h3>
            <p class="text-2xl font-bold mt-2 dark:text-white">152</p>
          </div>
          <div class="bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-500 dark:text-gray-300 text-sm">Cart Items</h3>
            <p class="text-2xl font-bold mt-2 dark:text-white">{{ total }}</p>
          </div>
          <div class="bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-500 dark:text-gray-300 text-sm">Wishlist</h3>
            <p class="text-2xl font-bold mt-2 dark:text-white">12</p>
          </div>
          <div class="bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-gray-500 dark:text-gray-300 text-sm">Total Spent</h3>
            <p class="text-2xl font-bold mt-2 dark:text-white">$3,240.50</p>
          </div>
        </div>

        <!-- GRID LAYOUT: Orders Table + Cart + Wishlist -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- RECENT ORDERS -->
          <div class="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 dark:text-white">Recent Orders</h3>
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
                  <th class="py-2">Order #</th>
                  <th class="py-2">Date</th>
                  <th class="py-2">Status</th>
                  <th class="py-2">Total</th>
                  <th class="py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="py-2">#12345</td>
                  <td class="py-2">2024-06-01</td>
                  <td class="py-2"><span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">Delivered</span></td>
                  <td class="py-2">$120.00</td>
                  <td class="py-2"><a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">View</a></td>
                </tr>
                <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="py-2">#12344</td>
                  <td class="py-2">2024-05-28</td>
                  <td class="py-2"><span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded">Processing</span></td>
                  <td class="py-2">$89.99</td>
                  <td class="py-2"><a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">View</a></td>
                </tr>
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="py-2">#12343</td>
                  <td class="py-2">2024-05-20</td>
                  <td class="py-2"><span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">Shipped</span></td>
                  <td class="py-2">$59.99</td>
                  <td class="py-2"><a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">View</a></td>
                </tr>
              </tbody>
            </table>
          </div>

            <!-- CART PREVIEW -->
            
            <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4 dark:text-white">Cart</h3>
              <ul class="space-y-3">
                <li
                  v-for="item in cart"
                  :key="item.id + '-' + (item.selectedColor || '') + '-' + (item.selectedSize || '')"
                  class="flex flex-col border-b pb-2 last:border-b-0 last:pb-0 dark:border-gray-700"
                >
                  <div class="flex justify-between items-center">
                    <span class="dark:text-white">{{ item.name }}</span>
                    <span class="font-medium dark:text-gray-200">${{ item.price.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span v-if="item.selectedColor">Color: {{ item.selectedColor }}</span>
                    <span v-if="item.selectedSize">Size: {{ item.selectedSize }}</span>
                    <span>Qty: {{ item.quantity }}</span>
                    <span>Subtotal: ${{ cartStore.getItemSubtotal(item).toFixed(2) }}</span>
                  </div>
                </li>
              </ul>
              <div class="flex justify-between items-center mt-4">
                <span class="font-semibold dark:text-white">Total:</span>
                <span class="font-bold text-lg dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <button class="w-full mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition">Go to Cart</button>
            </div>

        </div>

        <!-- WISHLIST -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">Wishlist</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex flex-col items-center">
              <img src="https://via.placeholder.com/80" alt="Product" class="mb-2 rounded">
              <p class="text-sm font-medium dark:text-white">Bluetooth Speaker</p>
              <span class="text-gray-500 dark:text-gray-300 text-sm">$45.99</span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex flex-col items-center">
              <img src="https://via.placeholder.com/80" alt="Product" class="mb-2 rounded">
              <p class="text-sm font-medium dark:text-white">Smart Lamp</p>
              <span class="text-gray-500 dark:text-gray-300 text-sm">$25.00</span>
            </div>
          </div>
        </div>

      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
