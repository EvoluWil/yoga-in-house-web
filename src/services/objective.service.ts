import { api } from '@/config/api';
import { Objective } from '@/types/objective';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const objectiveBaseQuery: Query = {
  select: 'all',
};

class ObjectiveService {
  async getObjectives(query = objectiveBaseQuery) {
    const { data } = await api.get<Objective[]>('/instructor/objectives', {
      params: query,
    });
    return data;
  }
  async getObjective(id: string) {
    return { id, name: 'John Doe' };
  }

  async updateObjective(id: string, data: any) {
    return { id, ...data };
  }

  async deleteObjective(id: string) {
    return { id };
  }
}

export const objectiveService = new ObjectiveService();
