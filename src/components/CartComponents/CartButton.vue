<script setup lang="ts">
import { useProductStore } from '@/stores/productStore';
import type { ProductsCart } from '@/types';
import { formatPrice } from '@/helpers';

defineProps<{
    products: ProductsCart[]
}>();

const productStore = useProductStore()

</script>

<template>
                <div v-if="products.length > 0" class="border-t border-gray-200 bg-gray-50">
                <div class="px-6 py-4">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-medium text-gray-600">Subtotal:</span>
                        <span class="text-sm font-semibold">${{ productStore.totalUSD.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-medium text-gray-600">Tasa de cambio:</span>
                        <span class="text-sm font-semibold">BsF {{ productStore.exchangeCurrency2?.price?.toFixed(2) || '--' }}/$</span>
                    </div>
                    <div class="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span class="text-base font-bold text-gray-800">Total:</span>
                        <div class="text-right">
                            <p class="text-lg font-bold text-emerald-600">BsF {{ formatPrice(productStore.totalBsF) }}</p>
                            <p class="text-xs text-gray-500">${{ productStore.totalUSD.toFixed(2) }} USD</p>
                        </div>
                    </div>
                </div>

                <div class="px-6 pb-4">
                    <button
                        class="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Proceder al Pago
                    </button>
                </div>
            </div>
</template>