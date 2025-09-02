import { ActionIcon, Button, Center, Flex, Pagination, Title, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { Bookmark } from './components/Bookmark';
import { useCreateBookmark, useGetBookmarks } from './hooks/useBookmarksQuery';
import { DataList } from './components/DataList';
import classes from './App.module.css';
import { BookmarkModal } from './components/BookmarkModal';
import { getFormValuesFromBookmark } from './config/create-form-initial-values';
import { Upload } from 'lucide-react';
import { exportBookmarksHTML } from './api/exportBookmarks';
import { notifications } from '@mantine/notifications';

export const App = () => {
  const perPage = 4;
  const [page, setPage] = useState(1);
  const { data, totalCount } = useGetBookmarks({ page, perPage, search: '' });
  const total = totalCount ? Math.ceil(totalCount / perPage) : 0;

  const { mutateAsync: createBookmark } = useCreateBookmark();

  const handleExport = async () => {
    try {
      await exportBookmarksHTML();
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      notifications.show({
        title: 'Ошибка',
        message: `Не удалось экспортировать закладки: ${errMessage}`,
        color: 'red',
      });
    }
  };

  return (
    <div className={classes.container}>
      <Flex gap={24} justify="end" align="center">
        <BookmarkModal
          title={<Title order={3}>Новая заметка</Title>}
          initialValues={getFormValuesFromBookmark()}
          onSubmit={payload => createBookmark(payload)}
          renderTarget={onClick => (
            <Button radius={10} color="black" onClick={onClick}>
              Добавить закладку
            </Button>
          )}
        />

        <Tooltip label="Экспорт HTML">
          <ActionIcon onClick={handleExport} color="black" variant="subtle" size={32}>
            <Upload color="black" />
          </ActionIcon>
        </Tooltip>
      </Flex>

      <div className={classes.dataList}>
        <DataList
          data={data || []}
          fallback={<Title order={3}>Нет сохраненных закладок</Title>}
          renderItem={bm => <Bookmark key={bm.id} bookmark={bm} />}
        />
      </div>

      <Center>
        <Pagination color="black" size="lg" total={total} value={page} onChange={setPage} />
      </Center>
    </div>
  );
};
