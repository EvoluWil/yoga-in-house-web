import * as yup from 'yup';

export type ObjectiveFormData = {
  name: string;
  schedules: number;
  classes: number;
  minutes: number;
};

export const objectiveDefaultValues: ObjectiveFormData = {
  name: '',
  schedules: 0,
  classes: 0,
  minutes: 0,
};

export const objectiveFormSchema = yup.object().shape({
  name: yup.string().required('Nome da meta é obrigatório'),
  schedules: yup
    .number()
    .required('Quantidade de aulas é obrigatório')
    .typeError('Quantidade de aulas é obrigatório'),
  classes: yup
    .number()
    .required('Quantidade de aulas é obrigatório')
    .typeError('Quantidade de aulas é obrigatório'),
  minutes: yup
    .number()
    .required('Tempo de prática é obrigatório')
    .typeError('Tempo de prática é obrigatório'),
});
