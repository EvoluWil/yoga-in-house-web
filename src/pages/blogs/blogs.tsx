'use client';

import { Table } from '@/components/layout/table/table';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import { blogBaseQuery, blogService } from '@/services/blog.service';
import { Blog } from '@/types/blog';
import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Blog | any>[] = [
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
    accessorKey: 'instructor.name',
    header: 'Instrutor',
  },
  {
    accessorKey: 'category.title',
    header: 'Categoria',
  },
  {
    accessorKey: 'peopleLikeIds',
    header: 'Gostou',
    size: 60,
    Cell({ cell }: any) {
      return (
        <Typography color="primary" className="flex gap-2 items-center">
          {cell.getValue()?.length}
          <ThumbUpAltOutlined color="primary" sx={{ mt: -0.8 }} />
        </Typography>
      );
    },
  },
  {
    accessorKey: 'peopleUnlikeIds',
    header: 'Não gostou',
    size: 60,
    Cell({ cell }: any) {
      return (
        <Typography color="error" className="flex gap-2 items-center">
          {cell.getValue()?.length}
          <ThumbDownAltOutlined color="error" sx={{ mt: -0.8 }} />
        </Typography>
      );
    },
  },
];

export const BlogsPage: React.FC<PageProps<Blog[]>> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [openAddModal, setOpenAddModal] = useState(false);

  const getData = async (term?: string) => {
    const query = { ...blogBaseQuery };
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

    const result = await blogService.getBlogs(query);
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
        addTitle="Adicionar notícia"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhuma notícia encontrada"
        onReload={handleReload}
      />
    </>
  );
};
