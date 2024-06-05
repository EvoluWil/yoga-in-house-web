import { Option } from '@/components/inputs/select-input/select-input';

export const formatSelectOptions = <T = any>(
  data: T[],
  value: keyof T,
  label: keyof T,
  addDefaultOption = false,
): Option<T>[] => {
  const formattedArray = data.map((item) => {
    return { value: item[value], label: item[label], object: item };
  });

  if (addDefaultOption) {
    formattedArray.unshift({ value: '', label: 'Selecione uma opção' } as any);
  }

  return formattedArray as Option<T>[];
};
