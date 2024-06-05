export const isValidCPF = (value: any) => {
  if (typeof value !== 'string' || !value?.length) {
    return false;
  }

  value = value.replace(/[^\d]+/g, '');

  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
    return false;
  }

  const cpf = value.split('');

  const validator = cpf
    .filter(
      (digit: string, index: number, array: string | string[]) =>
        index >= array.length - 2 && digit,
    )
    .map((el: string) => +el);

  const toValidate = (pop: number) =>
    cpf
      .filter(
        (digit: string, index: number, array: string | string[]) =>
          index < array.length - pop && digit,
      )
      .map((el: string) => +el);

  const rest = (count: number, pop: number) =>
    ((toValidate(pop).reduce(
      (acc: number, cur: number, index: number) => acc + cur * (count - index),
      0,
    ) *
      10) %
      11) %
    10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
};

export const formatCPF = (value: string) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/[^\d]/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};
