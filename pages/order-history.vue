<script setup>
import { ref } from 'vue';
import { useOrderStore } from '@/stores/order';
import Card from '@/components/ui/card/Card.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Pagination from '@/components/ui/pagination/Pagination.vue';

const orderStore = useOrderStore();
// Example: Replace with real order history fetch
const orders = ref([
  {
    id: 'ORD-20250802-001',
    date: '2025-08-02',
    status: 'Delivered',
    total: 1820.26,
    items: [
      {
        name: 'MacBook Air',
        image: '/public/images/products/macbook-air.png',
        color: 'Black',
        price: 1500.00,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD-20250728-002',
    date: '2025-07-28',
    status: 'Shipped',
    total: 220.00,
    items: [
      {
        name: 'Sweat Pants',
        image: '/public/images/products/sweat-pants.png',
        color: 'Gray',
        price: 110.00,
        quantity: 2,
      },
    ],
  },
]);
const page = ref(1);
const pageSize = 5;
</script>

<template>
  <div class="max-w-4xl mx-auto my-12 p-4 md:p-8">
    <h1 class="text-3xl font-bold mb-8 text-center text-orange-700 dark:text-orange-400">Order History</h1>
    <div v-if="orders.length" class="space-y-6">
      <div v-for="order in orders.slice((page-1)*pageSize, page*pageSize)" :key="order.id">
        <Card class="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-900">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <div class="text-lg font-semibold text-gray-900 dark:text-white">Order #{{ order.id }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Placed on {{ order.date }}</div>
            </div>
            <div class="flex items-center gap-2">
              <Badge :color="order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : 'warning'">
                {{ order.status }}
              </Badge>
              <div class="text-xl font-bold text-orange-700 dark:text-orange-400">${{ order.total.toFixed(2) }}</div>
            </div>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div v-for="item in order.items" :key="item.name + item.color" class="flex items-center py-4 gap-6">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover border border-gray-200" />
              <div class="flex-1">
                <div class="text-base font-semibold text-gray-900 dark:text-white">{{ item.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Color: <span class="font-medium">{{ item.color }}</span></div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Qty: <span class="font-medium">{{ item.quantity }}</span></div>
              </div>
              <div class="text-lg font-bold text-orange-900 dark:text-orange-400">${{ item.price.toFixed(2) }}</div>
            </div>
          </div>
        </Card>
      </div>
      <div class="flex justify-center mt-8">
        <Pagination
          :total="orders.length"
          :page-size="pageSize"
          v-model:page="page"
        />
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400 text-xl">
      <p>No orders found.</p>
    </div>
  </div>
</template>