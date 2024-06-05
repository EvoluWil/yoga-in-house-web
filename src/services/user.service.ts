import { UserFormData } from '@/components/modal/user/user.schema';
import { api } from '@/config/api';
import { User } from '@/types/user';
import { Query } from 'nestjs-prisma-querybuilder-interface';

export const userBaseQuery: Query = {
  select: 'all',
};

class UserService {
  async getUsers(query = userBaseQuery) {
    const { data } = await api.get<User[]>('/instructor/users', {
      params: query,
    });
    return data;
  }

  async getUser(id: string) {
    return { id, name: 'John Doe' };
  }

  async createUser(userFormData: UserFormData) {
    const { data } = await api.post('/instructor/users', userFormData);
    return data;
  }

  async updateUser(userId: string, userFormData: UserFormData) {
    const { data } = await api.post(
      `/instructor/users/${userId}`,
      userFormData,
    );
    return data;
  }

  async deleteUser(id: string) {
    return { id };
  }
}

export const userService = new UserService();
