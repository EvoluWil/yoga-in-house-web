import { DifficultyEnum } from './difficulty';
import { ScheduleStatusEnum } from './schedule-status';

export type Schedule = {
  id: string;
  title: string;
  duration: number;
  description: string;
  date: Date;
  limit: number;
  location: string;
  difficulty: DifficultyEnum;
  status: ScheduleStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  instructorId: string;
  usersId: string[];
  checkInUsersId: string[];
};
