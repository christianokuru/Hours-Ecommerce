<script setup>
import { useOrderStore } from '@/stores/order';

const orderStore = useOrderStore();
const payload = orderStore.payload;
</script>

<template>
  <div class="max-w-6xl mx-auto my-12 p-4 md:p-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Order</h1>
      <div v-if="payload">
        <div class="text-gray-700 dark:text-gray-200 mb-1 text-base md:text-lg">
          <span class="font-semibold">Order ID :</span>
          <span class="ml-2">{{ payload.orderId || 'N/A' }}</span>
        </div>
        <div class="text-gray-500 dark:text-gray-400 mb-4">Thank you. Your order has been Confirmed.</div>
      </div>
    </div>
    <div v-if="payload" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left: Items & Summary -->
      <div class="md:col-span-2 flex flex-col gap-6">
        <!-- Items -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div v-for="item in payload.cart" :key="item.id + '-' + item.selectedColor + '-' + item.selectedSize" class="flex items-center gap-6 mb-6 last:mb-0">
            <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded-lg object-cover border border-gray-200" />
            <div class="flex-1">
              <div class="text-base font-semibold text-gray-900 dark:text-white">{{ item.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Color : <span class="inline-block w-4 h-4 rounded-full align-middle border ml-1" :style="{ backgroundColor: item.selectedColor }"></span> <span class="ml-1 font-medium">{{ item.selectedColor }}</span></div>
            </div>
            <div class="text-lg font-bold text-gray-900 dark:text-white">${{ item.price.toFixed(2) }}</div>
          </div>
        </div>
        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="font-semibold text-lg text-gray-900 dark:text-white">Order Summary</div>
            <button class="text-gray-400 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></button>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-gray-700 dark:text-gray-200"><span>Subtotal</span><span>${{ payload.subtotal.toFixed(2) }}</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200"><span>Shipping Charge</span><span>${{ payload.shipping.fee.toFixed(2) }}</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200"><span>Taxes</span><span>${{ (payload.taxes || 0).toFixed(2) }}</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200"><span>Discount</span><span>${{ (payload.subtotal * (payload.discount || 0)).toFixed(2) }}</span></div>
          </div>
          <div class="flex justify-between font-bold text-lg mt-4 text-gray-900 dark:text-white"><span>Total</span><span>${{ payload.total.toFixed(2) }}</span></div>
        </div>
      </div>
      <!-- Right: Customer & Address -->
      <div class="flex flex-col gap-6">
        <!-- Customer -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold">Customer</div>
            <button class="text-gray-400 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg></button>
          </div>
          <div class="text-gray-900 dark:text-white font-medium">{{ payload.firstName }} {{ payload.lastName }}</div>
          <div class="text-gray-500 dark:text-gray-400 text-sm mt-1">1 Order</div>
        </div>
        <!-- Customer Information -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold">Customer Information</div>
            <button class="text-gray-400 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01" /></svg></button>
          </div>
          <div class="text-gray-900 dark:text-white">{{ payload.email }}</div>
          <div class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ payload.phone }}</div>
        </div>
        <!-- Shipping Address -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold">Shipping Address</div>
            <button class="text-gray-400 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01" /></svg></button>
          </div>
          <div class="text-gray-900 dark:text-white">{{ payload.firstName }} {{ payload.lastName }}</div>
          <div class="text-gray-500 dark:text-gray-400 text-sm">{{ payload.address }}</div>
          <div class="text-gray-500 dark:text-gray-400 text-sm">{{ payload.state }}, {{ payload.country }}</div>
          <div class="mt-2">
            <a href="#" class="text-indigo-600 dark:text-indigo-400 text-sm underline">select on map</a>
          </div>
        </div>
        <!-- Billing Address -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold">Billing Address</div>
            <button class="text-gray-400 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01" /></svg></button>
          </div>
          <div class="text-gray-900 dark:text-white">Same as shipping address</div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400 text-xl">
      <p>No order data found. <nuxt-link to="/products" class="text-orange-700 underline">Shop now</nuxt-link></p>
    </div>
  </div>
</template>