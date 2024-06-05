import * as yup from 'yup';

export type CategoryFormData = {
  title: string;
  color: string;
};

export const categoryDefaultValues: CategoryFormData = {
  title: '',
  color: '#10B981',
};

export const categoryFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  color: yup.string().required('Cor é obrigatória'),
});
