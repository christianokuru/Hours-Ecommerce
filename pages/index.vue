<script setup>
import HeroSection from '~/components/custom/website/HeroSection.vue';
import FeaturedProductSection from '~/components/custom/website/FeaturedProductSection.vue';
import CategoriesSection from '~/components/custom/website/CategoriesSection.vue';
import TestimonialsSection from '~/components/custom/website/TestimonialsSection.vue';
import NewsletterSection from '~/components/custom/website/NewsletterSection.vue';
import TrendingSection from '~/components/custom/website/TrendingSection.vue';
import BrandStorySection from '~/components/custom/website/BrandStorySection.vue';

useSeoMeta({
  description: 'Discover premium streetwear and everyday fashion from Hours Collection. Shop hoodies, sweatshirts, pants, polos, shorts, and more — designed for comfort and built to stand out.',
  
  ogTitle: 'Hours Collection – Premium Streetwear & Everyday Fashion',
  ogDescription: 'Shop the latest in comfortable and stylish apparel. Explore hoodies, polos, pants, and more from Hours Collection.',
  ogImage: '/images/hero77.jpg',
  ogUrl: 'hours-store.vercel.app',

  twitterTitle: 'Hours Collection – Streetwear That Stands Out',
  twitterDescription: 'Find stylish essentials at Hours Collection: hoodies, sweatshirts, polos, pants, and more.',
  twitterImage: '/images/hero77.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
  ]
})
</script>

<template>
  <div>
    <hero-section />
    <featured-product-section />
    <categories-section />
    <trending-section />
    <brand-story-section />
    <testimonials-section />
    <newsletter-section />
  </div>
</template>