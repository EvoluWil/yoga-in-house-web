import { Theme } from '@mui/material';

export const setThemeComponents = (theme: Theme) => {
  const components: Theme['components'] = {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: '1280px !important',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            color: 'white',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            textTransform: 'none',
          },
        },
      ],
    },
  };

  return { ...theme, components };
};
