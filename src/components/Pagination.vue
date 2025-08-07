<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate';

defineProps({
    currentPage: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    isFirstPage: { type: Boolean, required: true },
    isLastPage: { type: Boolean, required: true },
});

const emit = defineEmits(['next', 'prev', 'go-to-page']);
</script>

<template>
    <div class="flex justify-center my-10 no-transitions">
        <VueAwesomePaginate
        :total-items="totalItems"
        :items-per-page="5"
        :max-pages-shown="5"
        :model-value="currentPage"
        @click="emit('go-to-page', $event)"
        :hide-prev-next="false"
        >
        <template #prev-button>
            <button 
            :disabled="isFirstPage"
            @click="emit('prev')"
            class="paginate-buttons"
            :class="{ 'disabled-button': isFirstPage }"
            >
            &lt;
            </button>
        </template>
        
        <template #next-button>
            <button 
            :disabled="isLastPage"
            @click="emit('next')"
            class="paginate-buttons"
            :class="{ 'disabled-button': isLastPage }"
            >
            &gt;
            </button>
        </template>
        </VueAwesomePaginate>
    </div>
</template>
