<script setup>
import { useCartStore } from '@/stores/cart';
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cart || []);
const subtotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
const discount = computed(() => (subtotal.value > 100 ? 0.1 : 0));
const discountedTotal = computed(() => subtotal.value * (1 - discount.value));

const shippingOptions = [
  { label: 'Standard (3-5 days)', value: 'standard', fee: 8 },
  { label: 'Eco-Friendly (5-8 days)', value: 'eco', fee: 5 },
  { label: 'Express (1-2 days)', value: 'express', fee: 18 },
];
const selectedShipping = ref(shippingOptions[0]);

const deliveryFee = computed(() => selectedShipping.value.fee);
const total = computed(() => discountedTotal.value + deliveryFee.value);

function placeOrder() {
  toast.success('Order placed successfully!', {
    description: `Thank you for your purchase. Your total is $${total.value.toFixed(2)}.`
  });
}
</script>

<template>
  <div class="max-w-4xl mx-auto my-12 p-8 bg-white dark:bg-black rounded-2xl shadow-2xl mt-[5rem]">
    <h1 class="text-3xl font-bold mb-8 text-center text-orange-700">Checkout</h1>

    <div v-if="cartItems.length > 0">
      <div class="divide-y divide-gray-200 dark:divide-gray-700 mb-8">
        <div
          v-for="item in cartItems"
          :key="item.id + '-' + item.selectedColor + '-' + item.selectedSize"
          class="flex items-center py-6 gap-6"
        >
          <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded-lg object-cover border border-gray-200" />
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.name }}</h2>
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

      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col gap-3 shadow mb-8">
        <div class="flex justify-between text-lg">
          <span class="font-semibold text-gray-700 dark:text-gray-200">Subtotal:</span>
          <span class="font-bold text-orange-900">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div v-if="discount > 0" class="flex justify-between text-lg text-green-600">
          <span>Discount (10%):</span>
          <span>- ${{ (subtotal * discount).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-lg">
          <span class="font-semibold text-gray-700 dark:text-gray-200">Delivery Fee:</span>
          <span class="font-bold text-orange-900">${{ deliveryFee.toFixed(2) }}</span>
        </div>
        <div class="flex flex-col gap-2 mt-2">
          <label class="font-semibold text-gray-700 dark:text-gray-200 mb-1">Shipping Options:</label>
          <div class="flex gap-4">
            <label v-for="option in shippingOptions" :key="option.value" class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                :value="option"
                v-model="selectedShipping"
                class="accent-orange-700"
              />
              <span>{{ option.label }} <span class="text-xs text-gray-500">(${{ option.fee }})</span></span>
            </label>
          </div>
        </div>
        <div class="flex justify-between text-2xl mt-4">
          <span class="font-bold text-orange-700">Total:</span>
          <span class="font-extrabold text-orange-900">${{ total.toFixed(2) }}</span>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          class="px-8 py-3 bg-orange-700 hover:bg-orange-600 text-white font-bold rounded-full text-lg shadow-lg transition"
          @click="placeOrder"
        >
          Place Order
        </button>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400 text-xl">
      <p>Your cart is empty. <nuxt-link to="/products" class="text-orange-700 underline">Shop now</nuxt-link></p>
    </div>
  </div>
</template>