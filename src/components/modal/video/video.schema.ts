import * as yup from 'yup';

export type VideoFormData = {
  video: any;
  duration: number;
};

export const videoDefaultValues: VideoFormData = {
  video: null,
  duration: 0,
};

export const videoFormSchema = yup.object().shape({
  video: yup.mixed().required('Vídeo é obrigatório'),
  duration: yup.number().required('Duração é obrigatória'),
});
