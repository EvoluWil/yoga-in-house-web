import { isValidPhone } from '@/utils/phone-utils';
import * as yup from 'yup';

export type UserFormData = {
  name: string;
  email: string;
  phone?: string;
};

export const userDefaultValues: UserFormData = {
  name: '',
  email: '',
  phone: '',
};

export const userFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup
    .string()
    .optional()
    .transform((value) => value?.replace(/\D/g, ''))
    .test('phone', 'Telefone inválido', (value) => {
      if (!value) return true;
      return isValidPhone(value);
    }),
});
