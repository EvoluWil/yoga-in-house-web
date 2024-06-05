import { ClassCategoryPage } from '@/components/pages/categories/classes';
import { classCategoryService } from '@/services/class-category.service';

export default async function ClassCategories() {
  const categories = await classCategoryService.getClassCategories();

  return <ClassCategoryPage initialData={categories || []} />;
}
