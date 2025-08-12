<script setup>
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'vue-sonner';
import { ShoppingCart, Minus, Plus, Trash2, Tag, ArrowLeft, CreditCard } from 'lucide-vue-next';

const cartStore = useCartStore();
const promoCode = ref('');
const isApplyingPromo = ref(false);

const cartItems = computed(() => cartStore.cart || []);
const subtotal = computed(() => cartStore.rawTotal);
const discount = computed(() => cartStore.discount);
const total = computed(() => cartStore.totalPrice);
const totalItems = computed(() => cartStore.totalItems);

const increaseQuantity = (productId) => {
  cartStore.increaseQuantity(productId);
};

const decreaseQuantity = (productId) => {
  cartStore.decreaseQuantity(productId);
};

const removeItem = (productId) => {
  cartStore.removeFromCart(productId);
  toast.success('Item removed from cart');
};

const applyPromoCode = async () => {
  if (!promoCode.value.trim()) {
    toast.error('Please enter a promo code');
    return;
  }
  
  isApplyingPromo.value = true;
  
  // Simulate API call
  setTimeout(() => {
    if (promoCode.value.toUpperCase() === 'SAVE10') {
      toast.success('Promo code applied! 10% discount');
    } else {
      toast.error('Invalid promo code');
    }
    isApplyingPromo.value = false;
    promoCode.value = '';
  }, 1000);
};

const clearCart = () => {
  cartStore.clearCart();
  toast.success('Cart cleared');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <nuxt-link to="/products" class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <arrow-left class="w-4 h-4" />
            Continue Shopping
          </nuxt-link>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <shopping-cart class="w-8 h-8 text-primary" />
            <h1 class="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <badge v-if="totalItems > 0" variant="secondary" class="text-sm">
              {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}
            </badge>
          </div>
          <button 
            v-if="cartItems.length > 0"
            @click="clearCart"
            class="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <trash-2 class="w-4 h-4" />
            Clear Cart
          </button>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <card v-for="item in cartItems" :key="item.id" class="overflow-hidden">
            <card-content class="p-6">
              <div class="flex flex-col sm:flex-row gap-4">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="w-full sm:w-24 h-48 sm:h-24 rounded-lg object-cover border border-border"
                  />
                </div>

                <!-- Product Details -->
                <div class="flex-1 space-y-3">
                  <div>
                    <h3 class="text-lg font-semibold text-foreground line-clamp-2">{{ item.name }}</h3>
                    <p class="text-sm text-muted-foreground mt-1 line-clamp-2">{{ item.description }}</p>
                  </div>

                  <!-- Product Variants -->
                  <div class="flex flex-wrap gap-2 text-sm">
                    <badge v-if="item.selectedSize" variant="outline" class="text-xs">
                      Size: {{ item.selectedSize }}
                    </badge>
                    <badge v-if="item.selectedColor" variant="outline" class="text-xs flex items-center gap-1">
                      <span 
                        class="w-3 h-3 rounded-full border border-border" 
                        :style="{ backgroundColor: item.selectedColor }"
                      ></span>
                      {{ item.selectedColor }}
                    </badge>
                  </div>

                  <!-- Price and Actions -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                      <span class="text-2xl font-bold text-primary">${{ item.price.toFixed(2) }}</span>
                      <span class="text-sm text-muted-foreground">each</span>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center gap-3">
                      <div class="flex items-center border border-border rounded-lg">
                        <button 
                          @click="decreaseQuantity(item.id)"
                          :disabled="item.quantity <= 1"
                          class="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <minus class="w-4 h-4" />
                        </button>
                        <span class="px-4 py-2 font-semibold min-w-[3rem] text-center">{{ item.quantity }}</span>
                        <button 
                          @click="increaseQuantity(item.id)"
                          :disabled="item.quantity >= 10"
                          class="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <plus class="w-4 h-4" />
                        </button>
                      </div>

                      <button 
                        @click="removeItem(item.id)"
                        class="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title="Remove item"
                      >
                        <trash-2 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- Subtotal -->
                  <div class="flex justify-between items-center pt-2 border-t border-border">
                    <span class="text-sm text-muted-foreground">Subtotal:</span>
                    <span class="text-xl font-bold text-foreground">${{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </card-content>
          </card>
        </div>

        <!-- Order Summary -->
        <div class="space-y-6">
          <!-- Promo Code -->
          <card>
            <card-header>
              <card-title class="flex items-center gap-2 text-lg">
                <tag class="w-5 h-5" />
                Promo Code
              </card-title>
            </card-header>
            <card-content class="space-y-3">
              <div class="flex gap-2">
                <input 
                  v-model="promoCode"
                  placeholder="Enter promo code"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button 
                  @click="applyPromoCode"
                  :disabled="isApplyingPromo || !promoCode.trim()"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {{ isApplyingPromo ? 'Applying...' : 'Apply' }}
                </button>
              </div>
              <p class="text-xs text-muted-foreground">Try code: SAVE10 for 10% off</p>
            </card-content>
          </card>

          <!-- Order Summary -->
          <card>
            <card-header>
              <card-title class="text-xl">Order Summary</card-title>
            </card-header>
            <card-content class="space-y-4">
              <div class="space-y-3">
                <div class="flex justify-between text-base">
                  <span class="text-muted-foreground">Subtotal ({{ totalItems }} items)</span>
                  <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>

                <div class="flex justify-between text-base">
                  <span class="text-muted-foreground">Shipping</span>
                  <span class="font-semibold text-green-600">Free</span>
                </div>

                <div class="flex justify-between text-base">
                  <span class="text-muted-foreground">Tax</span>
                  <span class="font-semibold">Calculated at checkout</span>
                </div>

                <div v-if="discount > 0" class="flex justify-between text-base text-green-600">
                  <span>Discount ({{ (discount * 100).toFixed(0) }}%)</span>
                  <span class="font-semibold">-${{ (subtotal * discount).toFixed(2) }}</span>
                </div>
              </div>

              <separator />

              <div class="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span class="text-primary">${{ total.toFixed(2) }}</span>
              </div>

              <!-- Savings Badge -->
              <div v-if="discount > 0" class="text-center">
                <badge variant="secondary" class="text-green-600 bg-green-50 dark:bg-green-900/20">
                  You saved ${{ (subtotal * discount).toFixed(2) }}!
                </badge>
              </div>
            </card-content>

            <card-footer class="flex flex-col gap-3">
              <nuxt-link to="/checkout" class="w-full">
                <button class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 gap-2">
                  <credit-card class="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </nuxt-link>
              
              <p class="text-xs text-muted-foreground text-center">
                Secure checkout with 256-bit SSL encryption
              </p>
            </card-footer>
          </card>

          <!-- Trust Badges -->
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="p-3 bg-muted/50 rounded-lg">
              <div class="text-sm font-medium text-foreground">Free Shipping</div>
              <div class="text-xs text-muted-foreground">On orders over $50</div>
            </div>
            <div class="p-3 bg-muted/50 rounded-lg">
              <div class="text-sm font-medium text-foreground">Easy Returns</div>
              <div class="text-xs text-muted-foreground">30-day return policy</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-else class="text-center py-20">
        <div class="max-w-md mx-auto">
          <shopping-cart class="w-24 h-24 mx-auto text-muted-foreground/50 mb-6" />
          <h2 class="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p class="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet. 
            Start shopping to fill it up!
          </p>
          <nuxt-link to="/products">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 gap-2">
              <shopping-cart class="w-4 h-4" />
              Start Shopping
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>