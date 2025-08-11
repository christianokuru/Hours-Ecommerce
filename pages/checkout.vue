<script setup>
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/order';
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';
// Assuming `navigateTo` is available globally in Nuxt
import { navigateTo } from '#app';

// This ref will now be populated by the child component
const formData = ref(null)

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cart || []);
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const discount = computed(() => (subtotal.value > 100 ? 0.1 : 0));
const discountedTotal = computed(() => subtotal.value * (1 - discount.value));

const shippingOptions = [
  { label: 'Standard (3-5 days)', value: 'standard', fee: 8 },
  { label: 'Eco-Friendly (5-8 days)', value: 'eco', fee: 5 },
  { label: 'Express (1-2 days)', value: 'express', fee: 18 },
];
const selectedShipping = ref(shippingOptions[0]);

const total = computed(() => discountedTotal.value);

// This function is now the main entry point for placing an order
function placeOrder() {
  // Check if form data has been received before proceeding
  if (!formData.value || !formData.value.firstName) {
    toast.error('Please fill in your contact information first.');
    return;
  }
  
  // Convert proxies to plain objects
  const cart = Array.isArray(cartItems.value)
    ? cartItems.value.map(item => ({ ...item }))
    : [];
  const shipping = { ...selectedShipping.value };
  
  // Combine form data with other order details
  const payload = {
    ...formData.value,
    cart,
    total: total.value,
    discount: discount.value,
    subtotal: subtotal.value,
    shipping,
  };
  
  useOrderStore().setPayload(payload);
  
  toast.success('Order placed successfully!', {
    description: `Thank you for your purchase, ${formData.value.firstName} ${formData.value.lastName}. Total: $${total.value.toFixed(2)}. Delivery to ${formData.value.address}, ${formData.value.state}, ${formData.value.country}.`,
    duration: 6000,
  });
  
  // Navigate to the next page
  navigateTo('/checkout-summary');
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12 mt-10">

    <!-- Checkout Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Left: Form -->
      <div>
        <h2 class="text-xl font-semibold mb-6">Contact Information</h2>
        <!-- The `@form-submit` event has been replaced with the new `@update:formData` event. -->
        <!-- The `ref` is no longer needed since we are not calling a method on the child. -->
        <CountryStateAddressForm @update:formData="data => formData = data" />


        <p class="text-sm text-gray-500 mt-4 text-center">
          <nuxt-link to="/cart" class="underline hover:text-orange-700">← Return to Cart</nuxt-link>
        </p>
      </div>

      <!-- Right: Order Summary -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow">
        <h2 class="text-lg font-semibold mb-4 text-black">Order Summary</h2>
        
        <!-- Cart Items -->
        <div class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center gap-4"
          >
            <img :src="item.image" alt="" class="w-16 h-16 rounded object-cover border" />
            <div class="flex-1">
              <h3 class="text-sm font-semibold text-black">{{ item.name }}</h3>
              <p class="text-xs text-gray-500">
                Size: {{ item.selectedSize }} |
                Qty: {{ item.quantity }}
              </p>
            </div>
            <div class="font-bold text-sm text-gray-800">${{ item.price.toFixed(2) }}</div>
          </div>
        </div>

        <!-- Pricing Details -->
        <div class="border-t mt-6 pt-4 space-y-2 text-sm">
          <div class="flex justify-between text-black">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div v-if="discount > 0" class="flex justify-between text-green-600">
            <span>Discount (10%)</span>
            <span>- ${{ (subtotal * discount).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-semibold text-lg pt-2 border-t text-black">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Shipping Options -->
        <div class="mt-6 text-black">
          <label class="block font-medium mb-2">Shipping Options</label>
          <div class="space-y-2">
            <label
              v-for="option in shippingOptions"
              :key="option.value"
              class="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                v-model="selectedShipping"
                :value="option"
                class="accent-orange-600"
              />
              {{ option.label }} 
            </label>
          </div>
        </div>

        <!-- Place Order -->
        <button
          class="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-full text-lg font-bold shadow transition"
          @click="placeOrder"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.step {
  @apply w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 text-sm font-bold text-white;
}
.step.active {
  @apply bg-orange-600;
}
.line {
  @apply w-6 h-0.5 bg-gray-300;
}
</style>
