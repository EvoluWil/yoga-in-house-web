import { Header } from '@/components/display/header/header';
import { authOptions } from '@/config/auth';
import { Box, Container } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <Header />
      <Container>
        <Box
          p={4}
          bgcolor="grey.100"
          display="flex"
          flexDirection="column"
          gap={2}
          borderRadius={1}
          my={4}
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
