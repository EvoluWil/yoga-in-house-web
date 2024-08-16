import { CategoryFormData } from '@/components/modal/category/category.schema';
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

  async createClassCategory(categoryFormData: CategoryFormData) {
    const { data } = await api.post(
      '/instructor/class-categories',
      categoryFormData,
    );
    return data;
  }

  async updateClassCategory(
    categoryId: string,
    categoryFormData: CategoryFormData,
  ) {
    const { data } = await api.put(
      `/instructor/class-categories/${categoryId}`,
      categoryFormData,
    );
    return data;
  }

  async deleteClassCategory(id: string) {
    return { id };
  }
}

export const classCategoryService = new ClassCategoryService();
