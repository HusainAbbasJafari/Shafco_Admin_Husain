import { useQuery } from '@tanstack/react-query';
import api from "./api"


const getAllProducts = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchTerm, sortBy = null, sortDirection = null, filterStatus = 0 }] = queryKey;
    try {
        const response = await api.post("/api/Product/GetAllProducts", {
            pageSize,
            pageNumber,
            searchingTerm: searchTerm,
            filterStatus,
            sortBy,
            sortDirection
        });

        if (response.data.statusCode === 200 && response.data.isSuccess === true) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch brands.");
        }
    } catch (e) {
    }

};


const getAllProductTags = async () => {
    // const [_key, { }] = queryKey;
    try {
        const response = await api.get("/api/ProductTag/GetAllProductTags");
        if (response.data.statusCode === 200 && response.data.isSuccess === true) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch brands.");
        }
    } catch (e) {
    }

};



const getAllAttributeValues = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchTerm }] = queryKey;
    const response = await api.post("/api/ProductAttribute/GetAllAttributeValues", {
        pageSize,
        pageNumber,
        searchingTerm: searchTerm,
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};


const getAllAttributeSets = async ({ queryKey }) => {
    const [_key, { pageSize, pageNumber, searchTerm }] = queryKey;
    const response = await api.post("/api/ProductAttribute/GetAllAttributeSet", {
        pageSize,
        pageNumber,
        searchingTerm: searchTerm,
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};




const getProduct = async ({ queryKey }) => {
    const [_key, id, variantId] = queryKey;
    const response = await api.post("/api/Product/GetProductById", {
        id,
        variantId
    });
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};


const getAttributeValueById = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await api.get(`/api/ProductAttribute/GetAttributeValuesByID?AttributeMasterId=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};

const getAttributeSetById = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await api.get(`/api/ProductAttribute/GetAttributeSetByID?id=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};

const getAttributesBySetId = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await api.get(`/api/ProductAttribute/GetAttributesBySetId?id=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch brands.");
    }
};

export const useProductList = (params) => {
    return useQuery({
        queryKey: ['productList', params],
        queryFn: getAllProducts,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useTagList = () => {
    return useQuery({
        queryKey: ['productList'],
        queryFn: getAllProductTags,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};


export const useProduct = ({ id, variantId }) => {
    return useQuery({
        queryKey: ['product', id, variantId],
        queryFn: getProduct,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useAttributeValue = (id) => {
    return useQuery({
        queryKey: ['attributeValue', id],
        queryFn: getAttributeValueById,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useAttributeSet = (id) => {
    return useQuery({
        queryKey: ['attributeSet', id],
        queryFn: getAttributeSetById,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useAttributes = (id) => {
    return useQuery({
        queryKey: ['attributes', id],
        queryFn: getAttributesBySetId,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useAttributeValuesList = (params) => {
    return useQuery({
        queryKey: ['attributeValuesList', params],
        queryFn: getAllAttributeValues,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}

export const useAttributeSetsList = (params) => {
    return useQuery({
        queryKey: ['attributeSetsList', params],
        queryFn: getAllAttributeSets,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}