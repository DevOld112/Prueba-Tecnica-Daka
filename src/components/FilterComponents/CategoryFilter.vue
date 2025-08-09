<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { translateCategory } from '@/helpers';

const props = defineProps<{
    selectedCategory: string
}>();

const productStore = useProductStore()

const emit = defineEmits(['update:selectedCategory']);

const localCategory = ref(props.selectedCategory);


watch(localCategory, (newValue) => {
    emit('update:selectedCategory', newValue);
});
</script>

<template>
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
</template>