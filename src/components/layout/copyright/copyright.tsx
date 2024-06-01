import { Link, Typography, TypographyProps } from '@mui/material';
import React from 'react';

export const Copyright: React.FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="caption"
      color="white"
      align="center"
      component="p"
      {...props}
    >
      Copyright ©{' '}
      <Link color="inherit" href="https://mui.com/" target="_blank">
        Wrs Tecnologia
      </Link>
      {' · '}
      {new Date().getFullYear()}
    </Typography>
  );
};
