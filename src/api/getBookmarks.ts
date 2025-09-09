import type { Bookmark } from '../types/bookmark';
import type { PaginatedResponse } from '../types/response';
import { fromBookmarkDto } from './dto/bookmark-dto';
import { fromPaginatedResponseDto } from './dto/paginated-response-dto';
import { getBookmarksApiUrl } from './urls';

export interface ListOptions {
  perPage: number;
  page: number;
  search: string;
}

export const getBookmarks = async (opts: ListOptions): Promise<PaginatedResponse<Bookmark>> => {
  const headers = new Headers();
  headers.append('X-PerPage', opts.perPage.toString());
  headers.append('X-Page', opts.page.toString());

  const url = getBookmarksApiUrl();
  if (opts.search !== '') {
    url.searchParams.set('search', opts.search);
  }

  return fetch(url, { headers })
    .then(resp => resp.json())
    .then(data => {
      return fromPaginatedResponseDto(data, fromBookmarkDto);
    });
};
