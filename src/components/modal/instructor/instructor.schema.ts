import { isValidCPF } from '@/utils/cpf-utils';
import { isValidPhone } from '@/utils/phone-utils';
import * as yup from 'yup';

export type InstructorFormData = {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
};

export const instructorDefaultValues: InstructorFormData = {
  name: '',
  email: '',
  cpf: '',
  phone: '',
};

export const instructorFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .transform((value) => value?.replace(/\D/g, ''))
    .test('cpf', 'CPF inválido', (value) => isValidCPF(value)),
  phone: yup
    .string()
    .optional()
    .transform((value) => value?.replace(/\D/g, ''))
    .test('phone', 'Telefone inválido', (value) => {
      if (!value) return true;
      return isValidPhone(value);
    }),
});
