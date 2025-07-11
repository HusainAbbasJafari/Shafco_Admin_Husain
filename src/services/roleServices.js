import { useQuery } from '@tanstack/react-query';
import api from "./api"

const fetchRoleList = async ({ queryKey }) => {
  const [_key, {
    roleType = null,
    pageNumber = 1,
    pageSize = 100,
    searchingTerm = "",
    filterStatus = 0
  }] = queryKey;

  const reqbody = { roleType, pageNumber, pageSize, searchingTerm, filterStatus }
  const url = `/api/GeneralSettings/GetRoleList`;
  const response = await api.post(url, reqbody);

  if (response.data.statusCode === 200 && response.data.isSuccess === true) {
    return response.data.data;
  } else {
    throw new Error(response.data.message || "Failed to fetch roles.");
  }
};

export const useRoleList = (params) => {
  return useQuery({
    queryKey: ['roleList', params],
    queryFn: fetchRoleList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};