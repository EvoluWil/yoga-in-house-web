import * as yup from 'yup';

export type BlogFormData = {
  title: string;
  picture: string;
  content: string;
  instructorId: string;
  blogCategoryId: string;
};

export const blogDefaultValues: BlogFormData = {
  title: '',
  picture: '',
  content: '',
  instructorId: '',
  blogCategoryId: '',
};

export const blogFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  picture: yup.string().required('Imagem é obrigatória'),
  content: yup.string().required('Conteúdo é obrigatório'),
  instructorId: yup.string().required('Instrutor é obrigatório'),
  blogCategoryId: yup.string().required('Categoria é obrigatória'),
});
