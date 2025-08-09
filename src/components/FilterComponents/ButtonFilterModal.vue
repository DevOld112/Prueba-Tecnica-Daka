<script setup lang="ts">
import { ref } from 'vue';

defineProps<({
    isFilterOpen: boolean
})>()
const emit = defineEmits(['openModal'])

</script>

<template>
    <button 
        @click="emit('openModal')"
        class="p-4 bg-white rounded-full hover:bg-gray-50 transition-all ease-in 0.5s hover:scale-110 shadow-lg border border-gray-200 hover:shadow-xl flex items-center justify-center"
        :class="{ 'bg-gray-50 ring-2 ring-blue-500': isFilterOpen }"
        aria-label="Filtros"
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#4f46e5">
            <path d="M440-160q-17 0-28.5-11.5T400-200v-240L163.33-742q-14.33-18-4.16-38 10.16-20 32.83-20h576q22.67 0 32.83 20 10.17 20-4.16 38L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-286.67 226-286.66H254l226 286.66Zm0 0Z"/>
        </svg>
    </button>
</template>