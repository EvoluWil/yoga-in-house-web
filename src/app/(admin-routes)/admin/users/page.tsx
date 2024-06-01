import { UsersPage } from '@/pages/users/users';
import { userService } from '@/services/user.service';

export default async function Users() {
  const users = await userService.getUsers();

  return <UsersPage initialData={users || []} />;
}
