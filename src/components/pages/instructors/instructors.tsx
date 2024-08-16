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
import { Cancel, CheckCircle, Edit } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
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
    accessorKey: 'active',
    header: 'Status',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell({ cell }: any) {
      const isActive = cell.getValue();
      return (
        <Chip
          label={isActive ? 'Ativo' : 'Inativo'}
          variant="filled"
          size="small"
          sx={{ width: 100 }}
          color={isActive ? 'success' : 'error'}
        />
      );
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
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

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

  const handleEdit = async (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setOpenModal(true);
  };

  const handleUpdateActive = async (instructor: Instructor) => {
    Swal.fire({
      title: `Deseja realmente ${
        instructor?.active ? 'INATIVAR' : 'REATIVAR'
      } este instrutor?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: instructor?.active ? '#d33' : '#061',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Sim, ${instructor?.active ? 'inativar' : 'reativar'}`,
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        if (instructor.active) {
          const response = await instructorService.inactiveInstructor(
            String(instructor.id),
          );
          if (response) {
            toast.success('Instrutor inativado com sucesso');
            await getData();
          }
        } else {
          const response = await instructorService.reactivateInstructor(
            String(instructor.id),
          );
          if (response) {
            toast.success('Instrutor reativado com sucesso');
            await getData();
          }
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
        searchTitle="Pesquise por nome, email ou cpf"
        addTitle="Adicionar instrutor"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhum instrutor encontrado"
        onReload={handleReload}
        actions={[
          {
            icon: () => <Edit color="secondary" />,
            label: () => 'Editar',
            onClick: handleEdit,
          },
          {
            icon: ({ active }) =>
              active ? (
                <Cancel color="error" />
              ) : (
                <CheckCircle color="success" />
              ),
            label: ({ active }) => (active ? 'Inativar' : 'Reativar'),
            onClick: handleUpdateActive,
          },
        ]}
      />

      {openModal && (
        <InstructorModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedInstructor(null);
          }}
          onSuccess={getData}
          instructor={selectedInstructor}
        />
      )}
    </>
  );
};
