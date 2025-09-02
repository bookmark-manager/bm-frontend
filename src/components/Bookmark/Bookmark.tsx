import { ActionIcon, Anchor, Avatar, Flex, Stack, Text, Title } from '@mantine/core';
import { Edit, Trash } from 'lucide-react';
import classes from './Bookmark.module.css';
import type { FC } from 'react';
import { getFormValuesFromBookmark } from '../../config/create-form-initial-values';
import { BookmarkModal } from '../BookmarkModal';
import type { Bookmark as BookmarkType } from '../../types/bookmark';
import { useDeleteBookmark, useEditBookmark } from '../../hooks/useBookmarksQuery';
import { modals } from '@mantine/modals';

interface BookmarkProps {
  bookmark: BookmarkType;
}

export const Bookmark: FC<BookmarkProps> = ({ bookmark }) => {
  const host = bookmark.url.host;

  const { mutateAsync: editBookmark } = useEditBookmark();
  const { mutateAsync: deleteBookmark } = useDeleteBookmark();

  const openConfirmModal = () =>
    modals.openConfirmModal({
      radius: '1.2rem',
      padding: '1.5rem',
      withCloseButton: false,
      title: (
        <div>
          <Title order={4}>Подтвердите удаление</Title>
        </div>
      ),
      children: (
        <Text>
          Вы уверены, что хотите удалить закладку <b>{bookmark.title}</b> ? Это действие нельзя
          отменить.
        </Text>
      ),
      labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
      onConfirm: () => deleteBookmark(bookmark.id),
      confirmProps: { color: 'black' },
    });

  return (
    <Flex className={classes.container}>
      <Flex align="center" gap={24}>
        <Avatar
          radius={8}
          size={56}
          src={`https://www.google.com/s2/favicons?domain=${bookmark.url.host}&sz=${128}`}
        />
        <Stack gap={0}>
          <Anchor
            className={classes.title}
            href={bookmark.url.toString()}
            target="_blank"
            underline="never"
          >
            {bookmark.title}
          </Anchor>
          <Flex gap={8}>
            <Text>{bookmark.createdAt.toLocaleDateString('ru')}</Text> • <Text>{host}</Text>
          </Flex>
        </Stack>
      </Flex>

      <Flex gap={16} className={classes.controls}>
        <BookmarkModal
          title={<Title order={3}>Редактирование заметки</Title>}
          initialValues={getFormValuesFromBookmark(bookmark)}
          onSubmit={payload => editBookmark({ id: bookmark.id, payload })}
          renderTarget={onClick => (
            <ActionIcon onClick={onClick} size={28} variant="transparent">
              <Edit color="black" size={28} />
            </ActionIcon>
          )}
        />

        <ActionIcon size={28} variant="transparent">
          <Trash onClick={openConfirmModal} color="red" opacity={0.6} size={28} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};
