import { useQuery } from '@tanstack/react-query';
import api from "./api"

const fetchParentCategory = async () => {
    const response = await api.get("/api/ProductCategory/GetAllParentCategories");
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch parent categories.");
    }
};



const getCategories = async ({ queryKey }) => {

    const [_key, { pageSize, pageNumber, searchTerm, status }] = queryKey;

    const response = await api.post("/api/ProductCategory/GetAllProductCategories", {
        pageSize,
        pageNumber,
        searchingTerm: searchTerm,
        filterStatus: status
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch categories.");
    }
};

const getCategoryById = async ({ queryKey }) => {

    const [_key, id] = queryKey;

    const response = await api.post("/api/ProductCategory/GetProductCategoryById", {
        id
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch category.");
    }
};


export const useParentCategory = () => {
    return useQuery({
        queryKey: ['parentCategoryList'],
        queryFn: fetchParentCategory,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};


export const useCategoryList = (params) => {
    return useQuery({
        queryKey: ['categoryList', params],
        queryFn: getCategories,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useCategory = (id) => {
    return useQuery({
        queryKey: ['categoryById', id],
        queryFn: getCategoryById,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};
