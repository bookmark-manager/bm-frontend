import type { Bookmark } from '../../types/bookmark';

export interface BookmarkDto {
  id: string;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export const fromBookmarkDto = (dto: BookmarkDto): Bookmark => ({
  id: parseInt(dto.id),
  title: dto.title,
  url: new URL(dto.url),
  createdAt: new Date(dto.created_at),
  updatedAt: new Date(dto.updated_at),
});
