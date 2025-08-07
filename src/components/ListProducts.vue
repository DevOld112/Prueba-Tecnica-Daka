<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductCard from './ProductCard.vue';
import Pagination from './Pagination.vue';
import NotFoundProducts from './NotFoundProducts.vue';
import { VueSpinnerBall } from 'vue3-spinners';
import { storeToRefs } from 'pinia';


const productStore = useProductStore();
const { 
    paginatedProducts, 
    isLoading, 
    error,
    isFirstPage,
    isLastPage,
    totalItems,
    currentPage
} = storeToRefs(productStore);

onMounted(async() => {
    await productStore.initialize();
})

</script>

<template>
    <div class="mb-8">
        <h1 class="text-center text-2xl font-bold text-emerald-800">Nuestros Productos</h1>
    </div>

    <div v-if="isLoading" class="flex justify-center mt-20">
        <VueSpinnerBall size="80" color="green" />
    </div>

    <div v-else class="products-container">
    <Transition name="fade" mode="out-in">
        <div v-if="error" class="error-message" key="error">
            Error al cargar productos: {{ error.message }}
        </div>
    </Transition>

    <Transition name="fade-slide" mode="out-in">
        <div v-if="!paginatedProducts.length && !error" class="empty-state" key="empty">
            <NotFoundProducts />
        </div>
    </Transition>

    <TransitionGroup 
        name="product-transition"
        tag="div" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
    >
        <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
        />
    </TransitionGroup>
    
    <Pagination
        v-if="!isLoading && !error && paginatedProducts.length"
        :current-page="currentPage"
        :total-items="totalItems"
        :is-first-page="isFirstPage"
        :is-last-page="isLastPage"
        @next="productStore.nextPage"
        @prev="productStore.prevPage"
        @go-to-page="productStore.goToPage"
    />
  </div>
</template>

