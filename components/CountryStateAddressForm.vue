<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Mail, Phone, MapPin, Globe, Map } from 'lucide-vue-next'

// Define the event the component will emit
const emit = defineEmits<{
  (e: 'update:formData', data: any): void
}>()

// Form fields
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const selectedCountry = ref('')
const selectedState = ref('')

// Form validation states
const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  country: '',
  state: ''
})

// Validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

// Watch all form fields and emit the data on every change with validation
watch([firstName, lastName, email, phone, address, selectedCountry, selectedState], () => {
  // Reset errors
  errors.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: ''
  }

  // Validate fields
  if (firstName.value && firstName.value.length < 2) {
    errors.value.firstName = 'First name must be at least 2 characters'
  }
  
  if (lastName.value && lastName.value.length < 2) {
    errors.value.lastName = 'Last name must be at least 2 characters'
  }
  
  if (email.value && !validateEmail(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (phone.value && !validatePhone(phone.value)) {
    errors.value.phone = 'Please enter a valid phone number'
  }

  // Emit the form data
  emit('update:formData', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    country: selectedCountry.value,
    state: selectedState.value,
    isValid: !Object.values(errors.value).some(error => error !== '')
  })
}, { deep: true })

// The rest of your code for fetching countries and states remains the same
const {
  data: countriesData,
  pending: countriesPending,
  error: countriesError
} = await useFetch('https://countriesnow.space/api/v0.1/countries/positions')

const countries = ref<string[]>(
  (countriesData.value as { data: Array<{ name: string }> } | undefined)?.data.map(
    item => item.name
  ) || []
)

const {
  data: statesData,
  pending: statesPending,
  error: statesError
} = useFetch('https://countriesnow.space/api/v0.1/countries/states', {
  method: 'POST',
  body: { country: selectedCountry },
  immediate: false,
  watch: [selectedCountry]
})

const states = ref<string[]>([])

watch(statesData, (response) => {
  const data = response as { data?: { states?: Array<{ name: string }> } }
  states.value = (data?.data?.states || []).map(s => s.name)
})

watch(selectedCountry, () => {
  selectedState.value = ''
})

// Form completion percentage
const getCompletionPercentage = () => {
  const requiredFields = [
    firstName.value,
    lastName.value, 
    email.value,
    phone.value,
    selectedCountry.value,
    address.value
  ]
  
  const completedFields = requiredFields.filter(field => field && field.trim()).length
  return Math.round((completedFields / requiredFields.length) * 100)
}
</script>

<template>
  <div class="space-y-6 w-full">
    <!-- Personal Information Section -->
    <div class="space-y-4">
      <div class="flex items-center gap-2 mb-4">
        <user class="w-5 h-5 text-primary" />
        <h3 class="text-lg font-semibold text-foreground">Personal Information</h3>
      </div>
      
      <!-- Name Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            First Name <span class="text-destructive">*</span>
          </label>
          <input
            v-model="firstName"
            type="text"
            placeholder="Enter your first name"
            :class="[
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''
            ]"
            required
          />
          <p v-if="errors.firstName" class="text-sm text-destructive">{{ errors.firstName }}</p>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Last Name <span class="text-destructive">*</span>
          </label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Enter your last name"
            :class="[
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''
            ]"
            required
          />
          <p v-if="errors.lastName" class="text-sm text-destructive">{{ errors.lastName }}</p>
        </div>
      </div>
    </div>

    <!-- Contact Information Section -->
    <div class="space-y-4">
      <div class="flex items-center gap-2 mb-4">
        <mail class="w-5 h-5 text-primary" />
        <h3 class="text-lg font-semibold text-foreground">Contact Information</h3>
      </div>
      
      <!-- Email Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email Address <span class="text-destructive">*</span>
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email address"
          :class="[
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
          ]"
          required
        />
        <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
      </div>
      
      <!-- Phone Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Phone Number <span class="text-destructive">*</span>
        </label>
        <div class="relative">
          <phone class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            v-model="phone"
            type="tel"
            placeholder="Enter your phone number"
            :class="[
              'flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''
            ]"
            required
          />
        </div>
        <p v-if="errors.phone" class="text-sm text-destructive">{{ errors.phone }}</p>
      </div>
    </div>

    <!-- Address Information Section -->
    <div class="space-y-4">
      <div class="flex items-center gap-2 mb-4">
        <map-pin class="w-5 h-5 text-primary" />
        <h3 class="text-lg font-semibold text-foreground">Shipping Address</h3>
      </div>

      <!-- Country Selection -->
      <div class="space-y-2">
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Country <span class="text-destructive">*</span>
        </label>
        
        <div v-if="countriesPending" class="space-y-2">
          <skeleton class="h-10 w-full" />
        </div>
        
        <alert v-else-if="countriesError" variant="destructive">
          <alert-description>
            Error loading countries. Please refresh the page and try again.
          </alert-description>
        </alert>
        
        <select
          v-else
          v-model="selectedCountry"
          :class="[
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            !selectedCountry ? 'text-muted-foreground' : 'text-foreground'
          ]"
          required
        >
          <option value="" disabled>Select your country</option>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>

      <!-- State/Region Selection -->
      <div v-if="selectedCountry" class="space-y-2">
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          State / Region <span class="text-destructive">*</span>
        </label>
        
        <div v-if="statesPending" class="space-y-2">
          <skeleton class="h-10 w-full" />
          <p class="text-sm text-muted-foreground">Loading states for {{ selectedCountry }}...</p>
        </div>
        
        <alert v-else-if="statesError" variant="destructive">
          <alert-description>
            Error loading states for {{ selectedCountry }}. Please try selecting the country again.
          </alert-description>
        </alert>
        
        <select
          v-else-if="states.length"
          v-model="selectedState"
          :class="[
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            !selectedState ? 'text-muted-foreground' : 'text-foreground'
          ]"
          required
        >
          <option value="" disabled>Select your state/region</option>
          <option v-for="state in states" :key="state" :value="state">
            {{ state }}
          </option>
        </select>
        
        <div v-else class="p-3 bg-muted rounded-md">
          <p class="text-sm text-muted-foreground">
            No states/regions found for {{ selectedCountry }}. You can proceed with just the country selected.
          </p>
        </div>
      </div>

      <!-- Street Address -->
      <div class="space-y-2">
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Street Address <span class="text-destructive">*</span>
        </label>
        <textarea
          v-model="address"
          placeholder="Enter your full street address including house number, street name, and any apartment/unit numbers"
          rows="3"
          :class="[
            'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            errors.address ? 'border-destructive focus-visible:ring-destructive' : ''
          ]"
          required
        ></textarea>
        <p v-if="errors.address" class="text-sm text-destructive">{{ errors.address }}</p>
        <p class="text-xs text-muted-foreground">
          Include house number, street name, apartment/unit number if applicable
        </p>
      </div>
    </div>

    <!-- Form Progress Indicator -->
    <card class="bg-muted/30">
      <card-content class="p-4">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Form Completion</span>
          <span :class="[
            'font-medium',
            getCompletionPercentage() === 100 ? 'text-green-600' : 'text-primary'
          ]">
            {{ getCompletionPercentage() }}%
          </span>
        </div>
        <div class="mt-2 w-full bg-secondary rounded-full h-2">
          <div 
            class="bg-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            :style="{ width: `${getCompletionPercentage()}%` }"
          ></div>
        </div>
        <p class="text-xs text-muted-foreground mt-2">
          {{ getCompletionPercentage() === 100 ? 'All required fields completed!' : 'Please fill in all required fields to continue' }}
        </p>
      </card-content>
    </card>
  </div>
</template>