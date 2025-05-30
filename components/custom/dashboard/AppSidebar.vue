<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import {
  BookOpen,
  Settings2,
  ChartNoAxesCombined,
  ShoppingCart,
  CreditCard,
} from "lucide-vue-next";
import NavMain from "@/components/NavMain.vue";
import NavProjects from "@/components/NavProjects.vue";
import NavUser from "@/components/NavUser.vue";
import TeamSwitcher from "@/components/TeamSwitcher.vue";
import logo from "@/assets/icons/logo.vue";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { show } from "@unovis/ts/components/tooltip/style";
import profilePic from "@/assets/images/profile.png";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

// This is sample data.
const data = {
  user: {
    name: "Johnny",
    email: "johnny@gmail.com",
    avatar: profilePic,
  },
  teams: [
    {
      name: "Admin Dashboard",
      logo: logo,
      plan: "Johnny",
    },
  ],
  navMain: [
    {
      title: "Dashboard Home",
      url: "/dashboard/admin/",
      icon: ChartNoAxesCombined,
      isActive: false,
      showChevron: false,
    },
    {
      title: "Products",
      url: "/dashboard/admin/products",
      icon: ShoppingCart,
      isActive: true,
      showChevron: true,
      items: [
        {
          title: "Add Product",
          url: "/dashboard/admin/products",
        },
        {
          title: "Edit Product",
          url: "#",
        },
        {
          title: "Delete Product",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/admin/orders",
      icon: BookOpen,
      showChevron: false,
      // items: [
      //   {
      //     title: 'Introduction',
      //     url: '#',
      //   },
      //   {
      //     title: 'Get Started',
      //     url: '#',
      //   },
      //   {
      //     title: 'Tutorials',
      //     url: '#',
      //   },
      //   {
      //     title: 'Changelog',
      //     url: '#',
      //   },
      // ],
    },
    {
      title: "Payments and Transactions",
      url: "#",
      icon: CreditCard,
      showChevron: false,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      showChevron: true,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};
</script>

<template>
  <sidebar v-bind="props">
    <sidebar-header>
      <team-switcher :teams="data.teams" />
    </sidebar-header>
    <sidebar-content>
      <nav-main :items="data.navMain" :show-chevron="true" />
    </sidebar-content>
    <sidebar-footer>
      <nav-user :user="data.user" />
    </sidebar-footer>
    <sidebar-rail />
  </sidebar>
</template>
