import { ActionIcon, Button, Flex, Title, Tooltip } from '@mantine/core';
import { type FC } from 'react';
import { SearchBar } from '../SearchBar';
import { BookmarkModal } from '../BookmarkModal';
import { getFormValuesFromBookmark } from '../../config/create-form-initial-values';
import { Upload } from 'lucide-react';
import { useCreateBookmark } from '../../hooks/useBookmarksQuery';
import { exportBookmarksHTML } from '../../api/exportBookmarks';
import { notifications } from '@mantine/notifications';
import classes from './Header.module.css';

interface HeaderProps {
  search?: string;
  onSearch?: (value: React.SetStateAction<string>) => void;
}

export const Header: FC<HeaderProps> = ({ search, onSearch }) => {
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
    <Flex gap={24} justify="end" align="center">
      <div className={classes.searchContainer}>
        <SearchBar
          className={classes.searchBar}
          value={search || ''}
          onChange={value => onSearch?.(value)}
        />
      </div>

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
  );
};
