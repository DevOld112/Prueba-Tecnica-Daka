import { defineStore } from 'pinia'
import { ref, computed, watch, inject } from 'vue'
import type { Category, DolarBCV, Monitor, Products, ProductsCart, Toast } from '@/types'
import { getCategories, getProducts } from '@/api/ProductsApi'
import { exchangeRate, testExchange } from '@/helpers'

export const useProductStore = defineStore('product', () => {

  //Toast de notificacion
  const toast = inject<Toast>('toast')

  // Variables Reactivas
  const allProducts = ref<Products[]>([]) 
  const favorites = ref<Products[]>([])
  const categories = ref<Category[]>([])
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  const exchangeCurrency = ref<DolarBCV>()
  const exchangeCurrency2 = ref <Monitor>()
  const productsCart = ref<ProductsCart[]>([])
  const isCartOpen = ref<boolean>(false)
  const total = ref<number>(0)
  
  // Filtros
  const filterCategory = ref<string>('')
  const minPriceFilter = ref<number | null>(null)
  const maxPriceFilter = ref<number | null>(null)

  // Productos filtrados
  const filteredProducts = computed(() => {
    return allProducts.value.filter(product => {
      // Filtro por categoría
      const matchesCategory = !filterCategory.value || 
            product.category === filterCategory.value
      
      // Filtro por precio
      const matchesMinPrice = !minPriceFilter.value || 
            product.price >= minPriceFilter.value
      const matchesMaxPrice = !maxPriceFilter.value || 
            product.price <= maxPriceFilter.value
      
      return matchesCategory && matchesMinPrice && matchesMaxPrice
    })
  })

  // Getters
  const products = computed(() => filteredProducts.value)
  const getFavorites = computed(() => favorites.value)
  const totalItems = computed(() => filteredProducts.value.length)
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
  const showExchange = computed(() => exchangeCurrency.value) 

  const totalUSD = computed(() => {
  return productsCart.value.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
});

  const totalBsF = computed(() => {
    const exchangeRate = exchangeCurrency2.value?.price || 1;
    return totalUSD.value * exchangeRate;
});

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredProducts.value.slice(start, end)
  })

  const averagePrice = computed(() => {
    if (filteredProducts.value.length === 0) return 0
    const sum = filteredProducts.value.reduce((total, product) => total + product.price, 0)
    return parseFloat((sum / filteredProducts.value.length).toFixed(2))
  })

  // Acciones
  const applyFilters = (category: string, minPrice: number | null, maxPrice: number | null) => {
    filterCategory.value = category
    minPriceFilter.value = minPrice
    maxPriceFilter.value = maxPrice
    currentPage.value = 1 
  }

  const resetFilters = () => {
    filterCategory.value = ''
    minPriceFilter.value = null
    maxPriceFilter.value = null
    currentPage.value = 1
  }

  const buttonFavorites = (product: Products) => {
    if(!favorites.value.includes(product)){
      favorites.value.push(product)
    }else {
      favorites.value = favorites.value.filter(p => p.id !== product.id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }

  const addProductCart = (product:ProductsCart) =>{
    if(productsCart.value.includes(product)){
      productsCart.value[product.quantity++]
    } else {
        productsCart.value.push(product)
        productsCart.value[product.quantity = 1]
    }

    localStorage.setItem('cartProducts', JSON.stringify(productsCart.value))

    toast?.open({
      message: 'Producto agregado correctamente',
      type: 'success'
    })

}

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }
  


  const loadProducts = async () => {
    try {
      isLoading.value = true
      error.value = null
      allProducts.value = await getProducts()
      categories.value = await getCategories()
      exchangeCurrency.value = await exchangeRate()
      exchangeCurrency2.value = await testExchange()
      
    } catch (err) {
      error.value = err as Error
      console.error("Error loading products:", err)
    } finally {
      isLoading.value = false
    }
  }

    const loadFavorites = (): void => {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        favorites.value = JSON.parse(saved) as Products[];
      }
  };
    
    const loadCartProducts = (): void =>{
      const saved = localStorage.getItem('cartProducts');
      if(saved){
        productsCart.value = JSON.parse(saved) as ProductsCart[]
      }
    }

  // Resto de acciones...
  const initialize = async () =>{ 
    await loadProducts()
    loadFavorites()
    loadCartProducts()
  }
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
  const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const updateQuantity = ({ id, quantity }: { id: number; quantity: number }) => {
  const product = productsCart.value.find(product => product.id === id);
  if (product) {
    product.quantity = quantity;
  }
};

const removeItem = (id: number) => {
  productsCart.value = productsCart.value.filter(product => product.id !== id);
};



  const refresh = () => loadProducts()

  // Watchers
  watch(allProducts, () => {
    currentPage.value = 1
  })



  return {
    // Variables reactivas
    allProducts, 
    products,   
    favorites,
    categories,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    filterCategory,
    minPriceFilter,
    maxPriceFilter,
    exchangeCurrency,
    exchangeCurrency2,
    productsCart,
    isCartOpen,
    total,
    
    // Getters
    totalItems,
    totalPages,
    paginatedProducts,
    isFirstPage: computed(() => currentPage.value === 1),
    isLastPage: computed(() => currentPage.value === totalPages.value),
    averagePrice,
    showExchange,
    getFavorites,
    totalUSD,
    totalBsF,
 
    
    
    // Acciones
    loadProducts,
    initialize,
    goToPage,
    nextPage,
    prevPage,
    refresh,
    applyFilters,
    resetFilters,
    buttonFavorites,
    toggleCart,
    updateQuantity,
    removeItem,
    addProductCart
  }
})