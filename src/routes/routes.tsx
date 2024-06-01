import {
  CalendarMonth,
  CrisisAlert,
  InterpreterMode,
  Newspaper,
  OndemandVideo,
  People,
  Route,
} from '@mui/icons-material';

export type Route = {
  id: string;
  icon?: JSX.Element;
  path: string;
  subRoutes?: SubRoute[];
};

export type SubRoute = {
  id: string;
  path: string;
};

export const routes: Route[] = [
  {
    id: 'Usuários',
    icon: <People sx={{ color: 'white' }} />,
    path: '/admin/users',
  },
  {
    id: 'Instrutores',
    icon: <InterpreterMode sx={{ color: 'white' }} />,
    path: '/admin/instructors',
  },
  {
    id: 'Agendamentos',
    icon: <CalendarMonth sx={{ color: 'white' }} />,
    path: '/admin/schedules',
  },
  {
    id: 'Aulas',
    icon: <OndemandVideo sx={{ color: 'white' }} />,
    path: '/admin/classes',
    subRoutes: [
      {
        id: 'Lista de aulas',
        path: '/admin/classes',
      },
      {
        id: 'Categoria de aulas',
        path: '/admin/classes/categories',
      },
    ],
  },
  {
    id: 'Notícias',
    icon: <Newspaper sx={{ color: 'white' }} />,
    path: '/admin/blogs',
    subRoutes: [
      {
        id: 'Lista de notícias',
        path: '/admin/blogs',
      },
      {
        id: 'Categoria de notícias',
        path: '/admin/blogs/categories',
      },
    ],
  },
  {
    id: 'Trilhas de formação',
    icon: <Route sx={{ color: 'white' }} />,
    path: '/admin/formations',
  },
  {
    id: 'Metas semanais',
    icon: <CrisisAlert sx={{ color: 'white' }} />,
    path: '/admin/objectives',
  },
];
