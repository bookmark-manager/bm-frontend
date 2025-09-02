export type PaginatedResponse<TData> = {
  data: TData[];
  totalCount: number;
};

export type Response<TData> = {
  data: TData;
};
