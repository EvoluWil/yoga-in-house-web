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
import { Cancel, Edit } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
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
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

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

  const handleEdit = async (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setOpenModal(true);
  };

  const handleDelete = async (schedule: Schedule) => {
    Swal.fire({
      title: 'Deseja realmente cancelar este agendamento?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, cancelar!',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const response = await scheduleService.deleteSchedule(
          String(schedule.id),
        );
        if (response) {
          toast.success('Agendamento cancelado com sucesso');
          await getData();
        }
      },
    });
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
        actions={[
          {
            icon: () => <Edit color="secondary" />,
            label: () => 'Editar',
            onClick: handleEdit,
          },
          {
            icon: () => <Cancel color="error" />,
            label: () => 'Cancelar',
            condition: ({ status }) => status === 'PENDING',
            onClick: handleDelete,
          },
        ]}
      />

      {openModal && (
        <ScheduleModal
          open={openModal}
          onClose={() => {
            setSelectedSchedule(null);
            setOpenModal(false);
          }}
          onSuccess={getData}
          schedule={selectedSchedule}
        />
      )}
    </>
  );
};
