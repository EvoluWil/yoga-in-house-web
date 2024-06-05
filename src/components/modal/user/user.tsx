import { MaskInput } from '@/components/inputs/mask-input/mask-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { userService } from '@/services/user.service';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { Event } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserFormData, userDefaultValues, userFormSchema } from './user.schema';

type UserModalProps = {
  user?: User;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const UserModal: React.FC<UserModalProps> = ({
  user,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues: {
      name: user?.name || userDefaultValues.name,
      email: user?.email || userDefaultValues.email,
      phone: user?.phone || userDefaultValues.phone,
    },
    resolver: yupResolver(userFormSchema),
  });

  const isEditing = !!user;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);

    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: UserFormData) => {
    const result = await userService.createUser(data);
    if (result) {
      toast.success('Usuário adicionado com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: UserFormData) => {
    const result = await userService.updateUser(String(user?.id), data);
    if (result) {
      toast.success('Usuário atualizado com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <ModalBase
      open
      onClose={handleClose}
      title={`${isEditing ? 'Editar' : 'Criar'} usuário`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar um novo'
      } usuário`}
      buttons={
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            Salvar
          </LoadingButton>
        </>
      }
    >
      <Box className="flex flex-col items-start w-full justify-start gap-4 my-4">
        <TextInput
          label="Nome"
          placeholder="Nome completo"
          name="name"
          autoComplete="off"
          control={control}
          icon={<Event />}
        />
        <TextInput
          label="Email"
          placeholder="Digite um e-mail válido"
          name="email"
          control={control}
          icon={<Event />}
        />

        <MaskInput
          mask="(99) 9 9999-9999"
          label="Telefone"
          placeholder="Telefone do usuário (opcional)"
          name="phone"
          control={control}
          icon={<Event />}
        />
      </Box>
    </ModalBase>
  );
};
