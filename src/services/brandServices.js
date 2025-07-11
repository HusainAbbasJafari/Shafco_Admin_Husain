import { useQuery } from '@tanstack/react-query';
import api from "./api"


const getBrands = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchTerm, filterStatus  }] = queryKey;
    const response = await api.post("/api/Brand/GetAllBrands", {
        pageSize,
        pageNumber,
        searchingTerm: searchTerm,
        filterStatus : filterStatus || 0,
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};

const getBrandById = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await api.get(`/api/Brand/GetBrandByID?id=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};

export const useBrandList = (params) => {
    return useQuery({
        queryKey: ['brandList', params],
        queryFn: getBrands,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useBrand = (id) => {
    return useQuery({
        queryKey: ['brand', id],
        queryFn: getBrandById,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};