import axios from 'axios';
import { QueryString } from 'nestjs-prisma-querybuilder-interface';
import { getServerSession } from 'next-auth';
import { toast } from 'react-toastify';
import { authOptions } from './auth';

export const api = axios.create({
  // baseURL: 'http://localhost:3001/api/v1',
  baseURL: 'https://yoga-in-house-api.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => QueryString(params),
});

api.interceptors.response.use(null, (err) => {
  if (global?.window) {
    const defaultMessage = 'Ops! Algo deu errado. Tente novamente mais tarde.';
    if (typeof err.response?.data?.message === 'string') {
      toast?.error(err.response?.data?.message);
    } else {
      toast?.error(err.response?.data?.message[0] || defaultMessage);
    }
  }

  console.log('Erro na requisição', err.response?.data?.message);
  return { data: null };
});

api.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    if (!global?.window) {
      const session = await getServerSession(authOptions);
      config.headers.Authorization = `Bearer ${session?.user?.token}`;
    }
  }

  return config;
});
