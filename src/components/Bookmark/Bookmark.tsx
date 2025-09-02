import { ActionIcon, Anchor, Flex, Stack, Text, Title } from '@mantine/core';
import { Edit, Trash } from 'lucide-react';
import classes from './Bookmark.module.css';
import type { FC } from 'react';
import { getFormValuesFromBookmark } from '../../config/create-form-initial-values';
import { BookmarkModal } from '../BookmarkModal';
import type { Bookmark as BookmarkType } from '../../types/bookmark';

interface BookmarkProps {
  bookmark: BookmarkType;
}

export const Bookmark: FC<BookmarkProps> = ({ bookmark }) => {
  const host = bookmark.url.host;

  return (
    <Flex className={classes.container}>
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

      <Flex gap={16} className={classes.controls}>
        <BookmarkModal
          title={<Title order={3}>Редактирование заметки</Title>}
          initialValues={getFormValuesFromBookmark(bookmark)}
          onSubmit={() => ''}
          renderTarget={onClick => (
            <ActionIcon onClick={onClick} size={28} variant="transparent">
              <Edit color="black" size={28} />
            </ActionIcon>
          )}
        />

        <ActionIcon size={28} variant="transparent">
          <Trash color="red" opacity={0.6} size={28} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};
