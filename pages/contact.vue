<script setup>
import { ref } from "vue"
import { z } from "zod"
import { toast } from "vue-sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Phone, MapPin, Clock } from "lucide-vue-next"
import { useZodForm } from "@/composables/useZodForm"

// SEO Meta
useSeoMeta({
  title: 'Contact Us – Hours Collection',
  description: 'Get in touch with Hours Collection. We\'re here to help with any questions about our premium streetwear, orders, or customer service.',
  ogTitle: 'Contact Hours Collection',
  ogDescription: 'Reach out to our team for support, inquiries, or feedback about our premium streetwear collection.',
  ogImage: '/images/contact-hero.jpg',
  ogUrl: 'https://hours-store.vercel.app/contact',
  twitterTitle: 'Contact Hours Collection',
  twitterDescription: 'Get in touch with our customer service team.',
  twitterImage: '/images/contact-hero.jpg',
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

// Form validation schema
const contactSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[+]?[\d\s\-\(\)]+$/, { message: "Please enter a valid phone number" })
    .optional()
    .or(z.literal("")),
  subject: z.string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  message: z.string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
  inquiryType: z.enum(["general", "order", "support", "partnership"], {
    errorMap: () => ({ message: "Please select an inquiry type" })
  })
})

// Use the validation composable
const { 
  values, 
  errors, 
  isValid, 
  validate, 
  validateField,
  clearFieldError,
  reset
} = useZodForm(contactSchema, {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  inquiryType: "general"
})

const isSubmitting = ref(false)

// Handle form submission
const handleSubmit = async () => {
  const isFormValid = validate()
  
  if (!isFormValid) {
    toast.error("Please fix the errors in the form", {
      description: "Check all required fields and try again."
    })
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success("Message sent successfully! 🎉", {
      description: "We'll get back to you within 24 hours."
    })
    
    // Reset form after successful submission
    reset()
  } catch (error) {
    toast.error("Failed to send message", {
      description: "Please try again or contact us directly."
    })
  } finally {
    isSubmitting.value = false
  }
}

// Handle field blur for real-time validation
const handleFieldBlur = (fieldName) => {
  validateField(fieldName)
}

