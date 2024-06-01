import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/not-found.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box className="absolute bg-black opacity-70 w-full h-full" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        zIndex={1}
      >
        <Typography variant="h4" component="h1" gutterBottom color="white">
          Oops! Página não encontrada.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          color="white"
          maxWidth={500}
          textAlign="center"
        >
          Parece que você se perdeu. Mas vamos ter reconectar com o chakra do
          <Typography
            variant="inherit"
            component="span"
            fontWeight="bold"
            color="primary"
            ml={1}
          >
            Yoga in House.
          </Typography>
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Voltar para a página inicial
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
