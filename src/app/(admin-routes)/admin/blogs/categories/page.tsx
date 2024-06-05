import { BlogCategoryPage } from '@/components/pages/categories/blogs';
import { blogCategoryService } from '@/services/blog-category.service';

export default async function BlogsCategories() {
  const categories = await blogCategoryService.getBlogCategories();

  return <BlogCategoryPage initialData={categories || []} />;
}
