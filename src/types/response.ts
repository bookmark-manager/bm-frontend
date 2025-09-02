export interface PaginatedResponse<TData> {
  data: TData[];
  totalCount: number;
}

export interface Response<TData> {
  data: TData;
}

export interface ErrorResponse {
  error: Error;
}
