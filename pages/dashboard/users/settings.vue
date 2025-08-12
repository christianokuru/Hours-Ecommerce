<script setup>
import { ref } from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import UserDashboardSidebarComponent from '~/components/custom/dashboard/UserDashboardSidebarComponent.vue'

definePageMeta({
  layout: false
})

const user = ref({
  name: 'John Doe',
  email: 'johndoe@email.com',
  phone: '+1 555 123 4567',
  address: '123 Main St, New York, NY',
  billing: '456 Market St, Los Angeles, CA',
  notifications: true,
  theme: 'light'
})
</script>

<template>
       <SidebarProvider>
    <UserDashboardSidebarComponent />
    <SidebarInset>
      <!-- HEADER -->
      <header class="flex h-16 items-center gap-2 mt-6 px-4 bg-white dark:bg-gray-900 shadow rounded-lg">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mx-2 h-5" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-3">
        <!-- Account Info -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 md:col-span-2 xl:col-span-2 flex flex-col justify-between">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Account Information</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Full Name</label>
              <input v-model="user.name" type="text" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Email Address</label>
              <input v-model="user.email" type="email" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Phone Number</label>
              <input v-model="user.phone" type="text" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Password</label>
              <input type="password" placeholder="••••••••" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col justify-between">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Preferences</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Email Notifications</span>
              <input v-model="user.notifications" type="checkbox" class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Theme</label>
              <select v-model="user.theme" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col justify-between">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Shipping Address</h2>
          <textarea v-model="user.address" rows="3" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <!-- Billing Address -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col justify-between">
          <h2 class="text-lg font-semibold mb-4 dark:text-white">Billing Address</h2>
          <textarea v-model="user.billing" rows="3" class="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-6 flex justify-end">
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Save Changes</button>
      </div>

    </SidebarInset>
  </SidebarProvider>
</template>