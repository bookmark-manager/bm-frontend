import type { BookmarkFormValues } from '../../types/bookmark-form-values';

interface CreateBookmarkDto {
  title: string;
  url: string;
}

export const toCreateBookmarkDto = (data: BookmarkFormValues): CreateBookmarkDto => ({
  title: data.title,
  url: data.url,
});
