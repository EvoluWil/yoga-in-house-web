'use client';

import { Table } from '@/components/layout/table/table';
import { CategoryModal } from '@/components/modal/category/category';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import {
  blogCategoryBaseQuery,
  blogCategoryService,
} from '@/services/blog-category.service';
import { Category } from '@/types/category';
import { Box } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Category | any>[] = [
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
    accessorKey: 'color',
    header: 'Cor da categoria',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      return (
        <Box className="flex items-center justify-center">
          <Box className="w-8 h-8 rounded-full" bgcolor={cell.getValue()} />
        </Box>
      );
    },
  },
];

export const BlogCategoryPage: React.FC<PageProps<Category[]>> = ({
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);

  const getData = async (term?: string) => {
    const query = { ...blogCategoryBaseQuery };
    if (term) {
      query.filter = [
        {
          path: 'title',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
      ];
    }

    const result = await blogCategoryService.getBlogCategories(query);
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
        searchTitle="Pesquise por titulo"
        addTitle="Adicionar categoria"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhuma categoria encontrada"
        onReload={handleReload}
      />

      {openModal && (
        <CategoryModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={getData}
          type="BLOG"
        />
      )}
    </>
  );
};
