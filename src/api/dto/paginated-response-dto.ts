import type { PaginatedResponse, Response } from '../../types/response';

export const fromPaginatedResponseDto = <TDataDto, TData>(
  dto: Response<TDataDto[]>,
  totalCount: string,
  fromDataDto: (dto: TDataDto) => TData,
): PaginatedResponse<TData> => ({
  data: dto.data.map(fromDataDto),
  totalCount: totalCount ? parseInt(totalCount) : 0,
});
