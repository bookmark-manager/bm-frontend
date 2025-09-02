import type { PaginatedResponse } from '../../types/response';

export interface PaginatedResponseDto<TDataDto> {
  data: TDataDto[];
  total_count: string;
}

export const fromPaginatedResponseDto = <TDataDto, TData>(
  dto: PaginatedResponseDto<TDataDto>,
  fromDataDto: (dto: TDataDto) => TData,
): PaginatedResponse<TData> => ({
  data: dto.data.map(fromDataDto),
  totalCount: parseInt(dto.total_count),
});
