'use client';

import { Table } from '@/components/layout/table/table';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import {
  objectiveBaseQuery,
  objectiveService,
} from '@/services/objective.service';
import { Objective } from '@/types/objective';
import { Event, OndemandVideo, TimerOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
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
    accessorKey: 'classes',
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
    accessorKey: 'classes',
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
  const [openAddModal, setOpenAddModal] = useState(false);

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
    setOpenAddModal(true);
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
        searchTitle="Pesquise por nome"
        addTitle="Adicionar meta"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhuma meta semanal encontrada"
        onReload={handleReload}
      />
    </>
  );
};
