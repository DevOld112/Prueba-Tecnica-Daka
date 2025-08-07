<script setup lang="ts">
import { useProducts } from '@/composables/useProducts';
import { VueSpinnerBall } from 'vue3-spinners';
import Pagination from './Pagination.vue';

const { isLoading } = useProducts()


</script>

<template>
    <div class="mb-8">
        <h1 class="text-center text-2xl font-bold text-emerald-800">Nuestros Productos</h1>
    </div>

    <div v-if="isLoading" class="flex justify-center mt-20">
        <VueSpinnerBall size="80" color="green" />
        
    </div>

    <div v-else class="">
        <Pagination
        />
    </div>
</template>