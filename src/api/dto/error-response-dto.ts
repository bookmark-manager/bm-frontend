import type { ErrorResponse } from '../../types/response';

interface ErrorResponseDto {
  error: string;
}

export const fromErrorResponseDto = (dto: ErrorResponseDto): ErrorResponse => ({
  error: new Error(dto.error),
});
