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

  async updateUser(id: string, data: any) {
    return { id, ...data };
  }

  async deleteUser(id: string) {
    return { id };
  }
}

export const userService = new UserService();
