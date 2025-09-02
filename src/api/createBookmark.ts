import type { Bookmark } from '../types/bookmark';
import type { BookmarkFormValues } from '../types/bookmark-form-values';
import type { ErrorResponse, Response } from '../types/response';
import { fromBookmarkDto, type BookmarkDto } from './dto/bookmark-dto';
import { toCreateBookmarkDto } from './dto/create-bookmark-dto';
import { fromErrorResponseDto } from './dto/error-response-dto';
import { getBookmarksApiUrl } from './urls';

export const createBookmark = async (payload: BookmarkFormValues): Promise<Bookmark> => {
  const resp = await fetch(getBookmarksApiUrl(), {
    method: 'POST',
    body: JSON.stringify(toCreateBookmarkDto(payload)),
  });

  if (!resp.ok) {
    const errData: ErrorResponse = fromErrorResponseDto(await resp.json());
    const errMessage = errData.error ? errData.error : new Error('Failed to create bookmark');

    throw errMessage;
  }

  const dto: Response<BookmarkDto> = await resp.json();
  return fromBookmarkDto(dto.data);
};
