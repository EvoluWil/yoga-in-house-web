import { FormationFormData } from '@/components/modal/formations/formation.schema';
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

  async createFormation(formationFormData: FormationFormData) {
    const { data } = await api.post(
      '/instructor/formations',
      formationFormData,
    );
    return data;
  }

  async updateFormation(
    formationId: string,
    formationFormData: FormationFormData,
  ) {
    const { data } = await api.put(
      `/instructor/formations/${formationId}`,
      formationFormData,
    );
    return data;
  }

  async deleteFormation(id: string) {
    return { id };
  }
}

export const formationService = new FormationService();
