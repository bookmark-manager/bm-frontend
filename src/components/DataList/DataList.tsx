import { Center, Stack } from '@mantine/core';
import type { ReactNode } from 'react';

interface DataListProps<TData> {
  data: TData[] | null;
  fallback?: ReactNode;
  renderItem: (item: TData) => ReactNode;
}

export const DataList = <TData,>({ data, fallback, renderItem }: DataListProps<TData>) => {
  return (
    <div>
      {!data?.length ? (
        <Center h="60vh">{fallback}</Center>
      ) : (
        <Stack mt={32}>{data?.map(bm => renderItem(bm))}</Stack>
      )}
    </div>
  );
};
