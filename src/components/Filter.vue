<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ButtonFilterModal from './FilterComponents/ButtonFilterModal.vue';
import HeaderFilter from './FilterComponents/HeaderFilter.vue';
import CategoryFilter from './FilterComponents/CategoryFilter.vue';
import PriceFilter from './FilterComponents/PriceFilter.vue';
import ActionButtonsFilter from './FilterComponents/ActionButtonsFilter.vue';

const productStore = useProductStore();

const isFilterOpen = ref(false);

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const selectedCategory = ref(productStore.filterCategory);
const minPrice = ref<number | null>(productStore.minPriceFilter)
const maxPrice = ref<number | null>(productStore.maxPriceFilter)

const applyFilters = () => {
  productStore.applyFilters(
    selectedCategory.value,
    minPrice.value,
    maxPrice.value
  );
  isFilterOpen.value = false;
};

const resetFilters = () => {
  selectedCategory.value = '';
  minPrice.value = null;
  maxPrice.value = null;
  productStore.resetFilters();
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-30">
    <ButtonFilterModal
      @open-modal="toggleFilter"
      :is-filter-open="isFilterOpen"
    />


    <Transition name="fade">
      <div 
        v-if="isFilterOpen"
        class="fixed inset-0 z-20"
        @click="isFilterOpen = false"
      ></div>
    </Transition>


    <Transition name="modal">
      <div 
        v-if="isFilterOpen"
        class="fixed z-30 bottom-32 right-8 w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden transform transition-all"
        style="max-height: calc(100vh - 100px)"
      >
        <HeaderFilter
        @close="toggleFilter"
        />

        <div class="overflow-y-auto p-6 space-y-8" style="max-height: calc(100vh - 220px)">
          <CategoryFilter
          v-model:selected-category="selectedCategory"
          />

          <PriceFilter
              v-model:min-price="minPrice"
              v-model:max-price="maxPrice"
          
          />


        </div>
            <ActionButtonsFilter 
            @reset-filter="resetFilters"
            @filter-products="applyFilters"
            />
      </div>
    </Transition>
  </div>
</template>

