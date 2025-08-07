import { ref, computed, watch, onMounted } from "vue";
import type { Category, Products } from "@/types";
import { getCategories, getProducts } from "@/api/ProductsApi";

export const useProducts = (itemsPerPage = 5) => {

    const products = ref<Products[]>([]);
    const isLoading = ref<boolean>(true);
    const error = ref<Error | null>(null);
    
    

    const currentPage = ref(1);
    const totalItems = computed(() => products.value.length);
    

    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return products.value.slice(start, end);
    });

    const totalPages = computed(() => 
        Math.ceil(totalItems.value / itemsPerPage)
    );

    const isFirstPage = computed(() => currentPage.value === 1);
    const isLastPage = computed(() => currentPage.value === totalPages.value);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        }
    };

    const nextPage = () => !isLastPage.value && currentPage.value++;
    const prevPage = () => !isFirstPage.value && currentPage.value--;


    watch(products, () => {
        currentPage.value = 1;
    });

    const loadProducts = async () => {
        try {
        isLoading.value = true;
        error.value = null;
        products.value = await getProducts();

        } catch (err) {
        error.value = err as Error;
        console.error("Error loading products:", err);
        } finally {
        isLoading.value = false;
        }
    };

    onMounted(loadProducts);

return {

    products,
    paginatedProducts,
    isLoading,
    error,
    currentPage,
    totalItems,
    totalPages,
    isFirstPage,
    isLastPage,
    
    goToPage,
    nextPage,
    prevPage,
    refresh: loadProducts,
    };
};

