import { getBookmarksApiUrl } from './urls';

export const deleteBookmark = async (id: number) => {
  const url = getBookmarksApiUrl();
  const params = url.searchParams;

  params.set('id', id.toString());

  return fetch(url, { method: 'DELETE' });
};
