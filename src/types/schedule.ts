import { DifficultyEnumKeys } from './difficulty';
import { ScheduleStatusEnumKeys } from './schedule-status';

export type Schedule = {
  id: string;
  title: string;
  duration: number;
  description: string;
  date: Date;
  limit: number;
  location: string;
  difficulty: DifficultyEnumKeys;
  status: ScheduleStatusEnumKeys;
  createdAt: Date;
  updatedAt: Date;
  instructorId: string;
  usersId: string[];
  checkInUsersId: string[];
};
