import { CreateAdRequestRequest } from "@/types/adRequests";
import {
  getAdRequests,
  getAdRequestDetail,
  createAdRequest,
  approveAdRequest,
} from "./api";

export const adRequestKeys = {
  all: ["adRequests"] as const,
  list: () => [...adRequestKeys.all, "list"] as const,
  detail: (id: string) => [...adRequestKeys.all, "detail", id] as const,
} as const;

// query
export const adRequestsQueryOptions = () => ({
  queryKey: adRequestKeys.list(),
  queryFn: getAdRequests,
});

export const adRequestDetailQueryOptions = (id: string) => ({
  queryKey: adRequestKeys.detail(id),
  queryFn: () => getAdRequestDetail(id),
  enabled: !!id,
});

// mutation
export const createAdRequestMutationOptions = {
  mutationFn: (data: CreateAdRequestRequest) => createAdRequest(data),
};

export const approveAdRequestMutationOptions = () => ({
  mutationFn: (id: string) => approveAdRequest(id),
});
