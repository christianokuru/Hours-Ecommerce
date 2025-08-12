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
import DarkModeComponent from "@/components/custom/website/DarkModeComponent.vue";

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
      <header class="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="flex h-16 items-center gap-4 px-6">
            <sidebar-trigger class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" />
            <separator orientation="vertical" class="h-6 bg-slate-200 dark:bg-slate-700" />
            <breadcrumb>
              <breadcrumb-list>
                <breadcrumb-item class="hidden md:block">
                  <breadcrumb-link href="#" class="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    User Dashboard
                  </breadcrumb-link>
                </breadcrumb-item>
                <breadcrumb-separator class="hidden md:block text-slate-400" />
                <breadcrumb-item>
                  <breadcrumb-page class="text-slate-900 dark:text-white font-medium">
                    User Settings
                  </breadcrumb-page>
                </breadcrumb-item>
              </breadcrumb-list>
            </breadcrumb>
            
            <!-- User Greeting -->
            <div class="ml-auto hidden sm:flex items-center gap-3">
              <div class="flex items-center space-x-4 text-right">
                <div>
                  <dark-mode-component />
                </div>
               <div class="flex flex-col">
                <p class="text-sm font-medium text-slate-900 dark:text-white">Welcome back!</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Monday, Dec 12, 2024</p>
               </div>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
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