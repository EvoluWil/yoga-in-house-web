export const DifficultyEnum = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
};

export const DifficultyEnumLabel: {
  [x: string]: {
    label: string;
    color:
      | 'primary'
      | 'secondary'
      | 'warning'
      | 'default'
      | 'error'
      | 'info'
      | 'success';
  };
} = {
  BEGINNER: { label: 'Iniciante', color: 'primary' },
  INTERMEDIATE: { label: 'Intermediário', color: 'secondary' },
  ADVANCED: { label: 'Avançado', color: 'error' },
};

export type DifficultyEnum = keyof typeof DifficultyEnum;
