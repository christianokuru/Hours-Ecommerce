<script setup>
import { useOrderStore } from '@/stores/order';

const orderStore = useOrderStore();
const payload = orderStore.payload;
</script>

<template>
  <div class="max-w-3xl mx-auto my-12 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
    <h1 class="text-3xl font-bold mb-8 text-center text-orange-700">Checkout Summary</h1>
    <div v-if="payload">
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Contact & Shipping</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Name:</strong> {{ payload.firstName }} {{ payload.lastName }}</div>
          <div><strong>Email:</strong> {{ payload.email }}</div>
          <div><strong>Phone:</strong> {{ payload.phone }}</div>
          <div><strong>Country:</strong> {{ payload.country }}</div>
          <div><strong>State:</strong> {{ payload.state }}</div>
          <div class="md:col-span-2"><strong>Address:</strong> {{ payload.address }}</div>
          <div class="md:col-span-2"><strong>Shipping:</strong> {{ payload.shipping.label }} (Fee: ${{ payload.shipping.fee }})</div>
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Order Items</h2>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="item in payload.cart" :key="item.id + '-' + item.selectedColor + '-' + item.selectedSize" class="flex items-center py-4 gap-6">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover border border-gray-200" />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
              <div class="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                <span>Size: <span class="font-medium">{{ item.selectedSize }}</span></span>
                <span v-if="item.selectedColor">Color: <span class="inline-block w-4 h-4 rounded-full align-middle border ml-1" :style="{ backgroundColor: item.selectedColor }"></span> <span class="ml-1">{{ item.selectedColor }}</span></span>
                <span>Qty: <span class="font-medium">{{ item.quantity }}</span></span>
              </div>
              <div class="mt-2 text-orange-700 font-bold">${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
            <div class="text-lg font-bold text-orange-900">${{ item.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col gap-3 shadow">
        <div class="flex justify-between text-lg">
          <span class="font-semibold text-gray-700 dark:text-gray-200">Subtotal:</span>
          <span class="font-bold text-orange-900">${{ payload.subtotal.toFixed(2) }}</span>
        </div>
        <div v-if="payload.discount > 0" class="flex justify-between text-lg text-green-600">
          <span>Discount ({{ (payload.discount * 100).toFixed(0) }}%):</span>
          <span>- ${{ (payload.subtotal * payload.discount).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-lg">
          <span class="font-semibold text-gray-700 dark:text-gray-200">Delivery Fee:</span>
          <span class="font-bold text-orange-900">${{ payload.shipping.fee.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-2xl mt-2">
          <span class="font-bold text-orange-700">Total:</span>
          <span class="font-extrabold text-orange-900">${{ payload.total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400 text-xl">
      <p>No order data found. <nuxt-link to="/products" class="text-orange-700 underline">Shop now</nuxt-link></p>
    </div>
  </div>
</template>