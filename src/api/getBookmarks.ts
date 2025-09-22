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
  const url = getBookmarksApiUrl();
  const params = url.searchParams;

  params.set('per_page', opts.perPage.toString());
  params.set('page', opts.page.toString());
  if (opts.search !== '') {
    params.set('search', opts.search);
  }

  const resp = await fetch(url);
  const data = await resp.json();
  const totalCount = resp.headers.get('X-Total') || '';

  return fromPaginatedResponseDto(data, totalCount, fromBookmarkDto);
};
