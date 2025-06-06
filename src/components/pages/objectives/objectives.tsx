'use client';

import { Table } from '@/components/layout/table/table';
import { ObjectiveModal } from '@/components/modal/objective/objective';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import {
  objectiveBaseQuery,
  objectiveService,
} from '@/services/objective.service';
import { Objective } from '@/types/objective';
import {
  Delete,
  Edit,
  Event,
  OndemandVideo,
  TimerOutlined,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Objective | any>[] = [
  {
    accessorKey: 'name',
    header: 'Nome da meta',
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
  {
    accessorKey: 'minutes',
    header: 'Tempo de pratica',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return (
        <Box className="flex items-center justify-center">
          <Typography color="primary" className="flex gap-2 items-center">
            {cell.getValue()}
            <TimerOutlined color="primary" />
          </Typography>
        </Box>
      );
    },
  },
  {
    accessorKey: 'schedules',
    header: 'Aulas ao vivo',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return (
        <Box className="flex items-center justify-center">
          <Typography color="primary" className="flex gap-2 items-center">
            {cell.getValue()}
            <Event color="primary" />
          </Typography>
        </Box>
      );
    },
  },
  {
    accessorKey: 'classes',
    header: 'Aulas',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return (
        <Box className="flex items-center justify-center">
          <Typography color="primary" className="flex gap-2 items-center">
            {cell.getValue()}
            <OndemandVideo color="primary" />
          </Typography>
        </Box>
      );
    },
  },
];

export const ObjectivesPage: React.FC<PageProps<Objective[]>> = ({
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(
    null,
  );

  const getData = async (term?: string) => {
    const query = { ...objectiveBaseQuery };
    if (term) {
      query.filter = [
        {
          path: 'name',
          operator: 'contains',
          value: term,
          insensitive: true,
        },
      ];
    }

    const result = await objectiveService.getObjectives(query);
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

  const handleEdit = async (objective: Objective) => {
    setSelectedObjective(objective);
    setOpenModal(true);
  };

  const handleDelete = async (objective: Objective) => {
    Swal.fire({
      title: 'Deseja realmente remover esta meta?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const response = await objectiveService.deleteObjective(
          String(objective.id),
        );
        if (response) {
          toast.success('Meta removida com sucesso');
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
        searchTitle="Pesquise por nome"
        addTitle="Adicionar meta"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhuma meta semanal encontrada"
        onReload={handleReload}
        actions={[
          {
            icon: () => <Edit color="secondary" />,
            label: () => 'Editar',
            onClick: handleEdit,
          },
          {
            icon: () => <Delete color="error" />,
            label: () => 'Remover',
            onClick: handleDelete,
          },
        ]}
      />

      {openModal && (
        <ObjectiveModal
          open={openModal}
          onClose={() => {
            setSelectedObjective(null);
            setOpenModal(false);
          }}
          onSuccess={getData}
          objective={selectedObjective}
        />
      )}
    </>
  );
};
