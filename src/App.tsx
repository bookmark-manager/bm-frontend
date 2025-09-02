import { Center, Loader, Pagination, Title } from '@mantine/core';
import { useState } from 'react';
import { Bookmark } from './components/Bookmark';
import { useGetBookmarks } from './hooks/useBookmarksQuery';
import { DataList } from './components/DataList';
import classes from './App.module.css';
import { Header } from './components/Header';
import { useDebouncedState } from '@mantine/hooks';

const DEFAULT_PER_PAGE = 5;
const DEFAULT_PAGE = 1;

export const App = () => {
  const [search, setSearch] = useDebouncedState('', 500);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { data, totalCount, isLoading } = useGetBookmarks({
    page,
    perPage: DEFAULT_PER_PAGE,
    search: search,
  });
  const total = totalCount ? Math.ceil(totalCount / DEFAULT_PER_PAGE) : 0;

  if (isLoading) {
    return (
      <Center h="60vh">
        <Loader color="black" />
      </Center>
    );
  }

  return (
    <div className={classes.container}>
      <Header search={search} onSearch={setSearch} />
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