// Clear error when user starts typing
const handleFieldInput = (fieldName) => {
  clearFieldError(fieldName)
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero Section -->
    <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Get In 
          <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Have questions about our products? Need help with an order? We're here to help. 
          Reach out to our friendly team and we'll get back to you as soon as possible.
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Contact Information -->
        <div class="lg:col-span-1 space-y-8">
          <div>
            <h2 class="text-2xl font-bold mb-6">Contact Information</h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <mail class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Email</h3>
                  <p class="text-muted-foreground">support@hourscollection.com</p>
                  <p class="text-muted-foreground text-sm">We reply within 24 hours</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <phone class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Phone</h3>
                  <p class="text-muted-foreground">+1 (555) 123-4567</p>
                  <p class="text-muted-foreground text-sm">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <map-pin class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Address</h3>
                  <p class="text-muted-foreground">123 Fashion Street<br>New York, NY 10001</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <clock class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Business Hours</h3>
                  <p class="text-muted-foreground text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM<br>
                    Saturday: 10:00 AM - 4:00 PM<br>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <card class="border">
            <card-header>
              <card-title class="text-lg">Quick Help</card-title>
              <card-description>
                Check out our frequently asked questions
              </card-description>
            </card-header>
            <card-content class="space-y-3">
              <div class="text-sm">
                <p class="font-medium text-foreground">Order Status</p>
                <p class="text-muted-foreground">Track your order in real-time</p>
              </div>
              <div class="text-sm">
                <p class="font-medium text-foreground">Returns & Exchanges</p>
                <p class="text-muted-foreground">30-day return policy</p>
              </div>
              <div class="text-sm">
                <p class="font-medium text-foreground">Sizing Guide</p>
                <p class="text-muted-foreground">Find your perfect fit</p>
              </div>
            </card-content>
          </card>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <card class="border">
            <card-header>
              <card-title class="text-2xl">Send us a Message</card-title>
              <card-description>
                Fill out the form below and we'll get back to you as soon as possible.
              </card-description>
            </card-header>
            <card-content>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name Fields -->
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="firstName">
                      First Name <span class="text-destructive">*</span>
                    </label>
                    <input
                      id="firstName"
                      v-model="values.firstName"
                      type="text"
                      placeholder="John"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      :class="{ 'border-destructive focus-visible:ring-destructive': errors.firstName }"
                      @blur="handleFieldBlur('firstName')"
                      @input="handleFieldInput('firstName')"
                    />
                    <p v-if="errors.firstName" class="text-sm text-destructive">
                      {{ errors.firstName }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="lastName">
                      Last Name <span class="text-destructive">*</span>
                    </label>
                    <input
                      id="lastName"
                      v-model="values.lastName"
                      type="text"
                      placeholder="Doe"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      :class="{ 'border-destructive focus-visible:ring-destructive': errors.lastName }"
                      @blur="handleFieldBlur('lastName')"
                      @input="handleFieldInput('lastName')"
                    />
                    <p v-if="errors.lastName" class="text-sm text-destructive">
                      {{ errors.lastName }}
                    </p>
                  </div>
                </div>

                <!-- Email and Phone -->
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="email">
                      Email Address <span class="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="values.email"
                      type="email"
                      placeholder="john.doe@example.com"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      :class="{ 'border-destructive focus-visible:ring-destructive': errors.email }"
                      @blur="handleFieldBlur('email')"
                      @input="handleFieldInput('email')"
                    />
                    <p v-if="errors.email" class="text-sm text-destructive">
                      {{ errors.email }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="phone">Phone Number (Optional)</label>
                    <input
                      id="phone"
                      v-model="values.phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      :class="{ 'border-destructive focus-visible:ring-destructive': errors.phone }"
                      @blur="handleFieldBlur('phone')"
                      @input="handleFieldInput('phone')"
                    />
                    <p v-if="errors.phone" class="text-sm text-destructive">
                      {{ errors.phone }}
                    </p>
                  </div>
                </div>

                <!-- Inquiry Type -->
                <div class="space-y-2">
                  <label for="inquiryType">
                    Inquiry Type <span class="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    v-model="values.inquiryType"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="{ 'border-destructive focus-visible:ring-destructive': errors.inquiryType }"
                    @blur="handleFieldBlur('inquiryType')"
                    @change="handleFieldInput('inquiryType')"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  <p v-if="errors.inquiryType" class="text-sm text-destructive">
                    {{ errors.inquiryType }}
                  </p>
                </div>

                <!-- Subject -->
                <div class="space-y-2">
                  <label for="subject">
                    Subject <span class="text-destructive">*</span>
                  </label>
                  <input
                    id="subject"
                    v-model="values.subject"
                    type="text"
                    placeholder="What can we help you with?"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="{ 'border-destructive focus-visible:ring-destructive': errors.subject }"
                    @blur="handleFieldBlur('subject')"
                    @input="handleFieldInput('subject')"
                  />
                  <p v-if="errors.subject" class="text-sm text-destructive">
                    {{ errors.subject }}
                  </p>
                </div>

                <!-- Message -->
                <div class="space-y-2">
                  <label for="message">
                    Message <span class="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="values.message"
                    rows="6"
                    placeholder="Please provide as much detail as possible..."
                    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="{ 'border-destructive focus-visible:ring-destructive': errors.message }"
                    @blur="handleFieldBlur('message')"
                    @input="handleFieldInput('message')"
                  />
                  <div class="flex justify-between items-center">
                    <p v-if="errors.message" class="text-sm text-destructive">
                      {{ errors.message }}
                    </p>
                    <p class="text-sm text-muted-foreground ml-auto">
                      {{ values.message.length }}/1000
                    </p>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting || !isValid"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 w-full sm:w-auto"
                >
                  <loader-2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </card-content>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
