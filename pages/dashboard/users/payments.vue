<script setup lang="ts">
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

interface Payment {
  id: string
  date: string
  method: string
  last4: string
  amount: string
  status: string
}

interface MethodIcons {
  [key: string]: string
}

const payments = ref<Payment[]>([
  {
    id: 'TXN-98765',
    date: '2024-08-01',
    method: 'Visa',
    last4: '4321',
    amount: '$120.00',
    status: 'Completed',
  },
  {
    id: 'TXN-98764',
    date: '2024-07-28',
    method: 'PayPal',
    last4: '',
    amount: '$89.99',
    status: 'Pending',
  },
  {
    id: 'TXN-98763',
    date: '2024-07-20',
    method: 'Bank Transfer',
    last4: '',
    amount: '$450.50',
    status: 'Failed',
  },
])


function downloadReceipt(payment: Payment) {
  const content = `Payment Receipt\n\nTransaction ID: ${payment.id}\nDate: ${payment.date}\nMethod: ${payment.method}${
    payment.last4 ? ' •••• ' + payment.last4 : ''
  }\nAmount: ${payment.amount}\nStatus: ${payment.status}`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `receipt-${payment.id}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const methodIcons: MethodIcons = {
  Visa: '💳',
  MasterCard: '💳',
  PayPal: '🅿️',
  'Bank Transfer': '🏦',
}
</script>

<template>
  <SidebarProvider>
    <UserDashboardSidebarComponent />
    <SidebarInset>
      <header
        class="mt-6 flex h-16 items-center gap-2 rounded-lg bg-white px-4 shadow dark:bg-gray-900"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mx-2 h-5" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">User Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Payment History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div class="mt-3 min-h-screen bg-gray-50 p-6 dark:bg-gray-950">
        <div
          class="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <h1 class="text-2xl font-bold dark:text-white">Payment History</h1>
          <div class="flex gap-3">
            <input
              type="text"
              placeholder="Search transactions..."
              class="rounded-lg border bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <select
              class="rounded-lg border bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option>Status: All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <input
              type="date"
              class="rounded-lg border bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div
          class="overflow-x-auto rounded-lg bg-white shadow dark:bg-gray-900"
        >
          <table class="w-full text-sm">
            <thead
              class="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              <tr>
                <th class="px-4 py-3 text-left">Transaction ID</th>
                <th class="px-4 py-3 text-left">Date</th>
                <th class="px-4 py-3 text-left">Method</th>
                <th class="px-4 py-3 text-left">Amount</th>
                <th class="px-4 py-3 text-left">Status</th>
                <th class="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="p in payments"
                :key="p.id"
                class="border-b transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <td class="px-4 py-3 font-medium dark:text-white">
                  {{ p.id }}
                </td>
                <td class="px-4 py-3 dark:text-gray-200">{{ p.date }}</td>
                <td class="flex items-center gap-2 px-4 py-3 dark:text-gray-200">
                  <span class="text-lg">{{ methodIcons[p.method] }}</span>
                  <span>{{ p.method }}<span v-if="p.last4"> •••• {{ p.last4 }}</span></span>
                </td>
                <td class="px-4 py-3 font-semibold text-gray-800 dark:text-white">
                  {{ p.amount }}
                </td>
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'rounded-full px-2 py-1 text-xs font-semibold',
                      p.status === 'Completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : p.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : p.status === 'Failed'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            : '',
                    ]"
                  >
                    {{ p.status }}
                  </span>
                </td>
                <td class="flex gap-2 px-4 py-3">
                  <button
                    class="rounded bg-blue-100 px-3 py-1 text-xs text-blue-700 transition hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                    disabled
                  >
                    View
                  </button>
                  <button
                    class="rounded bg-gray-100 px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    @click="downloadReceipt(p)"
                  >
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>


</template>