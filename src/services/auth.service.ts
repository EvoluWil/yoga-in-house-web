import { api } from '@/config/api';
import { Instructor } from '@/types/instructor';
import { signIn } from 'next-auth/react';

type SignInResponse = {
  instructor: Instructor;
  token: string;
};

type CredentialsDto = {
  email: string;
  password: string;
};

type SignInDto = Omit<CredentialsDto, 'remember'>;

class AuthService {
  async signIn(credentials: SignInDto) {
    const { data } = await api.post<SignInResponse>(
      '/auth/instructor/sign-in',
      credentials,
    );

    return data;
  }

  async credentials(credentials: CredentialsDto) {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    return result;
  }
}

export const authService = new AuthService();
