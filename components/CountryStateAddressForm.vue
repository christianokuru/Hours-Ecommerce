<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'

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

// Watch all form fields and emit the data on every change.
// This is more robust than waiting for a parent to call a method.
watch([firstName, lastName, email, phone, address, selectedCountry, selectedState], () => {
  emit('update:formData', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    country: selectedCountry.value,
    state: selectedState.value
  })
}, { deep: true }) // Use deep: true for nested objects if you had them

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

</script>

<template>
 <form class="space-y-6 w-full">
  <!-- All your form fields here -->
  <div class="flex gap-4 mt-6">
    <div class="w-1/2">
      <label class="block text-sm font-medium mb-1">First Name</label>
      <input
        v-model="firstName"
        type="text"
        placeholder="First name"
        class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
      />
    </div>
    <div class="w-1/2">
      <label class="block text-sm font-medium mb-1">Last Name</label>
      <input
        v-model="lastName"
        type="text"
        placeholder="Last name"
        class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
      />
    </div>
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Phone</label>
    <input
      v-model="phone"
      type="tel"
      placeholder="Phone number"
      class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Country</label>
    <div v-if="countriesPending">Loading countries...</div>
    <div v-else-if="countriesError" class="text-red-500">Error loading countries.</div>
    <select
      v-else
      v-model="selectedCountry"
      class="w-full p-3 border border-gray-300 rounded text-black"
    >
      <option value="" disabled>Select country</option>
      <option v-for="country in countries" :key="country" :value="country">
        {{ country }}
      </option>
    </select>
  </div>
  <div v-if="selectedCountry">
    <label class="block text-sm font-medium mb-1">State / Region</label>
    <div v-if="statesPending">Loading states...</div>
    <div v-else-if="statesError" class="text-red-500">Error loading states.</div>
    <select
      v-else-if="states.length"
      v-model="selectedState"
      class="w-full p-3 border border-gray-300 rounded text-black"
    >
      <option value="" disabled>Select state</option>
      <option v-for="state in states" :key="state" :value="state">
        {{ state }}
      </option>
    </select>
    <div v-else>No states found for this country.</div>
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Address</label>
    <input
      v-model="address"
      type="text"
      placeholder="Street address, house no., etc."
      class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
    />
  </div>
 </form>
</template>
