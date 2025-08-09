<script setup lang="ts">
import { computed } from 'vue';
import type { Products, ProductsCart } from '@/types';
import { useProductStore } from '@/stores/productStore';
import { translateCategory } from '@/helpers';
import { formatPrice } from '@/helpers';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    product: ProductsCart 
}>();

const productStore = useProductStore();
const { exchangeCurrency2, getFavorites } = storeToRefs(productStore);

const translatedCategory = computed(() => translateCategory(props.product.category));

const isFavorite = computed(() => 
    getFavorites.value.some(fav => fav.id === props.product.id)
);

const formatBsFPrice = (priceUSD: number) => {
    if (!exchangeCurrency2.value?.price) return '--,--';
    const total = exchangeCurrency2.value.price * priceUSD;
    return formatPrice(total);
};

const toggleFavorite = () => {
    productStore.buttonFavorites(props.product);
}

const addProduct = (product: ProductsCart) => {
    productStore.addProductCart(product)
}
</script>

<template>
    <article class="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:scale-[1.02] relative">

        <button 
            @click.stop="addProduct(product)"
            class="absolute top-2 left-2 p-2 bg-white/80 rounded-full z-10 hover:bg-gray-100 transition-colors"
            aria-label="Añadir a favoritos"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#0000F5"><path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
        </button>
        
        <button 
            @click.stop="toggleFavorite"
            class="absolute top-2 right-2 p-2 bg-white/80 rounded-full z-10 hover:bg-gray-100 transition-colors"
            aria-label="Añadir a favoritos"
        >
            <span v-if="isFavorite" class="text-red-500 text-xl">❤️</span>
            <span v-else class="text-gray-300 text-xl hover:text-red-300">🤍</span>
        </button>

        <div class="h-48 w-full flex items-center justify-center bg-white p-4">
            <img 
                :src="product.image" 
                :alt="product.title"
                class="max-h-full max-w-full object-contain"
                loading="lazy"
            />
        </div>

        <div class="flex flex-col flex-grow p-4">
            <div class="flex justify-between items-start mb-3 min-h-[3.5rem]">
                <h3 class="font-bold text-emerald-800 line-clamp-2 flex-grow pr-2">{{ product.title }}</h3>
                
                <div class="flex flex-col items-end ml-2 min-w-[110px]">
                    <div class="flex items-baseline justify-end">
                        <span class="text-xs text-gray-500 mr-1">USD</span>
                        <span class="font-bold text-emerald-600 whitespace-nowrap text-lg">
                            ${{ product.price.toFixed(2) }}
                        </span>
                    </div>
                    
                    <div class="mt-1 flex items-baseline justify-end bg-emerald-50/60 px-2 py-1 rounded-lg">
                        <span class="text-xs text-emerald-700 mr-1">BsF</span>
                        <span class="font-bold text-emerald-800 whitespace-nowrap text-md">
                            {{ formatBsFPrice(product.price) }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center mt-auto">
                <span class="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    {{ translatedCategory }}
                </span>
                
                <div class="flex items-center">
                    <span class="text-amber-500 mr-1">★</span>
                    <span class="text-sm text-gray-700">
                        {{ product.rating.rate }} ({{ product.rating.count }})
                    </span>
                </div>
            </div>
        </div>
    </article>
</template>