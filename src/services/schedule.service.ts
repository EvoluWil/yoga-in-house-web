import { ScheduleFormData } from '@/components/modal/schedule/schedule.schema';
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

  async createSchedule(scheduleFormData: ScheduleFormData) {
    const { data } = await api.post('/instructor/schedules', scheduleFormData);
    return data;
  }

  async updateSchedule(scheduleId: string, scheduleFormData: ScheduleFormData) {
    const { data } = await api.put(
      `/instructor/schedules/${scheduleId}`,
      scheduleFormData,
    );
    return data;
  }

  async deleteSchedule(scheduleId: string) {
    const { data } = await api.delete(`/instructor/schedules/${scheduleId}`);
    return data;
  }
}

export const scheduleService = new ScheduleService();
