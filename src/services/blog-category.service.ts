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

  async updateBlogCategory(id: string, data: any) {
    return { id, ...data };
  }

  async deleteBlogCategory(id: string) {
    return { id };
  }
}

export const blogCategoriesService = new BlogCategoryService();
