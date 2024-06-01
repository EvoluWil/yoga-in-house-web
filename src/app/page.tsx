import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box className="flex justify-center items-center h-screen">
      Pagina em desenvolvimento...
      <Link href="/" passHref>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Fazer login
        </Button>
      </Link>
    </Box>
  );
}
