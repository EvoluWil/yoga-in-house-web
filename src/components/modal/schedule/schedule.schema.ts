import { DifficultyEnum, DifficultyEnumKeys } from '@/types/difficulty';
import { addDays, setHours, setMinutes } from 'date-fns';
import * as yup from 'yup';

export type ScheduleFormData = {
  title: string;
  description: string;
  date: Date;
  time?: Date;
  duration: number;
  limit: number;
  location: string;
  difficulty: DifficultyEnumKeys;
  instructorId: string;
};

export const scheduleDefaultValues: ScheduleFormData = {
  title: '',
  description: '',
  date: addDays(new Date(), 1),
  time: setHours(setMinutes(new Date(), 0), 0),
  duration: 0,
  limit: 0,
  location: '',
  difficulty: 'BEGINNER',
  instructorId: '',
};

const difficultyKeys = Object.keys(DifficultyEnum) as DifficultyEnumKeys[];

export const scheduleFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  date: yup
    .date()
    .required('Data é obrigatória')
    .typeError('Data é obrigatória')
    .min(new Date(), 'Data não pode ser no passado'),
  time: yup.date().optional(),
  location: yup.string().required('Local é obrigatório'),
  limit: yup
    .number()
    .required('Limite de alunos é obrigatório')
    .typeError('Limite de alunos é obrigatório'),
  duration: yup
    .number()
    .required('Duração é obrigatório')
    .typeError('Duração é obrigatório'),
  instructorId: yup.string().required('Instrutor é obrigatório'),
  difficulty: yup.string().oneOf(difficultyKeys).required(),
});
