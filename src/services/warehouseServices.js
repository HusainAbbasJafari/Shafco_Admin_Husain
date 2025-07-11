import { useQuery } from '@tanstack/react-query';
import api from "./api"



const warehouseList = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchingTerm = null, filterStatus = 1 }] = queryKey;
    const response = await api.post("/api/Warehouse/GetAllWarehouses", {
        pageSize,
        pageNumber,
        searchingTerm,
        filterStatus
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch warehouses.");
    }
};


const getWarehouseDetails = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    const response = await api.get(`/api/Warehouse/GetWarehouseByID?id=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch details.");
    }
};




export const useWarehouseList = (params) => {
    return useQuery({
        queryKey: ['warehouseList', params], // `pageSize` and `pageNumber` passed to fetcher as part of queryKey
        queryFn: warehouseList,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useWarehouseDetails = (id) => {
    return useQuery({
        queryKey: ['warehouseDetails', id], // `id` passed to fetcher as part of queryKey
        queryFn: getWarehouseDetails,
        enabled: !!id, // prevent query from running if id is undefined/null
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};
