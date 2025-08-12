<script lang="ts">
export const description =
  "A stylish ecommerce user dashboard with stats, orders, cart, and wishlist.";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserDashboardSidebarComponent from "~/components/custom/dashboard/UserDashboardSidebarComponent.vue";
import DarkModeComponent from "@/components/custom/website/DarkModeComponent.vue";
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Heart, 
  DollarSign, 
  Eye,
  Package,
  Truck,
  CheckCircle
} from "lucide-vue-next";

definePageMeta({
  layout: false
})

const cartStore = useCartStore();

// Define the type for cart items if not already defined
type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

// Tell TypeScript the type of cartStore.cart
const cart = cartStore.cart as CartItem[];

const total = computed(() =>
  cart.reduce((sum, item) => sum + item.quantity, 0)
);

// Sample data for demonstration
const recentOrders = [
  {
    id: '#ORD-2024-001',
    date: '2024-12-10',
    status: 'delivered',
    total: 159.99,
    items: 3
  },
  {
    id: '#ORD-2024-002',
    date: '2024-12-08',
    status: 'processing',
    total: 89.50,
    items: 2
  },
  {
    id: '#ORD-2024-003',
    date: '2024-12-05',
    status: 'shipped',
    total: 245.00,
    items: 4
  },
  {
    id: '#ORD-2024-004',
    date: '2024-12-02',
    status: 'delivered',
    total: 75.99,
    items: 1
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return CheckCircle;
    case 'shipped': return Truck;
    case 'processing': return Package;
    default: return Package;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
    case 'processing': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
  }
};

