<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Hamburger from '@/assets/icons/Hamburger.vue'
import { useRoute } from "vue-router";
import logo from "@/assets/icons/logo.vue";


const route = useRoute();

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost">
        <Hamburger />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="flex items-center justify-between mt-3"> 
            <nuxt-link to="/" class="font-bold transition-colors flex items-center">
                <logo width="50px" height="50px" />
            </nuxt-link>
            <nuxt-link to="/auth/login">
            <button
              class="px-4 py-2 rounded-full bg-primary text-primary-foreground font-[600] transition-colors flex items-center"
            >
              Login
            </button>
          </nuxt-link>
        </SheetTitle>
      </SheetHeader>
      <div class="flex flex-col items-center justify-center space-y-4 mt-5">
          <nuxt-link
            v-for="item in links"
            :key="item.name"
            :to="item.path"
            class="relative group py-2 transition-colors"
            :class="{
              'text-primary font-[600]': route.path === item.path,
              'hover:text-primary': route.path !== item.path,
            }"
          >
            {{ item.name }}
          </nuxt-link>
        </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button>
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>