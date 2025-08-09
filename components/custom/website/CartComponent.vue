<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import Cart from "@/assets/icons/cart.vue";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Plus, Minus, Trash2, ShoppingCart, Sparkles } from "lucide-vue-next";

// Access cart store
const cartStore = useCartStore();
const isLoading = ref(false);

// Computed values
const cartCount = computed(() =>
  Array.isArray(cartStore.cart)
    ? cartStore.cart.reduce((total, item) => total + item.quantity, 0)
    : 0
);

const subtotal = computed(() =>
  Array.isArray(cartStore.cart)
    ? cartStore.cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    : "0.00"
);

const discount = computed(() => (subtotal.value >= 100 ? 10 : 0));

const discountedTotal = computed(
  () => subtotal.value - (subtotal.value * discount.value) / 100
);

const savings = computed(() => 
  discount.value > 0 ? ((subtotal.value * discount.value) / 100).toFixed(2) : "0.00"
);

// Handlers
const increaseQuantity = (productId) => {
  cartStore.increaseQuantity(productId);
};

const decreaseQuantity = (productId) => {
  cartStore.decreaseQuantity(productId);
};

const removeItem = (productId) => {
  cartStore.removeFromCart(productId);
};

const proceedToCheckout = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    // Navigate to checkout
  }, 1500);
};
</script>

<template>
  <div>
    <Sheet>
      <sheet-trigger as-child>
        <div class="relative hover:cursor-pointer group transition-all duration-200 hover:scale-105">
          <div class="p-2 rounded-full hover:bg-accent transition-colors">
            <shopping-cart class="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </div>
          <badge
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] font-semibold flex items-center justify-center bg-primary text-primary-foreground border-2 border-background animate-pulse"
          >
            {{ cartCount > 99 ? '99+' : cartCount }}
          </badge>
        </div>
      </sheet-trigger>

      <sheet-content side="right" class="w-full sm:max-w-lg">
        <sheet-header class="space-y-4">
          <sheet-title class="flex items-center gap-3 text-xl font-semibold">
            <shopping-bag class="h-5 w-5 text-primary" />
            Shopping Cart
            <badge v-if="cartCount > 0" variant="secondary" class="ml-auto">
              {{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }}
            </badge>
          </sheet-title>
        </sheet-header>

        <separator class="my-6" />

        <!-- Cart Items -->
        <div
          v-if="Array.isArray(cartStore.cart) && cartStore.cart.length > 0"
          class="flex flex-col h-full"
        >
          <!-- Scrollable Items Area -->
          <scroll-area class="flex-1 -mx-6 px-6">
            <div class="space-y-4">
              <div
                v-for="item in cartStore.cart"
                :key="item.id"
                class="group relative bg-card rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20"
              >
                <!-- Product Info -->
                <div class="flex gap-4">
                  <div class="relative">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-16 h-16 object-cover rounded-md bg-muted"
                    />
                  </div>
                  
                  <div class="flex-1 space-y-2">
                    <div class="flex items-start justify-between">
                      <h3 class="font-medium text-sm leading-tight line-clamp-2">
                        {{ item.name }}
                      </h3>
                      <button
                        @click="removeItem(item.id)"
                        class="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                        aria-label="Remove item"
                      >
                        <trash-2 class="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div class="flex items-center justify-between">
                      <p class="text-lg font-semibold text-primary">
                        ${{ (item.price * item.quantity).toFixed(2) }}
                      </p>
                      
                      <!-- Quantity Controls -->
                      <div class="flex items-center gap-1 bg-muted rounded-lg p-1">
                        <button
                          @click="decreaseQuantity(item.id)"
                          class="p-1 rounded-md hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="item.quantity <= 1"
                        >
                          <minus class="h-4 w-4" />
                        </button>
                        
                        <span class="w-10 text-center text-sm font-medium">
                          {{ item.quantity }}
                        </span>
                        
                        <button
                          @click="increaseQuantity(item.id)"
                          class="p-1 rounded-md hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="item.quantity >= 10"
                        >
                          <plus class="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p class="text-xs text-muted-foreground">
                      ${{ item.price.toFixed(2) }} each
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </scroll-area>

          <separator class="my-6" />

          <!-- Order Summary -->
          <div class="space-y-4 bg-muted/30 rounded-lg p-4">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Subtotal</span>
              <span class="font-medium">${{ subtotal }}</span>
            </div>
            
            <!-- Discount Section -->
            <div v-if="discount > 0" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-1 text-primary">
                  <sparkles class="h-4 w-4" />
                  Discount ({{ discount }}%)
                </span>
                <span class="font-medium text-primary">-${{ savings }}</span>
              </div>
              <div class="bg-primary/10 border border-primary/20 rounded-md p-2">
                <p class="text-xs text-primary flex items-center gap-1">
                  <sparkles class="h-3 w-3" />
                  You saved ${{ savings }} on this order!
                </p>
              </div>
            </div>
            
            <!-- Discount Incentive -->
            <div v-else-if="subtotal < 100" class="bg-accent/50 border border-accent rounded-md p-2">
              <p class="text-xs text-muted-foreground">
                💡 Spend ${{ (100 - subtotal).toFixed(2) }} more to unlock 10% discount!
              </p>
            </div>

            <separator />
            
            <!-- Total -->
            <div class="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span class="text-primary">${{ discountedTotal.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3 pt-4">
            <nuxt-link :to="{ name: 'cart-summary' }" class="block w-full">
              <button
                class="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                @click="proceedToCheckout"
                :disabled="isLoading"
              >
                {{ isLoading ? "Processing..." : "Proceed to Checkout" }}
                <shopping-bag v-if="!isLoading" class="h-4 w-4" />
                <div v-else class="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
              </button>
            </nuxt-link>
            
            <nuxt-link :to="{ name: 'products' }">
              <button class="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md font-medium transition-all duration-200">
                Continue Shopping
              </button>
            </nuxt-link>
          </div>
        </div>

        <!-- Empty Cart State -->
        <div v-else class="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
          <div class="relative">
            <div class="w-32 h-32 bg-muted/50 rounded-full flex items-center justify-center">
              <shopping-cart class="h-16 w-16 text-muted-foreground/50" />
            </div>
            <div class="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20"></div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Your cart is empty</h3>
            <p class="text-sm text-muted-foreground max-w-sm">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
          </div>
          
          <nuxt-link :to="{ name: 'products' }">
            <button class="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <shopping-bag class="h-4 w-4" />
              Start Shopping
            </button>
          </nuxt-link>
        </div>
      </sheet-content>
    </Sheet>
  </div>
</template>