'use client';

import { Table } from '@/components/layout/table/table';
import { UserModal } from '@/components/modal/user/user';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import { userBaseQuery, userService } from '@/services/user.service';
import { User } from '@/types/user';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<User | any>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
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

export const UsersPage: React.FC<PageProps<User[]>> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);

  const getData = async (term?: string) => {
    const query = { ...userBaseQuery };
    if (term) {
      query.filter = [
        {
          path: 'name',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
        {
          path: 'phone',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
        {
          path: 'email',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
      ];
    }

    const result = await userService.getUsers(query);
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
        searchTitle="Pesquise por nome, email ou telefone"
        addTitle="Adicionar usuário"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhum usuário encontrado"
        onReload={handleReload}
      />

      {openModal && (
        <UserModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          onSuccess={getData}
        />
      )}
    </>
  );
};
