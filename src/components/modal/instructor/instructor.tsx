import { MaskInput } from '@/components/inputs/mask-input/mask-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { instructorService } from '@/services/instructor.service';
import { Instructor } from '@/types/instructor';
import { yupResolver } from '@hookform/resolvers/yup';
import { Event } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  InstructorFormData,
  instructorDefaultValues,
  instructorFormSchema,
} from './instructor.schema';

type InstructorModalProps = {
  instructor?: Instructor;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const InstructorModal: React.FC<InstructorModalProps> = ({
  instructor,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<InstructorFormData>({
    defaultValues: {
      name: instructor?.name || instructorDefaultValues.name,
      email: instructor?.email || instructorDefaultValues.email,
      cpf: instructor?.cpf || instructorDefaultValues.cpf,
      phone: instructor?.phone || instructorDefaultValues.phone,
    },
    resolver: yupResolver(instructorFormSchema),
  });

  const isEditing = !!instructor;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InstructorFormData) => {
    setLoading(true);

    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: InstructorFormData) => {
    const result = await instructorService.createInstructor(data);
    if (result) {
      toast.success('Instrutor adicionado com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: InstructorFormData) => {
    const result = await instructorService.updateInstructor(
      String(instructor?.id),
      data,
    );
    if (result) {
      toast.success('Instrutor atualizado com sucesso!');
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
      title={`${isEditing ? 'Editar' : 'Criar'} instrutor`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar um novo'
      } instrutor`}
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
          mask="999.999.999-99"
          label="CPF"
          placeholder="CPF do instrutor"
          name="cpf"
          control={control}
          icon={<Event />}
        />

        <MaskInput
          mask="(99) 9 9999-9999"
          label="Telefone"
          placeholder="Telefone do instrutor (opcional)"
          name="phone"
          control={control}
          icon={<Event />}
        />
      </Box>
    </ModalBase>
  );
};
