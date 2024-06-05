import { FieldValues } from 'react-hook-form';

export const generateFormData = (data: FieldValues) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value instanceof Blob) {
      formData.append(key, value);
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
};
