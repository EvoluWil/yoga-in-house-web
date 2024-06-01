import { ClassesPage } from '@/components/pages/classes/classes';
import { classService } from '@/services/class.service';

export default async function Classes() {
  const classes = await classService.getClasses();

  return <ClassesPage initialData={classes || []} />;
}
