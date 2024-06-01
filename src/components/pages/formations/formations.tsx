'use client';

import { Table } from '@/components/layout/table/table';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import {
  formationBaseQuery,
  formationService,
} from '@/services/formation.service';
import { Formation } from '@/types/formation';
import { OndemandVideo } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Formation | any>[] = [
  {
    accessorKey: 'title',
    header: 'Titulo',
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
    accessorKey: 'contentsId',
    header: 'Aulas vinculadas',
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
            {cell.getValue()?.length}
            <OndemandVideo color="primary" />
          </Typography>
        </Box>
      );
    },
  },
];

export const FormationsPage: React.FC<PageProps<Formation[]>> = ({
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [openAddModal, setOpenAddModal] = useState(false);

  const getData = async (term?: string) => {
    const query = { ...formationBaseQuery };
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

    const result = await formationService.getFormations(query);
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
        searchTitle="Pesquise por title ou descrição"
        addTitle="Adicionar trilha"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhuma trilha encontrada"
        onReload={handleReload}
      />
    </>
  );
};
