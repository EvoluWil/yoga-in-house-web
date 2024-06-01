import { ObjectivesPage } from '@/components/pages/objectives/objectives';
import { objectiveService } from '@/services/objective.service';

export default async function Objectives() {
  const objectives = await objectiveService.getObjectives();

  return <ObjectivesPage initialData={objectives || []} />;
}
