import * as yup from 'yup';

export type SignFormData = {
  email: string;
  password: string;
  remember: boolean;
};

export const signInFormInitialValues: SignFormData = {
  email: '',
  password: '',
  remember: false,
};

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha é obrigatória'),
  remember: yup.boolean().default(false).optional(),
});
