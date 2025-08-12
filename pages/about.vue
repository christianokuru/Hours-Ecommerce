<script setup>
import { useSeoMeta, useHead } from "#imports"

useSeoMeta({
  title: 'About Us – Hours Collection',
  description: 'Learn about Hours Collection\'s journey in creating premium streetwear and everyday fashion. Discover our commitment to quality, comfort, and style.',
  ogTitle: 'About Hours Collection – Our Story',
  ogDescription: 'Discover the story behind Hours Collection and our passion for creating premium streetwear that stands out.',
  ogImage: '/images/about-hero.jpg',
  ogUrl: 'https://hours-store.vercel.app/about',
  twitterTitle: 'About Hours Collection – Premium Streetwear',
  twitterDescription: 'Learn about our journey in creating comfortable and stylish apparel.',
  twitterImage: '/images/about-hero.jpg',
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
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            About 
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hours Collection
            </span>
          </h1>
          <p class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're passionate about creating premium streetwear that blends comfort, style, and quality. 
            Every piece tells a story of craftsmanship and dedication to excellence.
          </p>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl sm:text-4xl font-bold">Our Story</h2>
            <div class="space-y-4 text-muted-foreground">
              <p class="text-base sm:text-lg leading-relaxed">
                Founded with a vision to revolutionize everyday fashion, Hours Collection emerged from 
                the belief that great style shouldn't compromise comfort. What started as a small idea 
                has grown into a brand that represents quality, authenticity, and modern streetwear culture.
              </p>
              <p class="text-base sm:text-lg leading-relaxed">
                Every design is carefully crafted with attention to detail, using premium materials 
                that ensure durability and comfort. We understand that clothing is more than just fabric – 
                it's an expression of who you are.
              </p>
              <p class="text-base sm:text-lg leading-relaxed">
                Today, we continue to push boundaries, creating pieces that seamlessly blend into your 
                lifestyle while making a statement about your unique style.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
              <div class="w-full h-full bg-card rounded-xl shadow-lg flex items-center justify-center">
                <div class="text-center space-y-4">
                  <div class="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                    <span class="text-2xl text-primary-foreground font-bold">H</span>
                  </div>
                  <p class="text-sm text-muted-foreground font-medium">Est. 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do, from design to delivery.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Quality First</h3>
            <p class="text-muted-foreground">
              We use only premium materials and employ rigorous quality control to ensure every piece meets our high standards.
            </p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Customer Focused</h3>
            <p class="text-muted-foreground">
              Your satisfaction is our priority. We listen to feedback and continuously improve our products and services.
            </p>
          </div>

          <div class="text-center group sm:col-span-2 lg:col-span-1">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Innovation</h3>
            <p class="text-muted-foreground">
              We constantly explore new designs, materials, and techniques to stay ahead of fashion trends.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            The creative minds behind Hours Collection, working tirelessly to bring you the best in streetwear fashion.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="relative mb-6">
              <div class="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto flex items-center justify-center">
                <div class="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl font-bold text-primary">JS</span>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-semibold mb-2">Jane Smith</h3>
            <p class="text-primary font-medium mb-2">Creative Director</p>
            <p class="text-sm text-muted-foreground">
              With over 10 years in fashion design, Jane leads our creative vision and ensures every piece reflects our brand identity.
            </p>
          </div>

          <div class="text-center group">
            <div class="relative mb-6">
              <div class="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto flex items-center justify-center">
                <div class="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl font-bold text-primary">MD</span>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-semibold mb-2">Mike Davis</h3>
            <p class="text-primary font-medium mb-2">Head of Production</p>
            <p class="text-sm text-muted-foreground">
              Mike oversees our manufacturing process, ensuring quality standards are maintained from concept to completion.
            </p>
          </div>

          <div class="text-center group sm:col-span-2 lg:col-span-1">
            <div class="relative mb-6">
              <div class="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto flex items-center justify-center">
                <div class="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl font-bold text-primary">AL</span>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-semibold mb-2">Alex Liu</h3>
            <p class="text-primary font-medium mb-2">Brand Manager</p>
            <p class="text-sm text-muted-foreground">
              Alex manages our brand strategy and customer relationships, ensuring Hours Collection stays connected with our community.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-8">Our Mission</h2>
        <div class="bg-card border rounded-2xl p-8 sm:p-12 shadow-lg">
          <blockquote class="text-lg sm:text-xl text-muted-foreground italic leading-relaxed mb-6">
            "To create premium streetwear that empowers individuals to express their unique style 
            while providing uncompromising comfort and quality. We believe fashion should be accessible, 
            sustainable, and meaningful."
          </blockquote>
          <div class="flex items-center justify-center space-x-4">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span class="text-primary-foreground font-bold">H</span>
            </div>
            <div class="text-left">
              <p class="font-semibold">Hours Collection</p>
              <p class="text-sm text-muted-foreground">Premium Streetwear</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
          Join Our Journey
        </h2>
        <p class="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Be part of the Hours Collection community and stay updated with our latest releases, 
          behind-the-scenes content, and exclusive offers.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <nuxt-link 
            to="/products" 
            class="inline-flex items-center justify-center px-8 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors duration-300"
          >
            Shop Collection
          </nuxt-link>
          <nuxt-link 
            to="/contact" 
            class="inline-flex items-center justify-center px-8 py-3 border border-primary-foreground text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            Contact Us
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>