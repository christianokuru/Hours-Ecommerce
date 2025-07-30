<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import Cart from "@/assets/icons/cart.vue";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import emptyCart from "@/public/images/empty-cart.jpg";

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
    alert("Proceeding to checkout...");
  }, 1500);
};

{
  /* <Badge
            v-if="cartCount > 0"
            class="absolute -top-2 -right-3 w-[50%] rounded-full text-[9px] flex items-center justify-center bg-yellow-200 text-black"
          >
            {{ cartCount }}
          </Badge> */
}
</script>

<template>
  <div>
    <Sheet>
      <SheetTrigger as-child>
        <div class="relative hover:cursor-pointer">
          <Cart />
          <Badge
            class="absolute -top-2 -right-3 w-[50%] rounded-full text-[9px] flex items-center justify-center bg-yellow-200 text-black max-sm:px-2 max-sm:left-2 max-sm:bottom-2"
            :class="{ 'bg-green-500 text-white': cartCount > 0 }"
          >
            {{ cartCount }}
          </Badge>
        </div>
      </SheetTrigger>

      <SheetContent side="top" class="w-80 bg-background">
        <h2 class="text-xl font-semibold text-black dark:text-white">Your Cart</h2>

        <div
          v-if="Array.isArray(cartStore.cart) && cartStore.cart.length > 0"
          class="mt-4"
        >
          <div
            v-for="item in cartStore.cart || []"
            :key="item.id"
            class="flex justify-between items-center border-b border-yellow-300 py-2"
          >
            <img
              :src="item.image"
              alt="Product Image"
              class="w-12 h-12 object-cover rounded"
            />
            <div class="flex-1 ml-2">
              <p class="text-sm font-medium text-yellow-900 truncate w-28">
                {{ item.name }}
              </p>
              <p class="text-sm text-yellow-700">
                ${{ item.price }} × {{ item.quantity }}
              </p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center space-x-2">
              <button
                @click="decreaseQuantity(item.id)"
                class="px-2 py-1 bg-orange-300 text-yellow-900 rounded"
              >
                -
              </button>
              <span class="text-sm font-medium text-yellow-900">
                {{ item.quantity }}
              </span>
              <button
                @click="increaseQuantity(item.id)"
                class="px-2 py-1 bg-orange-300 text-yellow-900 rounded"
              >
                +
              </button>
            </div>

            <!-- Remove Button -->
            <button
              @click="removeItem(item.id)"
              class="text-red-500 text-xs ml-2"
            >
              Remove
            </button>
          </div>

          <!-- Subtotal Section -->
          <div
            class="mt-4 p-2 border-t border-yellow-300 flex justify-between items-center"
          >
            <p class="text-lg font-semibold text-yellow-900">Subtotal:</p>
            <p class="text-lg font-bold text-yellow-900">${{ subtotal }}</p>
          </div>

          <!-- Discount Message -->
          <div v-if="discount > 0" class="mt-2 text-orange-600 text-sm">
            🎉 You've unlocked a {{ discount }}% discount!
          </div>

          <!-- Total Section -->
          <div class="flex justify-between items-center mt-2">
            <p class="text-lg font-semibold text-orange-800">
              Total After Discount:
            </p>
            <p class="text-lg font-bold text-orange-900">
              ${{ discountedTotal.toFixed(2) }}
            </p>
          </div>

          <!-- Checkout Button -->
          <nuxt-link :to="{ name: 'checkout-summary' }" class="block w-full">
            <Button
              class="w-full mt-4 bg-orange-700 hover:bg-orange-600 text-white"
              @click="proceedToCheckout"
              :disabled="isLoading"
            >
              {{ isLoading ? "Processing..." : "Proceed to Checkout" }}
            </Button>
          </nuxt-link>
        </div>

        <!-- Empty Cart Message -->
        <div v-else class="text-center text-primary dark:text-gray-400 my-20">
          <!-- <nuxt-img
            src="/images/empty-cart.jpg"
            alt="Empty Cart"
            class="mx-auto"
          /> -->
          <Cart height="200" width="300" />
          <p class="mt-4 text-lg font-semibold text-primary dark:text-gray-400">
            Omo, your cart is empty 🛒
          </p>
          <p class="text-sm text-primary dark:text-gray-400 mt-3">
            Add items to your cart to continue shopping joor!! 🤣🤣🤣 
          </p>
        </div>

        <!-- Link to Products -->
        <div class="mt-4 text-center">
            <Button class="dark:bg-gray-400 animate-bounce">
          <nuxt-link :to="{ name: 'products' }" class="text-primary-foreground">
            Continue Shopping
          </nuxt-link>
        </Button>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
