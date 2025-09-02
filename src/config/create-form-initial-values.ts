import type { Bookmark } from '../types/bookmark';
import type { BookmarkFormValues } from '../types/bookmark-form-values';

export const getFormValuesFromBookmark = (bm?: Bookmark): BookmarkFormValues => ({
  title: bm?.title || '',
  url: bm?.url.toString() || '',
});
