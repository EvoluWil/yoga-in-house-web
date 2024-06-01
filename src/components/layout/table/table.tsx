'use client';

import { useTheme } from '@mui/material';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Empty } from '../empty/empty';

type TableProps<T> = {
  columns: MRT_ColumnDef<T | any>[];
  data: T[];
  emptyMessage?: string;
  onReload?: () => Promise<void>;
};

export const Table: <T>(props: TableProps<T>) => JSX.Element = ({
  columns,
  data,
  onReload,
  emptyMessage,
}) => {
  const theme = useTheme();

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: true,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableRowNumbers: true,
    muiPaginationProps: {
      rowsPerPageOptions: [30, 50, 100],
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: 'primary.main',
        '*': {
          color: 'white !important',
        },
      },
    },
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: 'primary.main',
        color: 'white',
        '*': {
          color: 'white !important',
        },
      },
    },
    localization: {
      sortByColumnAsc: 'Ordenar por esta coluna de forma ascendente',
      sortByColumnDesc: 'Ordenar por esta coluna de forma descendente',
      sortedByColumnAsc: 'Ordenado por esta coluna de forma ascendente',
      sortedByColumnDesc: 'Ordenado por esta coluna de forma descendente',
      rowsPerPage: 'Linhas por página',
      goToNextPage: 'Ir para a próxima página',
      goToPreviousPage: 'Ir para a página anterior',
    },
    initialState: {
      pagination: {
        pageSize: 30,
        pageIndex: 0,
      },
    },
  });
  if (!data.length && onReload) {
    return <Empty message={emptyMessage} onReload={onReload} />;
  }

  return <MaterialReactTable table={table} />;
};
