import { DateInput } from '@/components/inputs/date-input/date-input';
import {
  Option,
  SelectInput,
} from '@/components/inputs/select-input/select-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import { TimeInput } from '@/components/inputs/time-input/time-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { instructorService } from '@/services/instructor.service';
import { scheduleService } from '@/services/schedule.service';
import { DifficultyEnumOptions } from '@/types/difficulty';
import { Instructor } from '@/types/instructor';
import { Schedule } from '@/types/schedule';
import { formatSelectOptions } from '@/utils/format-select-options';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ArticleOutlined,
  Event,
  GroupOutlined,
  LocationOnOutlined,
  SelfImprovement,
  TimerOutlined,
  TrendingUp,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { setHours, setMinutes } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ScheduleFormData,
  scheduleDefaultValues,
  scheduleFormSchema,
} from './schedule.schema';

type ScheduleModalProps = {
  schedule: Schedule | null;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  schedule,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<ScheduleFormData>({
    defaultValues: {
      title: schedule?.title || scheduleDefaultValues.title,
      description: schedule?.description || scheduleDefaultValues.description,
      date: schedule?.date || scheduleDefaultValues.date,
      time: schedule?.date
        ? setHours(
            setMinutes(new Date(), new Date(schedule?.date).getMinutes()),
            new Date(schedule?.date).getHours(),
          )
        : scheduleDefaultValues.time,
      duration: schedule?.duration || scheduleDefaultValues.duration,
      limit: schedule?.limit || scheduleDefaultValues.limit,
      location: schedule?.location || scheduleDefaultValues.location,
      difficulty: schedule?.difficulty || scheduleDefaultValues.difficulty,
      instructorId:
        schedule?.instructorId || scheduleDefaultValues.instructorId,
    },
    resolver: yupResolver(scheduleFormSchema),
  });

  const isEditing = !!schedule;
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState<Option<Instructor>[]>([]);

  const onSubmit = async (data: ScheduleFormData) => {
    setLoading(true);
    if (data.time) {
      data.date = setHours(
        setMinutes(data.date, data.time.getMinutes()),
        data.time.getHours(),
      );
    }

    delete data.time;

    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: ScheduleFormData) => {
    const result = await scheduleService.createSchedule(data);
    if (result) {
      toast.success('Agendamento criado com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: ScheduleFormData) => {
    const result = await scheduleService.updateSchedule(
      String(schedule?.id),
      data,
    );
    if (result) {
      toast.success('Agendamento atualizado com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const getData = async () => {
    const result = await instructorService.getInstructors({
      select: 'id name',
    });
    if (result) {
      setInstructors(formatSelectOptions(result, 'id', 'name'));
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ModalBase
      open
      onClose={handleClose}
      title={`${isEditing ? 'Editar' : 'Criar'} vaga na agenda`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar uma nova'
      } vaga na agenda`}
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
          label="Titulo da vaga na agenda"
          placeholder="Digite o titulo"
          name="title"
          control={control}
          icon={<Event />}
        />
        <TextInput
          label="Descrição da vaga na agenda"
          placeholder="Digite a descrição..."
          name="description"
          control={control}
          multiline
          rows={3}
          icon={<ArticleOutlined sx={{ mt: -6 }} />}
        />
        <Box display="flex" gap={2}>
          <DateInput label="Data" name="date" control={control} />
          <TimeInput label="Hora" name="time" control={control} />
        </Box>
        <TextInput
          label="Duração em minutos"
          name="duration"
          control={control}
          type="number"
          icon={<TimerOutlined />}
        />
        <TextInput
          label="Limite de alunos"
          name="limit"
          control={control}
          type="number"
          icon={<GroupOutlined />}
        />
        <TextInput
          label="Local da aula"
          placeholder="Url da video conferência ou endereço"
          name="location"
          control={control}
          icon={<LocationOnOutlined />}
        />
        <SelectInput
          control={control}
          name="difficulty"
          placeholder="Selecione o nível de dificuldade"
          label="Nível de dificuldade"
          options={DifficultyEnumOptions}
          icon={<TrendingUp />}
        />
        <SelectInput
          control={control}
          name="instructorId"
          label="Instrutor"
          placeholder="Selecione o instrutor"
          options={instructors}
          icon={<SelfImprovement />}
        />
      </Box>
    </ModalBase>
  );
};
