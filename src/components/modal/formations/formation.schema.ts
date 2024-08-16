import * as yup from 'yup';

export type FormationFormData = {
  title: string;
  description: string;
  contentsId: string[];
};

export const formationDefaultValues: FormationFormData = {
  title: '',
  description: '',
  contentsId: [],
};

export const formationFormSchema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  contentsId: yup
    .array()
    .min(1, 'Selecione ao menos um conteúdo')
    .required('Selecione ao menos um conteúdo'),
});
