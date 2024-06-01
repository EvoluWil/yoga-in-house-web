import { api } from '@/config/api';
import { Schedule } from '@/types/schedule';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const scheduleBaseQuery: Query = {
  select: 'all',
  populate: [
    {
      path: 'instructor',
      select: 'id name',
    },
  ],
};

class ScheduleService {
  async getSchedules(query = scheduleBaseQuery) {
    const { data } = await api.get<Schedule[]>('/instructor/schedules', {
      params: query,
    });
    return data;
  }
  async getSchedule(id: string) {
    return { id, name: 'John Doe' };
  }

  async updateSchedule(id: string, data: any) {
    return { id, ...data };
  }

  async deleteSchedule(id: string) {
    return { id };
  }
}

export const scheduleService = new ScheduleService();
