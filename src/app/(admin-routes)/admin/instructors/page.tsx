import { InstructorsPage } from '@/pages/instructors/instructors';
import { instructorService } from '@/services/instructor.service';

export default async function Instructors() {
  const instructors = await instructorService.getInstructors();

  return <InstructorsPage initialData={instructors || []} />;
}
