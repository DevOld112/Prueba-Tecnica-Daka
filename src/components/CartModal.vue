<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import CartHeader from './CartComponents/CartHeader.vue';
import CartContent from './CartComponents/CartContent.vue';
import CartButton from './CartComponents/CartButton.vue';
import type { ProductsCart } from '@/types';

const productStore = useProductStore();

defineProps<{
    products: ProductsCart[]
    isOpen: boolean
}>();

const emit = defineEmits(['close']);

const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        emit('close');
    }
};

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});


</script>

<template>
    <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-10"
    >
        <div
            v-if="isOpen"
            ref="dropdownRef"
            class="fixed top-16 right-4 w-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 overflow-hidden transform-gpu"
        >
            <!-- Header -->
                <CartHeader
                    @close="productStore.toggleCart"
                />

            <!-- Contenido -->
                <CartContent
                    :products="products"
                    @remove-item="productStore.removeItem"
                    @update-quantity="productStore.updateQuantity"
                />

            <!-- Resumen y botón de compra -->
                <CartButton 
                    :products="products"
                />
        </div>
    </transition>
</template>
