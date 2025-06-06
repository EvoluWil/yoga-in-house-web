'use client';

import { Table } from '@/components/layout/table/table';
import { ClassModal } from '@/components/modal/class/class';
import { VideoModal } from '@/components/modal/video/video';
import { HeaderPage } from '@/components/partials/header-page/header-page';
import { classBaseQuery, classService } from '@/services/class.service';
import { Class } from '@/types/class';
import { DifficultyEnumLabel } from '@/types/difficulty';
import { Edit, VideoCall } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageProps } from '../type';

const columns: MRT_ColumnDef<Class | any>[] = [
  {
    accessorKey: 'title',
    header: 'Titulo',
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
];

export const ClassesPage: React.FC<PageProps<Class[]>> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [openModal, setOpenModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const getData = async (term?: string) => {
    const query = { ...classBaseQuery };
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

    const result = await classService.getClasses(query);
    if (result) {
      setData(result);
    }
  };

  const handleAdd = async () => {
    setOpenModal(true);
  };

  const handleReload = async () => {
    await getData();
    toast.success('Dados atualizados com sucesso');
  };

  const handleSearch = async (search: string) => {
    await getData(search);
  };

  const handleEdit = async (classData: Class) => {
    setSelectedClass(classData);
    setOpenModal(true);
  };

  const handleEditVideo = async (classData: Class) => {
    setSelectedClass(classData);
    setOpenVideoModal(true);
  };

  return (
    <>
      <HeaderPage
        onAdd={handleAdd}
        onReload={handleReload}
        onSearch={handleSearch}
        searchTitle="Pesquise por título ou descrição"
        addTitle="Adicionar aula"
      />

      <Table
        columns={columns}
        data={data}
        emptyMessage="Nenhuma aula encontrada"
        onReload={handleReload}
        actions={[
          {
            icon: () => <Edit color="secondary" />,
            label: () => 'Editar aula',
            onClick: handleEdit,
          },
          {
            icon: () => <VideoCall color="secondary" />,
            label: () => 'Alterar vídeo',
            onClick: handleEditVideo,
          },
        ]}
      />

      {openModal && (
        <ClassModal
          open={openModal}
          onClose={() => {
            setSelectedClass(null);
            setOpenModal(false);
          }}
          onSuccess={getData}
          classData={selectedClass}
        />
      )}

      {openVideoModal && (
        <VideoModal
          open={openModal}
          onClose={() => {
            setSelectedClass(null);
            setOpenVideoModal(false);
          }}
          onSuccess={getData}
          classData={selectedClass}
        />
      )}
    </>
  );
};
