'use client';

import { Table } from '@/components/layout/table/table';
import { InstructorModal } from '@/components/modal/instructor/instructor';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import {
  instructorBaseQuery,
  instructorService,
} from '@/services/instructor.service';
import { Instructor } from '@/types/instructor';
import { formatCPF } from '@/utils/cpf-utils';
import { formatPhone } from '@/utils/phone-utils';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Instructor | any>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
    Cell({ cell }: any) {
      return formatCPF(cell.getValue());
    },
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    Cell({ cell }: any) {
      return formatPhone(cell.getValue());
    },
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

export const InstructorsPage: React.FC<PageProps<Instructor[]>> = ({
  initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);

  const getData = async (term?: string) => {
    const query = { ...instructorBaseQuery };
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
        {
          path: 'cpf',
          operator: 'contains',
          value: term,
          filterGroup: 'or',
          insensitive: true,
        },
      ];
    }

    const result = await instructorService.getInstructors(query);
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
        searchTitle="Pesquise por nome, email ou cpf"
        addTitle="Adicionar instrutor"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhum instrutor encontrado"
        onReload={handleReload}
      />

      {openModal && (
        <InstructorModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={getData}
        />
      )}
    </>
  );
};
