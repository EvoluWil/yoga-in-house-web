'use client';

import { Table } from '@/components/layout/table/table';
import { ScheduleModal } from '@/components/modal/schedule/schedule';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import {
  scheduleBaseQuery,
  scheduleService,
} from '@/services/schedule.service';
import { DifficultyEnumLabel } from '@/types/difficulty';
import { Schedule } from '@/types/schedule';
import { ScheduleStatusEnumLabel } from '@/types/schedule-status';
import { Chip } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Schedule | any>[] = [
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'instructor.name',
    header: 'Instrutor',
  },
  {
    accessorKey: 'difficulty',
    header: 'Dificuldade',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return (
        <Chip
          label={DifficultyEnumLabel[cell.getValue()]?.label}
          variant="outlined"
          size="small"
          sx={{ width: 100 }}
          color={DifficultyEnumLabel[cell.getValue()]?.color}
        />
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Data de inicio',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return new Date(cell.getValue()).toLocaleString('pt-BR');
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return (
        <Chip
          label={ScheduleStatusEnumLabel[cell.getValue()]?.label}
          variant="filled"
          size="small"
          sx={{ width: 100 }}
          color={ScheduleStatusEnumLabel[cell.getValue()]?.color}
        />
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Atualizado em',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return new Date(cell.getValue()).toLocaleDateString('pt-BR');
    },
  },
];

export const SchedulesPage: React.FC<PageProps<Schedule[]>> = ({
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);

  const getData = async (term?: string) => {
    const query = { ...scheduleBaseQuery };
    if (term) {
      query.filter = [
        {
          path: 'title',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
        {
          path: 'description',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
      ];
    }

    const result = await scheduleService.getSchedules(query);
    if (result) {
      setData(result);
    }
    return result;
  };

  const handleAdd = async () => {
    setOpenModal(true);
  };

  const handleReload = async () => {
    const result = await getData();
    if (result) {
      toast.success('Dados atualizados com sucesso');
    }
  };

  const handleSearch = async (search: string) => {
    await getData(search);
  };

  return (
    <>
      <HeaderPage
        onAdd={handleAdd}
        onReload={handleReload}
        onSearch={handleSearch}
        searchTitle="Pesquise por title ou descrição"
        addTitle="Adicionar vaga na agenda"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhum agendamento encontrado"
        onReload={handleReload}
      />

      {openModal && (
        <ScheduleModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={getData}
        />
      )}
    </>
  );
};
