import type { CreateBookmark } from '../../types/bookmark-form-values';

interface CreateBookmarkDto {
  title: string;
  url: string;
}

export const toCreateBookmarkDto = (data: CreateBookmark): CreateBookmarkDto => ({
  title: data.title,
  url: data.url.toString(),
});
