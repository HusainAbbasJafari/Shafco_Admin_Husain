import { useQuery } from '@tanstack/react-query';
import api from "./api"

const fetchUserList = async ({ queryKey }) => {
    const [_key, { userNameOrEmail, roleType, roleId, pageNumber, pageSize, status = true }] = queryKey;

    const response = await api.post("/api/UserManagement/GetUserList", {
        userNameOrEmail,
        roleType,
        roleId,
        pageNumber,
        pageSize,
        status
    });

    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch users.");
    }
};


const fetchUser = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await api.get(`/api/UserManagement/GetUserById?UserId=${id}`);
    if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        return response.data.data;
    } else {
        throw new Error(response.data.message || "Failed to fetch roles.");
    }
};

export const useUserList = (params) => {
    return useQuery({
        queryKey: ['userList', params],
        queryFn: fetchUserList,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export const useUser = (id) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: fetchUser,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
}