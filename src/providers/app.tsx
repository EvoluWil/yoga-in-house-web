'use client';

import { theme } from '@/global/theme';
import { ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
