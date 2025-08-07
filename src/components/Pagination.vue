<script setup lang="ts">
import ProductCard from "./ProductCard.vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { VueSpinner } from "vue3-spinners";
import NotFoundProducts from "./NotFoundProducts.vue";

const ITEMS_PER_PAGE = 5;
const MAX_PAGES = 5;
const productStore = useProductStore()

onMounted(async () => {
    await productStore.initialize()
})

const { 
    paginatedProducts, 
    isLoading, 
    error,
    currentPage,
    totalItems,
    isFirstPage,
    isLastPage
} = storeToRefs(productStore)


const { nextPage, prevPage, goToPage } = productStore
</script>

<template>
    <div class="products-container">
        <Transition name="fade" mode="out-in">
            <VueSpinner v-if="isLoading" key="loading" />
        </Transition>

        <Transition name="fade-slide" mode="out-in">
        <div 
            v-if="error && !isLoading" 
            class="error-message"
            key="error"
        >
            Error al cargar productos: {{ error.message }}
        </div>
        </Transition>


        <Transition name="fade-slide" mode="out-in">
        <div 
            v-if="!paginatedProducts.length && !isLoading && !error" 
            class="empty-state"
            key="empty"
        >
            <NotFoundProducts />
        </div>
        </Transition>


        <TransitionGroup 
        name="page-transition"
        tag="div" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
        >
        <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
        />
        </TransitionGroup>


        <Transition name="fade" mode="out-in">
        <div 
            v-if="!isLoading && !error && paginatedProducts.length" 
            class="flex justify-center my-10"
            key="pagination"
        >
            <vue-awesome-paginate
            :total-items="totalItems"
            :items-per-page="ITEMS_PER_PAGE"
            :max-pages-shown="MAX_PAGES"
            v-model="currentPage"
            @click="goToPage"
            :hide-prev-next="false"
            >
            <template #prev-button>
                <button 
                :disabled="isFirstPage"
                @click="prevPage"
                class="paginate-buttons"
                :class="{ 'disabled-button': isFirstPage }"
                >
                &lt;
                </button>
            </template>
            
            <template #next-button>
                <button 
                :disabled="isLastPage"
                @click="nextPage"
                class="paginate-buttons"
                :class="{ 'disabled-button': isLastPage }"
                >
                &gt;
                </button>
            </template>
            </vue-awesome-paginate>
        </div>
        </Transition>
    </div>
</template>