const wishlistItems = [
  {
    id: 1,
    name: 'Minimalist Hoodie',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Cotton Polo Shirt',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Comfort Joggers',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop'
  }
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
    <sidebar-provider>
      <user-dashboard-sidebar-component />
      <sidebar-inset>
        <!-- Enhanced Header -->
        <header class="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="flex h-16 items-center gap-4 px-6">
            <sidebar-trigger class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" />
            <separator orientation="vertical" class="h-6 bg-slate-200 dark:bg-slate-700" />
            <breadcrumb>
              <breadcrumb-list>
                <breadcrumb-item class="hidden md:block">
                  <breadcrumb-link href="#" class="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    User Dashboard
                  </breadcrumb-link>
                </breadcrumb-item>
                <breadcrumb-separator class="hidden md:block text-slate-400" />
                <breadcrumb-item>
                  <breadcrumb-page class="text-slate-900 dark:text-white font-medium">
                    Overview
                  </breadcrumb-page>
                </breadcrumb-item>
              </breadcrumb-list>
            </breadcrumb>
            
            <!-- User Greeting -->
            <div class="ml-auto hidden sm:flex items-center gap-3">
              <div class="flex items-center space-x-4 text-right">
                <div>
                  <dark-mode-component />
                </div>
               <div class="flex flex-col">
                <p class="text-sm font-medium text-slate-900 dark:text-white">Welcome back!</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Monday, Dec 12, 2024</p>
               </div>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <div class="flex-1 p-6 space-y-8">
          <!-- Quick Navigation Section -->
          <div class="sticky top-16 z-40 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200/60 dark:border-blue-800/60 dark:backdrop-blur-2xl">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to Shop?</h2>
                <p class="text-slate-600 dark:text-slate-300">Discover new arrivals and trending styles</p>
              </div>
              
              <div class="flex flex-wrap gap-4">
                <nuxt-link to="/products">
                  <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                    <shopping-bag class="w-5 h-5" />
                    Continue Shopping
                  </button>
                </nuxt-link>
                
                <div class="relative group">
                  <button class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                    Browse Categories
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div class="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div class="py-2">
                      <nuxt-link to="/products?category=hoodies" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Hoodies & Sweatshirts
                      </nuxt-link>
                      <nuxt-link to="/products?category=t-shirts" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        T-Shirts & Tops
                      </nuxt-link>
                      <nuxt-link to="/products?category=pants" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Pants & Joggers
                      </nuxt-link>
                      <nuxt-link to="/products?category=accessories" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Accessories
                      </nuxt-link>
                      <div class="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
                        <nuxt-link to="/products" class="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">
                          View All Products
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  New Arrivals
                </button>
              </div>
            </div>
          </div>
          <!-- Stats Cards with Enhanced Design -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-900/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div class="flex items-center justify-between relative">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Orders</p>
                  <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">152</p>
                  <p class="text-xs text-green-600 dark:text-green-400 mt-1">+12% from last month</p>
                </div>
                <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                  <shopping-bag class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-900/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div class="flex items-center justify-between relative">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Cart Items</p>
                  <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">{{ total }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Ready to checkout</p>
                </div>
                <div class="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25">
                  <shopping-cart class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-900/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div class="flex items-center justify-between relative">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Wishlist</p>
                  <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">{{ wishlistItems.length }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Saved for later</p>
                </div>
                <div class="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg shadow-pink-500/25">
                  <heart class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-900/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div class="flex items-center justify-between relative">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Spent</p>
                  <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">$3,240</p>
                  <p class="text-xs text-green-600 dark:text-green-400 mt-1">Lifetime value</p>
                </div>
                <div class="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/25">
                  <dollar-sign class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <!-- Recent Orders - Takes 2/3 of the width -->
            <div class="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
              <div class="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Recent Orders</h3>
                  <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                    View All
                  </button>
                </div>
              </div>
              
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-slate-200/60 dark:border-slate-700/60">
                      <th class="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">Order</th>
                      <th class="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">Date</th>
                      <th class="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">Status</th>
                      <th class="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">Items</th>
                      <th class="text-left py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">Total</th>
                      <th class="text-center py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="order in recentOrders"
                      :key="order.id"
                      class="border-b border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td class="py-4 px-6">
                        <div class="font-medium text-slate-900 dark:text-white">{{ order.id }}</div>
                      </td>
                      <td class="py-4 px-6">
                        <div class="text-sm text-slate-600 dark:text-slate-300">{{ new Date(order.date).toLocaleDateString() }}</div>
                      </td>
                      <td class="py-4 px-6">
                        <badge :class="getStatusColor(order.status)" class="capitalize border">
                          <component :is="getStatusIcon(order.status)" class="w-3 h-3 mr-1.5" />
                          {{ order.status }}
                        </badge>
                      </td>
                      <td class="py-4 px-6">
                        <div class="text-sm text-slate-600 dark:text-slate-300">{{ order.items }} items</div>
                      </td>
                      <td class="py-4 px-6">
                        <div class="font-semibold text-slate-900 dark:text-white">${{ order.total.toFixed(2) }}</div>
                      </td>
                      <td class="py-4 px-6 text-center">
                        <button class="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                          <eye class="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Cart Preview - Takes 1/3 of the width -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60">
              <div class="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Shopping Cart</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ total }} items in cart</p>
              </div>
              
              <div class="p-6 space-y-4 max-h-80 overflow-y-auto">
                <div
                  v-if="cart.length === 0"
                  class="text-center py-8 text-slate-500 dark:text-slate-400"
                >
                  <shopping-cart class="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p class="text-sm">Your cart is empty</p>
                </div>
                
                <div
                  v-for="item in cart"
                  :key="item.id + '-' + (item.selectedColor || '') + '-' + (item.selectedSize || '')"
                  class="flex items-start gap-3 p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl"
                >
                  <div class="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center">
                    <shopping-bag class="w-6 h-6 text-slate-500 dark:text-slate-400" />
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-slate-900 dark:text-white text-sm truncate">{{ item.name }}</h4>
                    <div class="flex items-center gap-2 mt-1">
                      <span v-if="item.selectedColor" class="text-xs text-slate-500 dark:text-slate-400">{{ item.selectedColor }}</span>
                      <span v-if="item.selectedSize" class="text-xs text-slate-500 dark:text-slate-400">{{ item.selectedSize }}</span>
                      <span class="text-xs text-slate-500 dark:text-slate-400">Qty: {{ item.quantity }}</span>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                      <span class="text-sm font-semibold text-slate-900 dark:text-white">${{ item.price.toFixed(2) }}</span>
                      <span class="text-xs text-slate-500 dark:text-slate-400">${{ cartStore.getItemSubtotal(item).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="cart.length > 0" class="p-6 border-t border-slate-200/60 dark:border-slate-700/60 bg-slate-50/30 dark:bg-slate-800/30">
                <div class="flex justify-between items-center mb-4">
                  <span class="font-semibold text-slate-900 dark:text-white">Total:</span>
                  <span class="text-xl font-bold text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <button class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98]">
                  Checkout Now
                </button>
              </div>
            </div>
          </div>

          <!-- Wishlist Section -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            <div class="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Wishlist</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Items you've saved for later</p>
                </div>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                  View All
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  v-for="item in wishlistItems"
                  :key="item.id"
                  class="group bg-slate-50/50 dark:bg-slate-800/30 rounded-xl p-4 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div class="aspect-square mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 class="font-medium text-slate-900 dark:text-white text-sm mb-1 truncate">{{ item.name }}</h4>
                  <p class="text-lg font-bold text-slate-900 dark:text-white">${{ item.price.toFixed(2) }}</p>
                  <button class="w-full mt-3 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-slate-900 text-sm font-medium py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </sidebar-inset>
    </sidebar-provider>
  </div>
</template>