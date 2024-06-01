import { Instructor } from '@/types/instructor';
import 'next-auth';

declare module 'next-auth' {
  interface User extends Instructor {
    token: string;
  }
  interface Session {
    user: User;
  }
}
