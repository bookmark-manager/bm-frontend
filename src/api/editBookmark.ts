import type { BookmarkFormValues } from '../types/bookmark-form-values';
import { fromBookmarkDto, type BookmarkDto } from './dto/bookmark-dto';
import { toCreateBookmarkDto } from './dto/create-bookmark-dto';
import { getBookmarksApiUrl } from './urls';
import type { ErrorResponse, Response } from '../types/response';
import type { Bookmark } from '../types/bookmark';
import { fromErrorResponseDto } from './dto/error-response-dto';

export const editBookmark = async (id: number, payload: BookmarkFormValues): Promise<Bookmark> => {
  const url = getBookmarksApiUrl();
  const params = url.searchParams;

  params.set('id', id.toString());

  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toCreateBookmarkDto(payload)),
  });

  if (!resp.ok) {
    const errData: ErrorResponse = fromErrorResponseDto(await resp.json());

    throw errData.error || new Error('Failed to edit bookmark');
  }

  const dto: Response<BookmarkDto> = await resp.json();
  return fromBookmarkDto(dto.data);
};
