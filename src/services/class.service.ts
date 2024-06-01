import { api } from '@/config/api';
import { Class } from '@/types/class';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const classBaseQuery: Query = {
  select: 'all',
  populate: [
    {
      path: 'instructor',
      select: 'id name',
    },
    {
      path: 'category',
      select: 'id title',
    },
  ],
};

class ClassService {
  async getClasses(query = classBaseQuery) {
    const { data } = await api.get<Class[]>('/instructor/classes', {
      params: query,
    });
    return data;
  }
  async getClass(id: string) {
    return { id, name: 'John Doe' };
  }

  async updateClass(id: string, data: any) {
    return { id, ...data };
  }

  async deleteClass(id: string) {
    return { id };
  }
}

export const classService = new ClassService();
