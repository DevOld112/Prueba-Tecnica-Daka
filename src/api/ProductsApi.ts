import api from "@/lib/axios";
import type { Category, Products } from "@/types";
import { isAxiosError } from "axios";

export const getProducts = async(): Promise<Products[]> => {
    try {
        const { data } = await api.get('')
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'Error desconocido al obtener productos';
            throw new Error(errorMessage);
        }
        throw new Error('Error inesperado al obtener los productos');
    }
}

export const getCategories = async(): Promise<Category[]> => {
    try {

        const { data } = await api.get('/categories')
        return data;
        
    } catch (error) {
                if(isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'Error desconocido al obtener categorias';
            throw new Error(errorMessage);
        }
        throw new Error('Error inesperado al obtener las categorias');
    }
}