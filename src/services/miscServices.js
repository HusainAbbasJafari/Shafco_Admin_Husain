import { useQuery } from '@tanstack/react-query';
import api from "./api"

const fetchCountryList = async () => {
    const response = await api.get("/api/OpenAccess/GetCountryList");
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch roles.");
    }
};

const fetchBrands = async () => {
    const response = await api.post("/api/Brand/GetAllBrands", {
        pageNumber: 1,
        pageSize: 500,
        filterStatus: 1
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch roles.");
    }
};

const fetchSizes = async () => {
    const response = await api.get("/api/Product/GetSizes");
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch roles.");
    }
};

const fetchColors = async () => {
    const response = await api.get("/api/Product/GetColors");
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch roles.");
    }
};


const fetchStateList = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    const response = await api.get(`/api/OpenAccess/GetStateList?CountryId=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch countries.");
    }
};


const fetchCityList = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    const response = await api.get(`/api/OpenAccess/GetCityList?StateId=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch countries.");
    }
};

export const useBrands = () => {
    return useQuery({
        queryKey: ['brandList'],
        queryFn: fetchBrands,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};


export const useCountryList = () => {
    return useQuery({
        queryKey: ['countryList'],
        queryFn: fetchCountryList,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useStateList = (id) => {
    return useQuery({
        queryKey: ['stateList', id], // `id` passed to fetcher as part of queryKey
        queryFn: fetchStateList,
        enabled: !!id, // prevent query from running if id is undefined/null
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useCityList = (id) => {
    return useQuery({
        queryKey: ['cityList', id], // `id` passed to fetcher as part of queryKey
        queryFn: fetchCityList,
        enabled: !!id, // prevent query from running if id is undefined/null
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};


export const useSizeList = () => {
    return useQuery({
        queryKey: ['sizeList'],
        queryFn: fetchSizes,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useColorList = () => {
    return useQuery({
        queryKey: ['colorList'],
        queryFn: fetchColors,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};


