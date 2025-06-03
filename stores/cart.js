import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = useStorage("cart-items", []);

    function addToCart(product) {
      const existing = cart.value.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity < 10) existing.quantity++;
      } else {
        cart.value.push({
          ...product,
          quantity: 1,
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
    persist: true, // This is the Pinia plugin config, outside return
  }
);
