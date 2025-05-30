<script setup lang="ts">
import { AreaChart } from "@/components/ui/chart-area";

// Dummy data showing increasing earnings throughout the current month
const data = [
  { name: "Week 1", total: 200 },
  { name: "Week 2", total: 600 },
  { name: "Week 3", total: 1200 },
  { name: "Week 4", total: 1800 },
  { name: "Week 5", total: 2500 },
];

const yFormatter = (
  tick: number | Date,
  i: number,
  ticks: (number | Date)[]
) => {
  if (typeof tick === "number") {
    return `₦${tick}`;
  }
  return ""; // or format Date if you want
};
</script>

<template>
  <div class="">
    <AreaChart
      :data="data"
      index="name"
      :categories="['total']"
      :colors="['purple']"
      :y-formatter="yFormatter"
    />
  </div>
</template>
