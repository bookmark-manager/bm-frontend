import type { ErrorResponse } from '../types/response';
import { fromErrorResponseDto } from './dto/error-response-dto';
import { getBookmarksApiUrl } from './urls';

export const deleteBookmark = async (id: number) => {
  const url = getBookmarksApiUrl();
  const params = url.searchParams;

  params.set('id', id.toString());

  const resp = await fetch(url, { method: 'DELETE' });

  if (!resp.ok) {
    const errData: ErrorResponse = fromErrorResponseDto(await resp.json());
    const errMessage = errData.error ? errData : new Error('Failed to delete bookmark');

    throw errMessage;
  }
};
