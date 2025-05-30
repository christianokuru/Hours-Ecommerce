<script setup lang="ts">
import {
  ArrowUpDownIcon,
  EllipsisVerticalIcon,
  ListFilterIcon,
  PlusIcon,
} from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps<{
  products: {
    id: string;
    name: string;
    price: number;
    stock: number;
    dateAdded: string;
    status: string;
  }[];
}>();
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex items-center justify-between gap-4 max-sm:flex-col">
      <Tabs default-value="all">
        <TabsList>
          <TabsTrigger
            value="all"
            class="max-sm:text-xs max-sm:px-2 max-sm:py-1"
          >
            All Products
          </TabsTrigger>
          <TabsTrigger
            value="in-stock"
            class="max-sm:text-xs max-sm:px-2 max-sm:py-1"
          >
            In Stock
          </TabsTrigger>
          <TabsTrigger
            value="low-stock"
            class="max-sm:text-xs max-sm:px-2 max-sm:py-1"
          >
            Low Stock
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            class="max-sm:text-xs max-sm:px-2 max-sm:py-1"
          >
            Archived
          </TabsTrigger>
          <TabsTrigger value="add-product" as-child>
            <button class="max-sm:w-6 max-sm:h-6 max-sm:text-xs">
              <PlusIcon class="max-sm:w-4 max-sm:h-4" />
            </button>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div class="flex items-center gap-2 max-sm:gap-2 max-sm:text-xs max-sm:grid max-sm: max-sm:grid-cols-3 max-sm:mx-4">
        <Select default-value="all">
          <SelectTrigger>
            <span class="text-muted-foreground text-sm">Category:</span>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all"> All </SelectItem>
            <SelectItem value="in-stock"> In Stock </SelectItem>
            <SelectItem value="low-stock"> Low Stock </SelectItem>
            <SelectItem value="archived"> Archived </SelectItem>
          </SelectContent>
        </Select>
        <Select default-value="all">
          <SelectTrigger>
            <span class="text-muted-foreground text-sm">Price:</span>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all"> $100-$200 </SelectItem>
            <SelectItem value="in-stock"> $200-$300 </SelectItem>
            <SelectItem value="low-stock"> $300-$400 </SelectItem>
            <SelectItem value="archived"> $400-$500 </SelectItem>
          </SelectContent>
        </Select>
        <Select default-value="all">
          <SelectTrigger>
            <span class="text-muted-foreground text-sm">Status:</span>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all"> In Stock </SelectItem>
            <SelectItem value="in-stock"> Low Stock </SelectItem>
            <SelectItem value="low-stock"> Not Available </SelectItem>
            <SelectItem value="archived"> Archived </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="rounded-lg">
      <Table>
        <TableHeader class="bg-muted/50">
          <TableRow class="!border-0">
            <TableHead class="w-12 rounded-l-lg px-2">
              <Checkbox />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead class="text-right"> Price </TableHead>
            <TableHead class="text-right"> Stock </TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="max-sm:truncate">Date Added</TableHead>
            <TableHead class="rounded-r-lg" />
          </TableRow>
        </TableHeader>
        <TableBody class="**:data-[slot=table-cell]:py-2.5 max-sm:**:data-[slot=table-cell]:py-1.5">
          <TableRow v-for="product in products" :key="product.id">
            <TableCell class="font-medium max-sm:text-sm">
              <Checkbox />
            </TableCell>
            <TableCell class="font-medium max-sm:text-xs">
              {{ product.name }}
            </TableCell>
            <TableCell class="text-right max-sm:text-xs">
              ${{ product.price.toFixed(2) }}
            </TableCell>
            <TableCell class="text-right max-sm:text-xs">
              {{ product.stock }}
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                :class="
                  product.status === 'Low Stock'
                    ? 'border-orange-500 bg-transparent text-orange-500 dark:border-orange-500 dark:bg-transparent dark:text-orange-500'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                "
              >
                {{ product.status }}
              </Badge>
            </TableCell>
            <TableCell>
              {{
                new Date(product.dateAdded).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="size-6">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-end">
      <Pagination :items-per-page="10">
        <PaginationContent>
          <PaginationPrevious href="#" />
          <PaginationItem :value="1"> 1 </PaginationItem>
          <PaginationItem :value="2"> 2 </PaginationItem>
          <PaginationItem :value="3"> 3 </PaginationItem>

          <PaginationEllipsis />

          <PaginationNext href="#" />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
