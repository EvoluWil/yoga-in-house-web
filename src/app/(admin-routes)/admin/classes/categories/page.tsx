import { ClassCategoryPage } from '@/pages/categories/classes';
import { classCategoriesService } from '@/services/class-category.service';

export default async function ClassCategories() {
  const categories = await classCategoriesService.getClassCategories();

  return <ClassCategoryPage initialData={categories || []} />;
}
