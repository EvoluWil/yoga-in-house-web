import { ClassFormData } from '@/components/modal/class/class.schema';
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

  async createClass(classFormData: Omit<ClassFormData, 'video'>) {
    const { data } = await api.post('/instructor/classes', classFormData);
    return data;
  }

  async updateClass(classId: string, classFormData: Partial<ClassFormData>) {
    const { data } = await api.put(
      `/instructor/classes/${classId}`,
      classFormData,
    );
    return data;
  }

  async updateClassVideo(classId: string, video: string) {
    const { data } = await api.put(`/instructor/classes/${classId}/video`, {
      video,
    });
    return data;
  }

  async deleteClass(classId: string) {
    const { data } = await api.delete(`/instructor/classes/${classId}`);
    return data;
  }
}

export const classService = new ClassService();
