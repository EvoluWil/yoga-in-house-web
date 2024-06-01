'use client';
import { useSession } from '@/providers/auth';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import React from 'react';

export const HeaderUser = () => {
  const { user } = useSession();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        sx={{ mt: 1 }}
        id="avatar-button"
        aria-controls={open ? 'avatar-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt="User Avatar"
          src={user?.picture}
          sx={{
            color: 'primary.main',
            position: 'relative',
          }}
        >
          <Typography variant="h6" zIndex={1}>
            {user?.name[0]}
          </Typography>
          <Box
            bgcolor="white"
            width="100%"
            height="100%"
            position="absolute"
            top={0}
            left={0}
          />
        </Avatar>
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'avatar-button',
        }}
      >
        <MenuItem onClick={handleSignOut}>Sair</MenuItem>
      </Menu>
    </>
  );
};
