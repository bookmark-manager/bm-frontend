import type { ErrorResponse } from '../types/response';
import { fromErrorResponseDto } from './dto/error-response-dto';
import { getBookmarksApiUrl } from './urls';

export const deleteBookmark = async (id: number) => {
  const url = `${getBookmarksApiUrl()}/${id}`;

  const resp = await fetch(url, { method: 'DELETE' });

  if (!resp.ok) {
    const errData: ErrorResponse = fromErrorResponseDto(await resp.json());

    throw errData.error || new Error('Failed to delete bookmark');
  }
};
