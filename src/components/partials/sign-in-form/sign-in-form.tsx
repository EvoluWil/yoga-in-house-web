'use client';

import { Checkbox } from '@/components/inputs/checkbox/checkbox.component';
import { TextInput } from '@/components/inputs/text-input/text-input';
import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  SignFormData,
  signInFormInitialValues,
  signInFormSchema,
} from './sign-in-form.schema';

export const SignInForm = () => {
  const { control, handleSubmit } = useForm<SignFormData>({
    defaultValues: signInFormInitialValues,
    resolver: yupResolver(signInFormSchema),
  });

  const router = useRouter();

  const handleSignIn = async ({ remember, ...rest }: SignFormData) => {
    const result = await authService.credentials(rest);

    if (result?.error) {
      return toast.error('Usuário ou senha inválidos!');
    }

    if (!remember) {
      //? Preciso de uma solução para controle dos cookies
    }

    router.replace('/admin/users');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col my-8 gap-4 w-full"
    >
      <TextInput
        control={control}
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
      />
      <TextInput
        control={control}
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Box className="-mt-4">
        <Checkbox label="Manter conectado" name="remember" control={control} />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="mt-4 -mb-1"
      >
        Entrar
      </Button>
      <Link href="#" variant="body2" className="ml-auto">
        Esqueceu sua senha?
      </Link>
    </Box>
  );
};
