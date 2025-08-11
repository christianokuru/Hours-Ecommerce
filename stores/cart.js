import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref([]);
    //const cart = useLocalStorage("cart-items", []);

    function addToCart(product, options = {}) {
      // options: { color, size }
      const selectedColor = options.color || (product.colors?.[0] ?? null);
      const selectedSize = options.size || (product.sizes?.[0] ?? null);
      // Find by id, color, and size
      const existing = cart.value.find(
        (item) => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (existing) {
        if (existing.quantity < 10) existing.quantity++;
      } else {
        cart.value.push({
          ...product,
          quantity: 1,
          selectedColor,
          selectedSize,
        });
      }
    }

    function increaseQuantity(productId) {
      const item = cart.value.find((i) => i.id === productId);
      if (item && item.quantity < 10) {
        item.quantity++;
      }
    }

    function decreaseQuantity(productId) {
      const item = cart.value.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    }

    function removeFromCart(productId) {
      cart.value = cart.value.filter((item) => item.id !== productId);
    }

    function clearCart() {
      cart.value = [];
    }

    function isInCart(productId) {
      return cart.value.some((item) => item.id === productId);
    }

    const totalItems = computed(() =>
      cart.value.reduce((total, item) => total + item.quantity, 0)
    );

    const rawTotal = computed(() =>
      cart.value.reduce((total, item) => total + item.quantity * item.price, 0)
    );

    const discount = computed(() => (rawTotal.value > 100 ? 0.1 : 0));

    const totalPrice = computed(() => rawTotal.value * (1 - discount.value));

    function getItemSubtotal(item) {
      return item.quantity * item.price;
    }

    // Return **all reactive state and methods in ONE object**
    return {
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      totalItems,
      totalPrice,
      rawTotal,
      discount,
      getItemSubtotal,
      increaseQuantity,
      decreaseQuantity,
    };
  },
  {
    persist: true,
  }
);
