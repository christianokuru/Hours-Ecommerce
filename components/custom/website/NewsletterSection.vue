<script setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';

const email = ref('');
const isLoading = ref(false);

const subscribeNewsletter = async () => {
  if (!email.value) {
    toast.error('Please enter your email address');
    return;
  }

  if (!isValidEmail(email.value)) {
    toast.error('Please enter a valid email address');
    return;
  }

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Successfully subscribed!', {
      description: `Welcome to Hours Collection, ${email.value}! 🎉`
    });
    
    email.value = '';
  } catch (error) {
    toast.error('Something went wrong. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
</script>

<template>
  <section class="py-16 px-6 lg:px-36 bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="mb-8">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Stay in the 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Loop
          </span>
        </h2>
        <p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Be the first to know about new drops, exclusive offers, and behind-the-scenes content. Join our community of style enthusiasts.
        </p>
      </div>

      <!-- Benefits -->
      <div class="flex flex-wrap justify-center gap-8 mb-8">
        <div class="flex items-center gap-2 text-sm">
          <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Early access to new collections</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span>Exclusive subscriber discounts</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <div class="w-2 h-2 bg-pink-400 rounded-full"></div>
          <span>Style tips and trends</span>
        </div>
      </div>

      <!-- Newsletter Form -->
      <div class="max-w-md mx-auto">
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-3">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email address"
            class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span v-if="!isLoading">Subscribe</span>
            <span v-else>Subscribing...</span>
            <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div v-else class="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
          </button>
        </form>

        <p class="text-xs text-gray-400 mt-4">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>

      <!-- Social Proof -->
      <div class="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>15,000+ subscribers</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
          <span>Loved by our community</span>
        </div>
      </div>
    </div>
  </section>
</template>