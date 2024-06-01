'use client';

import { InputDebounce } from '@/components/inputs/debouce-input/debouce-input';
import { Refresh } from '@mui/icons-material';
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';

type HeaderPageProps = {
  onAdd: () => void;
  onReload: () => Promise<void>;
  onSearch: (search: string) => Promise<void> | void;
  searchTitle: string;
  addTitle: string;
};

export const HeaderPage: React.FC<HeaderPageProps> = ({
  onAdd,
  onReload,
  onSearch,
  addTitle,
  searchTitle,
}) => {
  const [reloading, setReloading] = useState(false);

  const handleReload = async () => {
    setReloading(true);
    await onReload();
    setReloading(false);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar sx={{ p: '0 !important' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <InputDebounce placeholder={searchTitle} onChange={onSearch} />
          </Grid>
          <Grid
            item
            className="flex justify-end"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              sx={{
                mr: 1,
                ml: { xs: 'auto', sm: 0 },
              }}
              onClick={onAdd}
            >
              {addTitle}
            </Button>
            <Tooltip title="Atualizar">
              <IconButton onClick={handleReload}>
                {reloading && <CircularProgress color="primary" size={24} />}

                {!reloading && (
                  <Refresh color="inherit" sx={{ display: 'block' }} />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
