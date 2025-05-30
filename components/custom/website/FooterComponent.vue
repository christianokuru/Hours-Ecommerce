<script setup>
import FooterLinksComponent from './FooterLinksComponent.vue';
</script>

<template>
    <footer class="bg-black text-white w-full">
      <div class="max-w-screen-xl mx-auto px-4 py-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo + Description -->
          <div>
            <h2 class="text-2xl font-bold mb-2">ShopNow</h2>
            <p class="text-sm text-gray-400">
              Your one-stop shop for amazing deals, high-quality products, and unbeatable customer support.
            </p>
          </div>
  
          <!-- Link groups -->
          <footer-links-component
            title="Quick Links"
            :links="[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: 'Categories', to: '/categories' },
              { label: 'Contact', to: '/contact' }
            ]"
          />
  
          <footer-links-component
            title="Support"
            :links="[
              { label: 'Help Center', to: '/help' },
              { label: 'Terms of Service', to: '/terms' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Return Policy', to: '/returns' }
            ]"
          />
  
          <!-- Newsletter -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Stay Updated</h3>
            <p class="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form class="flex">
              <input
                type="email"
                placeholder="Your email"
                class="w-full px-3 py-2 rounded-l bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                class="bg-primary-500 text-white px-4 py-2 rounded-r hover:bg-primary-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        <div class="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          © {{ new Date().getFullYear() }} ShopNow. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  

  