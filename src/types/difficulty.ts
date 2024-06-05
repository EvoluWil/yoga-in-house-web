import { Option } from '@/components/inputs/select-input/select-input';

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

export const DifficultyEnumOptions: Option[] = Object.keys(DifficultyEnum).map(
  (key) => ({
    label: DifficultyEnumLabel[key]?.label,
    value: key,
  }),
);

export type DifficultyEnumKeys = keyof typeof DifficultyEnum;
