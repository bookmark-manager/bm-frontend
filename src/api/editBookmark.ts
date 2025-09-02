import type { BookmarkFormValues } from '../types/bookmark-form-values';
import { fromBookmarkDto, type BookmarkDto } from './dto/bookmark-dto';
import { toCreateBookmarkDto } from './dto/create-bookmark-dto';
import { getBookmarksApiUrl } from './urls';
import type { Response } from '../types/response';
import type { Bookmark } from '../types/bookmark';

export const editBookmark = async (id: number, payload: BookmarkFormValues): Promise<Bookmark> => {
  const url = getBookmarksApiUrl();
  const params = url.searchParams;

  params.set('id', id.toString());

  return fetch(url, { method: 'PATCH', body: JSON.stringify(toCreateBookmarkDto(payload)) })
    .then(resp => resp.json())
    .then((dto: Response<BookmarkDto>) => fromBookmarkDto(dto.data));
};
