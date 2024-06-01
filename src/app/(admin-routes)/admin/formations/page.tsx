import { FormationsPage } from '@/pages/formations/formations';
import { formationService } from '@/services/formation.service';

export default async function Formations() {
  const formations = await formationService.getFormations();

  return <FormationsPage initialData={formations || []} />;
}
