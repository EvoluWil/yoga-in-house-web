'use client';

import { HeaderUser } from '@/components/cards/header-user/header-user';
import { routes } from '@/routes/routes';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Navigator } from '../navigator/navigator';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const pathTitle = routes.reduce((acc, route) => {
    if (route.path === pathname) {
      return route.id;
    }

    if (route.subRoutes) {
      const subRoute = route.subRoutes?.find((sub) => sub.path === pathname);
      if (subRoute) {
        return subRoute.id;
      }
    }

    return acc;
  }, '');

  if (!pathTitle) {
    return null;
  }

  return (
    <Box bgcolor="primary.main" color="white">
      <Navigator open={open} onClose={() => setOpen(false)} />
      <AppBar
        position="fixed"
        elevation={0}
        component={Container}
        maxWidth="lg"
        sx={{ p: '0 !important' }}
      >
        <Toolbar>
          <Grid container spacing={0.5} alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center">
                <IconButton
                  color="inherit"
                  onClick={() => setOpen(true)}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                display={{ xs: 'none', sm: 'flex' }}
                justifyContent="center"
                alignItems="center"
                component={Link}
                href="/"
              >
                <Avatar
                  alt="Yoga in House"
                  src="/logo.png"
                  sx={{ width: 52, height: 52 }}
                />
                <Typography variant="h6" fontWeight="500">
                  Yoga in House <strong>Admin</strong>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ mt: 1 }}>
                <NotificationsIcon />
              </IconButton>
              <HeaderUser />
            </Grid>
          </Grid>
        </Toolbar>
        <Toolbar sx={{ mt: -2 }}>
          <Typography color="inherit" variant="h5" component="h1">
            {pathTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
