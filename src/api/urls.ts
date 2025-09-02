const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBookmarksApiUrl = () =>  new URL(`${BASE_URL}/bookmarks`);
export const checkBookmarkExistenceApiUrl = () => new URL(`${BASE_URL}/bookmarks/exists`);
export const exportHTMLBookmarksApiUrl = () => new URL(`${BASE_URL}/bookmarks/export/html`);
