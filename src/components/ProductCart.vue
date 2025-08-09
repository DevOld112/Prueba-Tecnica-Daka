<script setup lang="ts">

defineProps<{
    itemCount: number;
}>();

const emit = defineEmits(['toggle']);

const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    emit('toggle');
};

</script>

<template>
    <div class="relative">
        <button 
        @click="handleClick"
        class="p-2 rounded-full hover:bg-emerald-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        aria-label="Carrito de compras"
        >
        <div class="relative">
            <div 
            v-if="itemCount > 0" 
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse"
            >
            {{ itemCount }}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="#48752C">
            <path d="M284.53-80.67q-30.86 0-52.7-21.97Q210-124.62 210-155.47q0-30.86 21.98-52.7Q253.95-230 284.81-230t52.69 21.98q21.83 21.97 21.83 52.83t-21.97 52.69q-21.98 21.83-52.83 21.83Zm400 0q-30.86 0-52.7-21.97Q610-124.62 610-155.47q0-30.86 21.98-52.7Q653.95-230 684.81-230t52.69 21.98q21.83 21.97 21.83 52.83t-21.97 52.69q-21.98 21.83-52.83 21.83ZM238.67-734 344-515.33h285.33l120-218.67H238.67ZM206-800.67h589.38q22.98 0 34.97 20.84 11.98 20.83.32 41.83L693.33-490.67q-11 19.34-28.87 30.67-17.87 11.33-39.13 11.33H324l-52 96h487.33V-286H278q-43 0-63-31.83-20-31.84-.33-68.17l60.66-111.33-149.33-316H47.33V-880h121.34L206-800.67Zm138 285.34h285.33H344Z"/>
            </svg>
        </div>
        </button>
    </div>
</template>