<script setup>
defineProps({
  title: String,
  links: {
    type: Array,
    required: true,
  },
})
</script>

<template>
    <div>
      <h3 class="text-lg font-semibold mb-3">{{ title }}</h3>
      <ul class="space-y-2 text-gray-400">
        <li v-for="link in links" :key="link.to">
          <nuxt-link :to="link.to" class="hover:text-white transition">
            {{ link.label }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </template>
  

  