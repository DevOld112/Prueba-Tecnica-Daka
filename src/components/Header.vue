<script setup lang="ts">
import ProductCart from './ProductCart.vue';
import CartModal from './CartModal.vue';
import { useProductStore } from '@/stores/productStore';
import { computed } from 'vue';


const productStore = useProductStore();

const itemCount = computed(() => {
    return productStore.productsCart.reduce((total, product) => total + product.quantity, 0);
});
</script>

<template>
    <header class="bg-emerald-200 shadow-md sticky top-0 z-40">
            <div class="p-4 flex items-center justify-between gap-3  mx-auto">
                <div class="flex items-center gap-4">
                    <img src="/public/logo-shop.png" alt="logo de tienda" class="h-12 w-12 rounded-lg shadow-sm border-2 border-emerald-300">
                    <p class="text-2xl font-bold text-emerald-800 tracking-tight">
                        Daka<span class="text-emerald-600">Shop</span>
                    </p>
                </div>
                
        
        <div class="relative">
            <ProductCart
                :item-count="itemCount"
                @toggle="productStore.toggleCart"
            />
            
            <CartModal
                :is-open="productStore.isCartOpen"
                :products="productStore.productsCart"
                @close="productStore.toggleCart"
            />
        </div>
        </div>
    </header>
</template>