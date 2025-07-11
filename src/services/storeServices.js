import { useQuery } from '@tanstack/react-query';
import api from "./api"


const getStores = async ({ queryKey }) => {

    const [_key, { pageSize, pageNumber, searchingTerm = '', filterStatus = 1 }] = queryKey;

    const response = await api.post("/api/Store/GetAllStores", {
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

const getStoreDetails = async ({ queryKey }) => {
    const [_key, id] = queryKey
    const response = await api.get(`/api/Store/GetStoreByID?id=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch warehouses.");
    }
};


const getAllStoreOwner = async () => {
    const response = await api.get("/api/StoreOwnerMaster/GetAllStoreOwnersMaster");
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch warehouses.");
    }
};

export const useStoreOwnerList = () => {
    return useQuery({
        queryKey: ['storeOwnerList'],
        queryFn: getAllStoreOwner,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useStoreDetails = (id) => {
    return useQuery({
        queryKey: ['storeDetails', id],
        queryFn: getStoreDetails,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        enabled: !!id,
    });
};


export const useStoreList = (params) => {
    return useQuery({
        queryKey: ['storeList', params],
        queryFn: getStores,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

