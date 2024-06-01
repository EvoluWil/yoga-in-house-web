import { DifficultyEnum } from './difficulty';

export type Class = {
  id: string;
  title: string;
  description: string;
  picture: string;
  video: string;
  duration: number;
  difficulty: DifficultyEnum;
  createdAt: string;
  updatedAt: string;
  classCategoryId: string;
  instructorId: string;
  favoritedByIds: string[];
  formationsId: string[];
};
