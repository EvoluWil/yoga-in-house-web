import { InstructorFormData } from '@/components/modal/instructor/instructor.schema';
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

  async createInstructor(instructorFormData: InstructorFormData) {
    const { data } = await api.post(
      '/instructor/instructors',
      instructorFormData,
    );
    return data;
  }

  async updateInstructor(
    instructorId: string,
    instructorFormData: InstructorFormData,
  ) {
    const { data } = await api.put(
      `/instructor/instructors/${instructorId}`,
      instructorFormData,
    );
    return data;
  }

  async inactiveInstructor(instructorId: string) {
    const { data } = await api.delete(
      `/instructor/instructors/${instructorId}`,
    );
    return data;
  }

  async reactivateInstructor(instructorId: string) {
    const { data } = await api.put(
      `/instructor/instructors/${instructorId}/reactivate`,
    );
    return data;
  }
}

export const instructorService = new InstructorService();
