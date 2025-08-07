<script setup lang="ts">
import DashboardPanel from '@/components/DashboardPanel.vue';
import Filter from '@/components/Filter.vue';
import Header from '@/components/Header.vue';
import ListProducts from '@/components/ListProducts.vue';


</script>

<template>
  <Header />
  <main>
    <div class="p-4">
      <DashboardPanel />
    </div>
    
    <ListProducts />
    <Filter />
  </main>
</template>
