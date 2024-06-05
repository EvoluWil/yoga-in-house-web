import { BlogFormData } from '@/components/modal/blog/blog.schema';
import { api } from '@/config/api';
import { Blog } from '@/types/blog';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const blogBaseQuery: Query = {
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

class BlogService {
  async getBlogs(query = blogBaseQuery) {
    const { data } = await api.get<Blog[]>('/instructor/blogs', {
      params: query,
    });
    return data;
  }

  async getBlog(id: string) {
    return { id, name: 'John Doe' };
  }

  async createBlog(blogFormData: BlogFormData) {
    const { data } = await api.post('/instructor/blogs', blogFormData);
    return data;
  }

  async updateBlog(blogId: string, blogFormData: BlogFormData) {
    const { data } = await api.post(
      `/instructor/blogs/${blogId}`,
      blogFormData,
    );
    return data;
  }

  async deleteBlog(id: string) {
    return { id };
  }
}

export const blogService = new BlogService();
