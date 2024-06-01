import { Copyright } from '@/components/layout/copyright/copyright';
import { SignInForm } from '@/components/partials/sign-in-form/sign-in-form';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function SignInSide() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            py: 4,
            px: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          height="calc(100vh - 32px)"
        >
          <Avatar
            src="/logo.png"
            sx={{
              width: '100px',
              height: '100px',
            }}
          />
          <Typography variant="h6" mx="auto" pl={1} fontWeight="500">
            Yoga in House{' '}
            <Typography
              variant="h6"
              component="span"
              color="primary.main"
              fontWeight="700"
            >
              Admin
            </Typography>
          </Typography>
          <SignInForm />
        </Box>
        <Copyright color="primary" />
      </Grid>
    </Grid>
  );
}
