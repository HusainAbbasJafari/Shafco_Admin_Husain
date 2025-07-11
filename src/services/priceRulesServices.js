import { useQuery } from '@tanstack/react-query';
import api from "./api"


const getAllCategoryRules = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchingTerm, filterStatus, fromDate, toDate }] = queryKey;
    const response = await api.post("/api/Pricing/GetAllCategoryRules",
        { pageSize, pageNumber, searchingTerm, filterStatus, fromDate, toDate }
    );
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};

const getCategoryRule = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await api.post("/api/Pricing/GetCategoryRuleById", {
        id
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};


export const useAllCategoryRules = (params) => {
    return useQuery({
        queryKey: ['allCategoryRules', params],
        queryFn: getAllCategoryRules,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useCategoryRule = (id) => {
    return useQuery({
        queryKey: ['categoryRule', id],
        queryFn: getCategoryRule,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};