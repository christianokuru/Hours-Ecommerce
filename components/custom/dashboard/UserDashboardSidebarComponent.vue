<script setup lang="ts">


import {
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
import profilePic from "@/assets/images/profile.png";

// This is sample data.
const data = {
  user: {
    name: "Johnny",
    email: "johnny@gmail.com",
    avatar: profilePic,
  },
  teams: [
    {
      name: "User Dashboard",
      logo: logo,
      plan: "Johnny",
    },
  ],
  navMain: [
    {
      title: "Dashboard Home",
      url: "/dashboard/users/",
      icon: ChartNoAxesCombined,
      isActive: false,
      showChevron: false,
    },

    {
      title: "Orders",
      url: "/dashboard/users/orders",
      showChevron: false,
      icon: ShoppingCart,
    },
    {
      title: "Payments and Transactions",
      url: "/dashboard/users/",
      icon: CreditCard,
      showChevron: false,
      
    },
    {
      title: "Settings",
      url: "/dashboard/users/settings",
      icon: Settings2,
      showChevron: true,
    },
  ],
};
</script>

<template>
  <sidebar>
    <div class="mt-[6rem]"></div>
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
