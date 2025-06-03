// stores/cart.js
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useCartStore = defineStore("cart", () => {
  // Persist cart in localStorage
  const cart = useStorage("cart-items", []);

  // Add a product to cart
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

  // Increase item quantity
  function increaseQuantity(productId) {
    const item = cart.value.find((i) => i.id === productId);
    if (item && item.quantity < 10) {
      item.quantity++;
    }
  }

  // Decrease item quantity
  function decreaseQuantity(productId) {
    const item = cart.value.find((i) => i.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  // Remove a product
  function removeFromCart(productId) {
    cart.value = cart.value.filter((item) => item.id !== productId);
  }

  // Clear cart
  function clearCart() {
    cart.value = [];
  }

  // Check if item is in cart
  function isInCart(productId) {
    return cart.value.some((item) => item.id === productId);
  }

  // Get total number of items
  const totalItems = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0)
  );

  // Total without discount
  const rawTotal = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity * item.price, 0)
  );

  // Discount (e.g., 10% off if total > $100)
  const discount = computed(() => (rawTotal.value > 100 ? 0.1 : 0));

  // Total with discount
  const totalPrice = computed(() => rawTotal.value * (1 - discount.value));

  // Subtotal for each item
  function getItemSubtotal(item) {
    return item.quantity * item.price;
  }

  return (
    {
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
    },
    {
      persist: true, // Enables persistence
    }
  );
});
