import { useQuery } from '@tanstack/react-query';
import api from "./api"

const getAllProductBundles = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchTerm }] = queryKey;
    const response = await api.post("/api/ProductBundle/GetListBundles", {
        pageSize,
        pageNumber,
        searchingTerm: searchTerm,
        filterStatus: 1
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
}

const getBundle = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    try {
        const response = await api.get(`/api/ProductBundle/GetProductBundleByID?bundleId=${id}`);
        if (response.data.statusCode === 200 && response.data.isSuccess === true) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch brands.");
        }
    } catch (error) {
        console.log(error, "error");

    }

};

export const useProductBundleList = (params) => {
    return useQuery({
        queryKey: ['productBundleList', params],
        queryFn: getAllProductBundles,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useBundle = (id) => {
    return useQuery({
        queryKey: ['bundle', id],
        queryFn: getBundle,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};
