import { api } from '@/config/api';
import { Instructor } from '@/types/instructor';
import { SessionProvider, useSession as useSessionBase } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const useSession = () => {
  const { data } = useSessionBase();

  if (data?.user?.token) {
    api.defaults.headers.common.Authorization = `Bearer ${data.user.token}`;
  }

  return { user: data?.user as Instructor | null };
};
