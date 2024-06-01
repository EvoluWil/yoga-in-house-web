import { Copyright } from '@/components/layout/copyright/copyright';
import { Route, routes } from '@/routes/routes';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';

import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type NavigatorProps = {
  open: boolean;
  onClose: () => void;
};

export function Navigator({ open, onClose }: NavigatorProps) {
  const [dropdownOpened, setDropdownOpened] = useState<string>('');

  const { push } = useRouter();
  const pathName = usePathname();

  const isSelectedPath = (route: Route) => {
    if (route.path === pathName || route.id === dropdownOpened) {
      return true;
    }

    return false;
  };

  const handleSelectRoute = (route: Route) => {
    if (!route.subRoutes) {
      push(route.path);
      onClose();
    } else {
      setDropdownOpened((prev) => (prev === route.id ? '' : route.id));
    }
  };

  return (
    <Drawer variant="temporary" open={open} onClose={onClose}>
      <Box
        display="flex"
        alignItems="center"
        pl={2}
        py={{ xs: 3.9, sm: 4.4 }}
        justifyContent="space-between"
      >
        <Typography variant="body1" mx="auto" pl={1} fontWeight="500">
          Yoga in House{' '}
          <Typography component="span" color="primary.main" fontWeight="700">
            Admin
          </Typography>
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Divider />

      <Box
        pb={1}
        bgcolor="primary.main"
        height="100%"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <List disablePadding>
          {routes.map((route) => (
            <Box key={route.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleSelectRoute(route)}
                  selected={isSelectedPath(route)}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText>{route.id}</ListItemText>
                  {route.subRoutes && <ExpandMore sx={{ mr: -1 }} />}
                </ListItemButton>
              </ListItem>
              {route.subRoutes && (
                <Collapse
                  in={dropdownOpened === route.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{ bgcolor: 'primary.dark' }}
                  >
                    {route.subRoutes?.map((childrenRoute) => (
                      <ListItem key={childrenRoute.id}>
                        <ListItemButton
                          onClick={() => handleSelectRoute(childrenRoute)}
                        >
                          <ListItemText>{childrenRoute.id}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
              <Divider />
            </Box>
          ))}
        </List>

        <Copyright />
      </Box>
    </Drawer>
  );
}
