import { api } from '@/config/api';
import { Category } from '@/types/category';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const classCategoryBaseQuery: Query = {
  select: 'all',
};

class ClassCategoryService {
  async getClassCategories(query = classCategoryBaseQuery) {
    const { data } = await api.get<Category[]>('/instructor/class-categories', {
      params: query,
    });
    return data;
  }
  async getClassCategory(id: string) {
    return { id, name: 'John Doe' };
  }

  async updateClassCategory(id: string, data: any) {
    return { id, ...data };
  }

  async deleteClassCategory(id: string) {
    return { id };
  }
}

export const classCategoriesService = new ClassCategoryService();
