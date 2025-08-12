<script setup>
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/order';
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';
import { navigateTo } from '#app';

const formData = ref(null)

const cartStore = useCartStore();
const orderStore = useOrderStore();

const cartItems = computed(() => cartStore.cart || []);
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const discount = computed(() => (subtotal.value > 100 ? 0.1 : 0));
const total = computed(() => subtotal.value * (1 - discount.value));

const shippingOptions = [
  { label: 'Standard (3-5 days)', value: 'standard', fee: 8 },
  { label: 'Eco-Friendly (5-8 days)', value: 'eco', fee: 5 },
  { label: 'Express (1-2 days)', value: 'express', fee: 18 },
];
const selectedShipping = ref(shippingOptions[0]);

function placeOrder() {
  if (!formData.value || !formData.value.firstName) {
    toast.error('Please fill in your contact information first.');
    return;
  }
  
  const cart = Array.isArray(cartItems.value)
    ? cartItems.value.map(item => ({ ...item }))
    : [];
  const shipping = { ...selectedShipping.value };
  
  const payload = {
    ...formData.value,
    cart,
    total: total.value,
    discount: discount.value,
    subtotal: subtotal.value,
    shipping,
  };
  
  orderStore.setPayload(payload);
  
  toast.success('Order placed successfully!', {
    description: `Thank you for your purchase, ${formData.value.firstName} ${formData.value.lastName}. Total: $${total.value.toFixed(2)}`,
    duration: 5000,
  });
  
  navigateTo('/checkout-summary');
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-foreground mb-2">Checkout</h1>
        <p class="text-muted-foreground">Complete your order below</p>
      </div>

      <!-- Main Checkout Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Left: Contact Information Form -->
        <div class="space-y-6">
          <div class="bg-card border rounded-lg p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
            <country-state-address-form @update:formData="data => formData = data" />
          </div>

          <!-- Shipping Options -->
          <div class="bg-card border rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-foreground mb-4">Shipping Options</h3>
            <div class="space-y-3">
              <label
                v-for="option in shippingOptions"
                :key="option.value"
                class="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                :class="{ 'border-primary bg-primary/5': selectedShipping.value === option.value }"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    v-model="selectedShipping"
                    :value="option"
                    class="text-primary focus:ring-primary"
                  />
                  <span class="font-medium text-foreground">{{ option.label }}</span>
                </div>
                <span class="text-sm font-semibold text-foreground">${{ option.fee }}</span>
              </label>
            </div>
          </div>

          <!-- Back to Cart Link -->
          <div class="text-center">
            <nuxt-link 
              to="/cart-summary" 
              class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Return to Cart
            </nuxt-link>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div class="space-y-6">
          <div class="bg-card border rounded-lg p-6 shadow-sm sticky top-4">
            <h2 class="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center gap-4 p-3 border rounded-lg"
              >
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-14 h-14 rounded object-cover border"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-foreground truncate">{{ item.name }}</h3>
                  <p class="text-sm text-muted-foreground">
                    <span v-if="item.selectedSize">Size: {{ item.selectedSize }} | </span>
                    Qty: {{ item.quantity }}
                  </p>
                </div>
                <div class="font-semibold text-foreground">${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>

            <!-- Pricing Breakdown -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Subtotal</span>
                <span class="text-foreground">${{ subtotal.toFixed(2) }}</span>
              </div>
              
              <div v-if="discount > 0" class="flex justify-between text-sm">
                <span class="text-green-600">Discount (10%)</span>
                <span class="text-green-600">-${{ (subtotal * discount).toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Shipping</span>
                <span class="text-foreground">${{ selectedShipping.fee }}</span>
              </div>
              
              <div class="flex justify-between text-lg font-bold pt-2 border-t">
                <span class="text-foreground">Total</span>
                <span class="text-foreground">${{ (total + selectedShipping.fee).toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="placeOrder"
              class="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-colors shadow-sm"
            >
              Place Order
            </button>

            <!-- Security Notice -->
            <p class="text-xs text-muted-foreground text-center mt-3">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>