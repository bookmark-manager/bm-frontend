import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookmarks, type ListOptions } from '../api/getBookmarks';
import { createBookmark } from '../api/createBookmark';
import type { BookmarkFormValues } from '../types/bookmark-form-values';

export const useGetBookmarks = (opts: ListOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: ['bookmarks', opts.page],
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
    mutationKey: ['create-bookmark'],
    mutationFn: (payload: BookmarkFormValues) => createBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
