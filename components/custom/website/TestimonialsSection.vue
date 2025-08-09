<script setup>
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Fashion Blogger',
    avatar: '👩🏻‍💼',
    rating: 5,
    comment: 'Hours Collection has completely transformed my wardrobe. The quality is exceptional and the designs are exactly what modern streetwear should be.',
    product: 'Oversized Sweatshirt'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Creative Director',
    avatar: '👨🏾‍💻',
    rating: 5,
    comment: 'Finally found a brand that gets it right. The fit, the fabric, the style - everything is on point. My go-to for both work and weekends.',
    product: 'Classic Blue Jeans'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Student',
    avatar: '👩🏽‍🎓',
    rating: 5,
    comment: 'As a student on a budget, I was amazed by the quality I got for the price. These pieces have lasted me through everything.',
    product: 'Grey Hoodie'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Entrepreneur',
    avatar: '👨🏻‍💼',
    rating: 5,
    comment: 'The attention to detail is incredible. You can tell they really care about their craft. Customer service is also top-notch.',
    product: 'Navy Blue Sweater'
  }
]
</script>

<template>
  <section class="py-16 px-6 lg:px-36 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Community Says
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Real feedback from real customers who love our products
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative"
        >
          <!-- Quote Icon -->
          <div class="absolute top-6 right-6 text-4xl text-gray-200">"</div>
          
          <!-- Rating -->
          <div class="flex gap-1 mb-6">
            <svg
              v-for="star in testimonial.rating"
              :key="star"
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <!-- Comment -->
          <blockquote class="text-gray-700 leading-relaxed mb-6 text-lg">
            {{ testimonial.comment }}
          </blockquote>

          <!-- Customer Info -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                {{ testimonial.avatar }}
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
            
            <div class="text-right">
              <p class="text-xs text-gray-400 mb-1">Purchased</p>
              <p class="text-sm font-medium text-gray-700">{{ testimonial.product }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">Join thousands of satisfied customers</p>
        <nuxt-link
          to="/products"
          class="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          <span>Shop Now</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>