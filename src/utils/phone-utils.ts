export const isValidPhone = (value: string) => {
  if (typeof value !== 'string') {
    return false;
  }
  const pattern = /^(?:\(?[1-9][0-9]\)?\s?)?(?:9[1-9]\d{3}[-.\s]?\d{4})$/;

  return pattern.test(value);
};

export const formatPhone = (value: string) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/[^\d]/g, '')
    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};
