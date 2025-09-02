import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookmarks, type ListOptions } from '../api/getBookmarks';
import { createBookmark } from '../api/createBookmark';
import type { BookmarkFormValues } from '../types/bookmark-form-values';
import { editBookmark } from '../api/editBookmark';

const getBookmarksKey = 'bookmarks';
const createBookmarkKey = 'create-bookmark';
const editBookmarkKey = 'edit-bookmark';

export const useGetBookmarks = (opts: ListOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: [getBookmarksKey, opts.page],
    queryFn: () => getBookmarks(opts),
    placeholderData: keepPreviousData,
  });

  return {
    data: data?.data,
    totalCount: data?.totalCount,
    ...rest,
  };
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [createBookmarkKey],
    mutationFn: (payload: BookmarkFormValues) => createBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getBookmarksKey] });
    },
  });
};

interface useEditBookmarkParams {
  id: number;
  payload: BookmarkFormValues;
}

export const useEditBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [editBookmarkKey],
    mutationFn: (params: useEditBookmarkParams) => editBookmark(params.id, params.payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getBookmarksKey] }),
  });
};
