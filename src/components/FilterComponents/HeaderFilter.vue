<script setup lang="ts">

const emit = defineEmits(['close'])

</script>

<template>
        <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div class="flex items-center justify-between">
                <h3 class="text-2xl font-semibold text-gray-800">Filtros avanzados</h3>
                <button 
                @click="emit('close')"
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
</template>