<script setup lang="ts">
import { ref } from 'vue';
import type { ProductsCart } from '@/types';

defineProps<{
    products: ProductsCart[]
}>();

const emit = defineEmits(['update-quantity', 'remove-item'])


const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    emit('update-quantity', { id, quantity: newQuantity });
};

//Animacion

const lastAddedItemId = ref<number | null>(null);

</script>

<template>
                <div class="max-h-[28rem] overflow-y-auto custom-scrollbar">
                <div v-if="products.length === 0" class="p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p class="mt-3 text-gray-500">Tu carrito está vacío</p>
                    <p class="text-sm text-gray-400">Agrega productos para comenzar</p>
                </div>

                <transition-group 
                    v-else
                    name="list"
                    tag="ul"
                    class="divide-y divide-gray-100"
                >
                    <li 
                        v-for="product in products" 
                        :key="product.id" 
                        class="p-4 hover:bg-gray-50 transition-colors"
                        :class="{ 'bg-emerald-50/50': lastAddedItemId === product.id }"
                    >
                        <div class="flex gap-4">
                            <div class="relative">
                                <img 
                                    :src="product.image" 
                                    :alt="product.title" 
                                    class="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-white p-1"
                                >
                                <span 
                                    v-if="product.quantity > 1"
                                    class="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                >
                                    {{ product.quantity }}
                                </span>
                            </div>

                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between">
                                    <h4 class="text-sm font-semibold text-gray-800 truncate">{{ product.title }}</h4>
                                    <button
                                        @click="emit('remove-item', product.id)"
                                        class="text-gray-400 hover:text-red-500 transition-colors ml-2"
                                        title="Eliminar producto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="mt-2 flex justify-between items-center">
                                    <span class="text-sm font-bold text-emerald-600">${{ product.price.toFixed(2) }} c/u</span>
                                    
                                    <div class="flex items-center space-x-2">
                                        <button
                                            @click="updateQuantity(product.id, product.quantity - 1)"
                                            class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                                            :class="{ 'opacity-50 cursor-not-allowed': product.quantity <= 1 }"
                                            :disabled="product.quantity <= 1"
                                            title="Reducir cantidad"
                                        >
                                            -
                                        </button>
                                        <span class="text-sm w-6 text-center">{{ product.quantity }}</span>
                                        <button
                                            @click="updateQuantity(product.id, product.quantity + 1)"
                                            class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                                            title="Aumentar cantidad"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-2 text-right">
                                    <span class="text-xs font-medium text-gray-500">
                                        Subtotal: <span class="text-emerald-700">${{ (product.price * product.quantity).toFixed(2) }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </transition-group>
            </div>
</template>