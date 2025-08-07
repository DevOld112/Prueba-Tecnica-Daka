<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { testExchange, translateCategory } from '@/helpers';
import { storeToRefs } from 'pinia';
import { formatPrice } from '@/helpers';

const productStore = useProductStore();
const { products, averagePrice, categories, exchangeCurrency2 } = storeToRefs(productStore);

</script>

<template>
    <section class="bg-white rounded-xl mt-10  p-6 shadow-lg mb-8 border border-gray-100">
        <header class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-1">Panel de Información</h2>
            <p class="text-sm text-gray-500 font-medium">Resumen estadístico del inventario</p>
            <div class="mt-4 border-t border-gray-100"></div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-blue-800">Total de Productos</p>
                        <p class="text-2xl font-bold text-gray-800 mt-1">{{ products.length }}</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                </div>
                <p class="text-xs text-blue-600 mt-2">+{{ Math.floor(products.length/10) }}% último mes</p>
            </div>

            
            <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-green-800">Precio Promedio</p>
                        <p class="text-2xl font-bold text-gray-800 mt-1">${{ averagePrice.toLocaleString() }}</p>
                    </div>
                    <div class="bg-green-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <div>
                        <p class="text-sm font-medium text-green-800">Tasa Dolar BCV</p>
                            <p class="text-2xl font-bold text-gray-800 mt-1">
                                {{ exchangeCurrency2 ? formatPrice(exchangeCurrency2.price) : '--,--' }} BSF
                            </p>
                    </div>

                    
                    <div class="bg-green-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 24 24">
                    <!-- Círculo con borde -->
                    <circle cx="12" cy="12" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Texto VES con diseño compacto -->
                    <text 
                        x="12" 
                        y="15" 
                        font-family="Arial" 
                        font-size="10" 
                        font-weight="bold" 
                        text-anchor="middle" 
                        fill="currentColor"
                        letter-spacing="0.5"
                    >
                        <tspan x="12" dy="0">VES</tspan>
                    </text>
                    
                    <!-- Líneas decorativas -->
                    <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="1" opacity="0.3"/>
                    <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" stroke-width="1" opacity="0.3"/>
                    </svg>
                    </div>
                </div>

                    <div class="flex justify-around">
                    <p class="text-xs text-green-600 mt-2">USD · Precio base</p>
                    <p class="text-xs text-green-600 mt-2">
                        BSF · Última actualización: {{ new Date().toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
                    </p>
                    </div>
            </div>

            

            
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-purple-800">Categorías</p>
                        <p class="text-2xl font-bold text-gray-800 mt-1">{{ categories.length }}</p>
                    </div>
                    <div class="bg-purple-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1 mt-2">
                    <span v-for="(category, index) in categories.slice(0, 4)" :key="index" 
                        class="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {{ translateCategory(category) }}
                    </span>
                    <span v-if="categories.length > 5" class="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        +{{ categories.length - 3 }} más
                    </span>
                </div>
            </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-500">
            Última actualización: {{ new Date().toLocaleString() }}
        </div>
    </section>
</template>