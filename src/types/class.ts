import { DifficultyEnumKeys } from './difficulty';

export type Class = {
  id: string;
  title: string;
  description: string;
  picture: string;
  video: string;
  duration: number;
  difficulty: DifficultyEnumKeys;
  createdAt: string;
  updatedAt: string;
  classCategoryId: string;
  instructorId: string;
  favoritedByIds: string[];
  formationsId: string[];
};
