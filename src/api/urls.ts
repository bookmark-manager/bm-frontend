const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBookmarksApiUrl = () =>  new URL(`${BASE_URL}/bookmarks`);
export const checkBookmarkExistence = () => new URL(`${BASE_URL}/bookmarks/exists`);
export const exportHTMLBookmarks = () => new URL(`${BASE_URL}/bookmarks/export/html`);
