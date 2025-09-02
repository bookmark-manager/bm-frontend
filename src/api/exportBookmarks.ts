import type { ErrorResponse } from '../types/response';
import { fromErrorResponseDto } from './dto/error-response-dto';
import { exportHTMLBookmarksApiUrl } from './urls';

export const exportBookmarksHTML = async () => {
  const resp = await fetch(exportHTMLBookmarksApiUrl());

  if (!resp.ok) {
    const errData: ErrorResponse = fromErrorResponseDto(await resp.json());
    throw errData.error || new Error(`Failed to export bookmarks`);
  }

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
