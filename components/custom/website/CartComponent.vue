<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

// Store and state
const cartStore = useCartStore();
const router = useRouter();
const isLoading = ref(false);
const isOpen = ref(false);

// Common button styles
const buttonStyles = {
  primary: "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
  secondary: "w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md font-medium transition-all duration-200",
  icon: "p-1 rounded-md hover:bg-background transition-colors",
  remove: "opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
};

// Computed values
const cartCount = computed(() => 
  cartStore.cart?.reduce((total, item) => total + item.quantity, 0) || 0
);

const totalPrice = computed(() => 
  cartStore.cart?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) || "0.00"
);

const estimatedDelivery = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
});

const hasItems = computed(() => cartStore.cart?.length > 0);

// Helper functions
const showToast = (message, duration = 1000) => {
  toast.success(message, { duration });
};

const formatPrice = (price) => `$${price.toFixed(2)}`;

// Event handlers
const handleQuantityChange = (productId, action) => {
  if (action === 'increase') {
    cartStore.increaseQuantity(productId);
  } else {
    cartStore.decreaseQuantity(productId);
  }
  showToast("Quantity updated");
};

const handleRemoveItem = (productId) => {
  const item = cartStore.cart.find(i => i.id === productId);
  cartStore.removeFromCart(productId);
  showToast(`${item?.name} removed from cart`);
};

const handleCheckout = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isOpen.value = false; // Close the sheet
    router.push({ name: 'cart-summary' }); // Navigate to checkout
  }, 1500);
};
</script>

<template>
  <div>
    <sheet v-model:open="isOpen">
      <!-- Cart Trigger -->
      <sheet-trigger as-child>
        <div class="relative hover:cursor-pointer group transition-all duration-200 hover:scale-105">
          <div class="p-2 rounded-full hover:bg-accent transition-colors">
            <shopping-cart class="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </div>
          <badge
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] font-semibold flex items-center justify-center bg-primary text-primary-foreground border-2 border-background animate-pulse"
          >
            {{ cartCount > 99 ? "99+" : cartCount }}
          </badge>
        </div>
      </sheet-trigger>

      <!-- Cart Content -->
      <sheet-content side="right" class="w-full sm:max-w-lg">
        <sheet-header class="space-y-4">
          <sheet-title class="flex items-center gap-3 text-xl font-semibold">
            <shopping-bag class="h-5 w-5 text-primary" />
            Shopping Cart
            <badge v-if="cartCount > 0" variant="secondary" class="ml-auto">
              {{ cartCount }} item{{ cartCount !== 1 ? "s" : "" }}
            </badge>
          </sheet-title>
        </sheet-header>

        <separator class="my-6" />

        <!-- Cart Items -->
        <div v-if="hasItems" class="flex flex-col h-full">
          <!-- Items List -->
          <scroll-area class="flex-1 -mx-6 px-6">
            <div class="space-y-4">
              <div
                v-for="item in cartStore.cart"
                :key="item.id"
                class="group relative bg-card rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20"
              >
                <div class="flex gap-4">
                  <!-- Product Image -->
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-16 h-16 object-cover rounded-md bg-muted"
                  />

                  <!-- Product Details -->
                  <div class="flex-1 space-y-2">
                    <!-- Name & Remove Button -->
                    <div class="flex items-start justify-between">
                      <h3 class="font-medium text-sm leading-tight line-clamp-2">
                        {{ item.name }}
                      </h3>
                      <button
                        @click="handleRemoveItem(item.id)"
                        :class="buttonStyles.remove"
                        aria-label="Remove item"
                      >
                        <trash-2 class="h-4 w-4" />
                      </button>
                    </div>

                    <!-- Price & Quantity -->
                    <div class="flex items-center justify-between">
                      <p class="text-lg font-semibold text-primary">
                        {{ formatPrice(item.price * item.quantity) }}
                      </p>

                      <!-- Quantity Controls -->
                      <div class="flex items-center gap-1 bg-muted rounded-lg p-1">
                        <button
                          @click="handleQuantityChange(item.id, 'decrease')"
                          :class="buttonStyles.icon"
                          :disabled="item.quantity <= 1"
                          class="disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <minus class="h-4 w-4" />
                        </button>

                        <span class="w-10 text-center text-sm font-medium">
                          {{ item.quantity }}
                        </span>

                        <button
                          @click="handleQuantityChange(item.id, 'increase')"
                          :class="buttonStyles.icon"
                        >
                          <plus class="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <!-- Unit Price -->
                    <p class="text-xs text-muted-foreground">
                      {{ formatPrice(item.price) }} each
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </scroll-area>

          <separator class="my-6" />

          <!-- Order Summary -->
          <div class="space-y-4 bg-muted/30 rounded-lg p-4">
            <div class="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span class="text-primary">{{ formatPrice(parseFloat(totalPrice)) }}</span>
            </div>

            <div class="text-xs text-muted-foreground text-center pt-2 border-t border-border">
              📦 Estimated delivery: {{ estimatedDelivery }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3 pt-4">
            <button
              @click="handleCheckout"
              :class="buttonStyles.primary"
              :disabled="isLoading"
            >
              {{ isLoading ? "Processing..." : "Proceed to Checkout" }}
              <shopping-bag v-if="!isLoading" class="h-4 w-4" />
              <div
                v-else
                class="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"
              />
            </button>

            <nuxt-link :to="{ name: 'products' }">
              <button :class="buttonStyles.secondary" @click="isOpen = false">
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
            <div class="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20" />
          </div>

          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Your cart is empty</h3>
            <p class="text-sm text-muted-foreground max-w-sm">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
          </div>

          <nuxt-link :to="{ name: 'products' }">
            <button class="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2" @click="isOpen = false">
              <shopping-bag class="h-4 w-4" />
              Start Shopping
            </button>
          </nuxt-link>
        </div>
      </sheet-content>
    </sheet>
  </div>
</template>