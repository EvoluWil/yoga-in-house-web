import { DifficultyEnum, DifficultyEnumKeys } from '@/types/difficulty';
import * as yup from 'yup';

export type ClassFormData = {
  title: string;
  description: string;
  difficulty: DifficultyEnumKeys;
  duration: number;
  instructorId: string;
  classCategoryId: string;
  picture: any;
  video: any;
};

export const classDefaultValues: ClassFormData = {
  title: '',
  description: '',
  difficulty: 'BEGINNER',
  instructorId: '',
  classCategoryId: '',
  duration: 0,
  picture: null,
  video: null,
};

const difficultyKeys = Object.keys(DifficultyEnum) as DifficultyEnumKeys[];

export const classFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string().required('Conteúdo é obrigatório'),
  difficulty: yup.string().oneOf(difficultyKeys).required(),
  duration: yup.number().required('Duração é obrigatória'),
  instructorId: yup.string().required('Instrutor é obrigatório'),
  classCategoryId: yup.string().required('Categoria é obrigatória'),
  picture: yup.mixed().required('Imagem é obrigatória'),
  video: yup.mixed().required('Vídeo é obrigatório'),
});

export const classFormUpdateSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string().required('Conteúdo é obrigatório'),
  difficulty: yup.string().oneOf(difficultyKeys).required(),
  instructorId: yup.string().required('Instrutor é obrigatório'),
  classCategoryId: yup.string().required('Categoria é obrigatória'),
  picture: yup.mixed(),
  video: yup.mixed(),
});
