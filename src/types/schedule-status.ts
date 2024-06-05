export const ScheduleStatusEnum = {
  PENDING: 'PENDING',
  CANCELED: 'CANCELED',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

export const ScheduleStatusEnumLabel: {
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
  PENDING: { label: 'Pendente', color: 'secondary' },
  CANCELED: { label: 'Cancelado', color: 'error' },
  IN_PROGRESS: { label: 'Em andamento', color: 'warning' },
  FINISHED: { label: 'Finalizado', color: 'primary' },
};

export type ScheduleStatusEnumKeys = keyof typeof ScheduleStatusEnum;
