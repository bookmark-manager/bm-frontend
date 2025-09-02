import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookmarks, type ListOptions } from '../api/getBookmarks';
import { createBookmark } from '../api/createBookmark';
import type { BookmarkFormValues } from '../types/bookmark-form-values';
import { editBookmark } from '../api/editBookmark';
import { deleteBookmark } from '../api/deleteBookmark';
import { notifications } from '@mantine/notifications';

const getBookmarksKey = 'bookmarks';
const createBookmarkKey = 'create-bookmark';
const editBookmarkKey = 'edit-bookmark';
const deleteBookmarkKey = 'delete-bookmark';

export const useGetBookmarks = (opts: ListOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: [getBookmarksKey],
    queryFn: () => getBookmarks(opts),
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
    onError: err => {
      notifications.show({
        title: 'Ошибка',
        message: `Не удалось создать закладку: ${err.message}`,
        color: 'red',
      });
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
    onError: err => {
      notifications.show({
        title: 'Ошибка',
        message: `Не удалось редактировать закладку: ${err.message}`,
        color: 'red',
      });
    },
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [deleteBookmarkKey],
    mutationFn: (id: number) => deleteBookmark(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getBookmarksKey] }),
    onError: err => {
      notifications.show({
        title: 'Ошибка',
        message: `Не удалось удалить закладку: ${err.message}`,
        color: 'red',
      });
    },
  });
};
