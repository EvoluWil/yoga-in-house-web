import { CategoryFormData } from '@/components/modal/category/category.schema';
import { api } from '@/config/api';
import { Category } from '@/types/category';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const blogCategoryBaseQuery: Query = {
  select: 'all',
};

class BlogCategoryService {
  async getBlogCategories(query = blogCategoryBaseQuery) {
    const { data } = await api.get<Category[]>('/instructor/blog-categories', {
      params: query,
    });
    return data;
  }

  async getBlogCategory(id: string) {
    return { id, name: 'John Doe' };
  }

  async createBlogCategory(categoryFormData: CategoryFormData) {
    const { data } = await api.post(
      '/instructor/blog-categories',
      categoryFormData,
    );
    return data;
  }

  async updateBlogCategory(
    categoryId: string,
    categoryFormData: CategoryFormData,
  ) {
    const { data } = await api.put(
      `/instructor/blog-categories/${categoryId}`,
      categoryFormData,
    );
    return data;
  }

  async deleteBlogCategory(id: string) {
    return { id };
  }
}

export const blogCategoryService = new BlogCategoryService();
