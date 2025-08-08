<script setup>
import Sidebar from '@/components/ui/sidebar/Sidebar.vue';
import SidebarHeader from '@/components/ui/sidebar/SidebarHeader.vue';
import SidebarContent from '@/components/ui/sidebar/SidebarContent.vue';
import SidebarFooter from '@/components/ui/sidebar/SidebarFooter.vue';
import SidebarMenu from '@/components/ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from '@/components/ui/sidebar/SidebarMenuItem.vue';

const userLinks = [
  { title: 'Dashboard', url: '/dashboard/users', icon: 'dashboard' },
  { title: 'Profile', url: '/dashboard/users/profile', icon: 'user' },
  { title: 'Orders', url: '/dashboard/users/orders', icon: 'shopping-cart' },
  { title: 'Settings', url: '/dashboard/users/settings', icon: 'settings' },
];
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <div class="flex items-center gap-2 px-4 py-2">
        <img src="" alt="User" class="w-10 h-10 rounded-full border-2 border-orange-400" />
        <span class="font-bold text-orange-700 dark:text-orange-400">John Smith</span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <template v-for="link in userLinks" :key="link.title">
          <SidebarMenuItem :to="link.url">
            <span class="mr-2">
              <i :class="`lucide lucide-${link.icon}`" />
            </span>
            {{ link.title }}
          </SidebarMenuItem>
        </template>
      </SidebarMenu>
      <slot />
    </SidebarContent>
    <SidebarFooter>
      <div class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">&copy; 2025 Hours Ecommerce</div>
    </SidebarFooter>
  </Sidebar>
</template>
