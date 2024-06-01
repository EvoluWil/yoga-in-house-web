import { BlogCategoryPage } from '@/components/pages/categories/blogs';
import { blogCategoriesService } from '@/services/blog-category.service';

export default async function BlogsCategories() {
  const categories = await blogCategoriesService.getBlogCategories();

  return <BlogCategoryPage initialData={categories || []} />;
}
