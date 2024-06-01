import { api } from '@/config/api';
import { Formation } from '@/types/formation';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const formationBaseQuery: Query = {
  select: 'all',
};

class FormationService {
  async getFormations(query = formationBaseQuery) {
    const { data } = await api.get<Formation[]>('/instructor/formations', {
      params: query,
    });
    return data;
  }
  async getFormation(id: string) {
    return { id, name: 'John Doe' };
  }

  async updateFormation(id: string, data: any) {
    return { id, ...data };
  }

  async deleteFormation(id: string) {
    return { id };
  }
}

export const formationService = new FormationService();
