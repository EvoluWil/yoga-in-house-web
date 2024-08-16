import { TextInput } from '@/components/inputs/text-input/text-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { objectiveService } from '@/services/objective.service';
import { Objective } from '@/types/objective';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  DateRange,
  OndemandVideo,
  TimerOutlined,
  TopicOutlined,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ObjectiveFormData,
  objectiveDefaultValues,
  objectiveFormSchema,
} from './objective.schema';

type ObjectiveModalProps = {
  objective: Objective | null;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const ObjectiveModal: React.FC<ObjectiveModalProps> = ({
  objective,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<ObjectiveFormData>({
    defaultValues: {
      classes: objective?.classes || objectiveDefaultValues.classes,
      minutes: objective?.minutes || objectiveDefaultValues.minutes,
      name: objective?.name || objectiveDefaultValues.name,
      schedules: objective?.schedules || objectiveDefaultValues.schedules,
    },
    resolver: yupResolver(objectiveFormSchema),
  });

  const isEditing = !!objective;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ObjectiveFormData) => {
    setLoading(true);
    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: ObjectiveFormData) => {
    const result = await objectiveService.createObjective(data);
    if (result) {
      toast.success('Meta criada com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: ObjectiveFormData) => {
    const result = await objectiveService.updateObjective(
      String(objective?.id),
      data,
    );
    if (result) {
      toast.success('Meta atualizada com sucesso!');
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
      title={`${isEditing ? 'Editar' : 'Criar'} meta semanal`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar uma nova'
      } meta semanal`}
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
          label="Nome da meta"
          placeholder="Digite o nome da meta"
          name="name"
          control={control}
          icon={<TopicOutlined />}
        />
        <TextInput
          label="Quantidade de aulas ao vivo"
          name="schedules"
          control={control}
          type="number"
          icon={<DateRange />}
        />
        <TextInput
          label="Quantidade de aulas gravadas"
          name="classes"
          control={control}
          type="number"
          icon={<OndemandVideo />}
        />
        <TextInput
          label="Tempo de pratica em minutos"
          name="minutes"
          control={control}
          type="number"
          icon={<TimerOutlined />}
        />
      </Box>
    </ModalBase>
  );
};
