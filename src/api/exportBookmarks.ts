import { exportHTMLBookmarksApiUrl } from './urls';

export const exportBookmarksHTML = async () => {
  const resp = await fetch(exportHTMLBookmarksApiUrl());
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'bookmarks.html';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};
