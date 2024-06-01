import { api } from '@/config/api';
import { Instructor } from '@/types/instructor';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const instructorBaseQuery: Query = {
  select: 'all',
};

class InstructorService {
  async getInstructors(query = instructorBaseQuery) {
    const { data } = await api.get<Instructor[]>('/instructor/instructors', {
      params: query,
    });
    return data;
  }
  async getInstructor(id: string) {
    return { id, name: 'John Doe' };
  }

  async updateInstructor(id: string, data: any) {
    return { id, ...data };
  }

  async deleteInstructor(id: string) {
    return { id };
  }
}

export const instructorService = new InstructorService();
