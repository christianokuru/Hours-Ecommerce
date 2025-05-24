<script setup lang="ts">
import { ChevronRight, type LucideIcon } from "lucide-vue-next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { useRoute } from "vue-router";

const route = useRoute();

defineProps<{
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    showChevron?: boolean;
  }[];
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <div v-for="item in items" :key="item.title">
        <!-- If item has children -->
        <Collapsible
          v-if="item.items && item.items.length"
          as-child
          :default-open="item.isActive"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight
                  v-if="item.showChevron !== false"
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="subItem in item.items"
                  :key="subItem.title"
                >
                  <SidebarMenuSubButton as-child>
                    <nuxt-link
                      :to="subItem.url"
                      :class="{
                        'text-orange-500 font-semibold':
                          route.path === subItem.url,
                      }"
                    >
                      <span>{{ subItem.title }}</span>
                    </nuxt-link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <!-- If item has NO children -->
        <SidebarMenuItem v-else>
          <SidebarMenuButton as-child>
            <nuxt-link
              :to="item.url"
              :class="{
                'text-orange-500 font-semibold': route.path === item.url,
              }"
              class="flex items-center gap-2 w-full"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </nuxt-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </SidebarMenu>
  </SidebarGroup>
</template>
