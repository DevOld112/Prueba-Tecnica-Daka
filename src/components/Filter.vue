<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { translateCategory } from '@/helpers';

const productStore = useProductStore();
const isFilterOpen = ref(false);

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const localCategory = ref(productStore.filterCategory);
const localMinPrice = ref(productStore.minPriceFilter);
const localMaxPrice = ref(productStore.maxPriceFilter);

const applyFilters = () => {
  productStore.applyFilters(
    localCategory.value,
    localMinPrice.value,
    localMaxPrice.value
  );
  isFilterOpen.value = false;
};

const resetFilters = () => {
  localCategory.value = '';
  localMinPrice.value = null;
  localMaxPrice.value = null;
  productStore.resetFilters();
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-30">
    <!-- Botón del filtro -->
    <button 
      @click="toggleFilter"
      class="p-4 bg-white rounded-full hover:bg-gray-50 transition-all ease-in 0.5s hover:scale-110 shadow-lg border border-gray-200 hover:shadow-xl flex items-center justify-center"
      :class="{ 'bg-gray-50 ring-2 ring-blue-500': isFilterOpen }"
      aria-label="Filtros"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#4f46e5">
        <path d="M440-160q-17 0-28.5-11.5T400-200v-240L163.33-742q-14.33-18-4.16-38 10.16-20 32.83-20h576q22.67 0 32.83 20 10.17 20-4.16 38L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-286.67 226-286.66H254l226 286.66Zm0 0Z"/>
      </svg>
    </button>

    <!--Cerrando modal al hacer click fuera de el-->
    <Transition name="fade">
      <div 
        v-if="isFilterOpen"
        class="fixed inset-0 z-20"
        @click="isFilterOpen = false"
      ></div>
    </Transition>

    <!-- Panel de filtros-->
    <Transition name="modal">
      <div 
        v-if="isFilterOpen"
        class="fixed z-30 bottom-32 right-8 w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden transform transition-all"
        style="max-height: calc(100vh - 100px)"
      >
      
        <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-semibold text-gray-800">Filtros avanzados</h3>
            <button 
              @click="isFilterOpen = false"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-1">Personaliza tu búsqueda con estos filtros</p>
        </div>

        
        <div class="overflow-y-auto p-6 space-y-8" style="max-height: calc(100vh - 220px)">
          <!-- filtros por categorias -->
          <div>
            <label class="block text-lg font-medium text-gray-800 mb-3">Categoría</label>
            <select 
              v-model="localCategory"
              class="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            >
              <option value="">Todas las categorías</option>
              <option 
                v-for="category in productStore.categories"
                :key="category"
                :value="category"
                class="py-2"
              >
                {{ translateCategory(category) }}
              </option>
            </select>
          </div>

          <!-- Filtro por precio -->
          <div>
            <label class="block text-lg font-medium text-gray-800 mb-3">Rango de precio</label>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-sm text-gray-500 mb-1">Mínimo</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    v-model.number="localMinPrice"
                    type="number"
                    placeholder="0"
                    class="w-full pl-8 pr-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    min="0"
                  >
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1">Máximo</label>
                <div class="relative">
                  <span class="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    v-model.number="localMaxPrice"
                    type="number"
                    placeholder="Sin límite"
                    class="w-full pl-8 pr-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    min="0"
                  >
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- actions buttons -->
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between">
          <button
            @click="resetFilters"
            class="px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Limpiar todo
          </button>
          <button
            @click="applyFilters"
            class="px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Aplicar filtros
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>