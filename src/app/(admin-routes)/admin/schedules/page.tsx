import { SchedulesPage } from '@/components/pages/schedules/schedules';
import { scheduleService } from '@/services/schedule.service';

export default async function Schedules() {
  const schedules = await scheduleService.getSchedules();

  return <SchedulesPage initialData={schedules || []} />;
}
