<script setup lang="ts">
const props = defineProps<{
  minPrice: number | null
  maxPrice: number | null
}>()

const emit = defineEmits(['update:minPrice', 'update:maxPrice'])

const handleMinPriceChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:minPrice', value ? Number(value) : null)
}

const handleMaxPriceChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:maxPrice', value ? Number(value) : null)
}
</script>

<template>
  <div>
    <label class="block text-lg font-medium text-gray-800 mb-3">Rango de precio</label>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label class="block text-sm text-gray-500 mb-1">Mínimo</label>
        <div class="relative">
          <span class="absolute left-3 top-3 text-gray-400">$</span>
          <input
            :value="minPrice"
            @input="handleMinPriceChange"
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
            :value="maxPrice"
            @input="handleMaxPriceChange"
            type="number"
            placeholder="Sin límite"
            class="w-full pl-8 pr-5 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            min="0"
          >
        </div>
      </div>
    </div>
  </div>
</template>