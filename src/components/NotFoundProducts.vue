<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore()
const localCategory = ref(productStore.filterCategory);
const localMinPrice = ref(productStore.minPriceFilter);
const localMaxPrice = ref(productStore.maxPriceFilter);



const resetFilters = () => {
    localCategory.value = '';
    localMinPrice.value = null;
    localMaxPrice.value = null;
    productStore.resetFilters();
};

</script>


<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        
        <div class="mx-auto h-24 w-24 text-emerald-400 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-full w-full">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        
        <h2 class="mt-6 text-3xl font-extrabold text-emerald-900">
          Productos no encontrados
        </h2>
        
        
        <p class="mt-2 text-sm text-emerald-700">
          Lo sentimos, no pudimos encontrar los productos que estás buscando.
        </p>
        
        
        <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-1">
          <button 
            @click="resetFilters"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            Reiniciar búsqueda
          </button>
          

        </div>
        

        </div>
    </div>
</div>
</template>


<style scoped>
/* Animación personalizada para el bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce {
  animation: bounce 2s infinite;
}
</style>