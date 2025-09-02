import type { Bookmark } from '../types/bookmark';
import type { BookmarkFormValues } from '../types/bookmark-form-values';
import type { Response } from '../types/response';
import { fromBookmarkDto, type BookmarkDto } from './dto/bookmark-dto';
import { toCreateBookmarkDto } from './dto/create-bookmark-dto';
import { getBookmarksApiUrl } from './urls';

export const createBookmark = async (payload: BookmarkFormValues): Promise<Bookmark> => {
  return fetch(getBookmarksApiUrl(), {
    method: 'POST',
    body: JSON.stringify(toCreateBookmarkDto(payload)),
  })
    .then(resp => resp.json())
    .then((dto: Response<BookmarkDto>) => fromBookmarkDto(dto.data));
};
