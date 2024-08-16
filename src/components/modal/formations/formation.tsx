import {
  Option,
  SelectInput,
} from '@/components/inputs/select-input/select-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { classService } from '@/services/class.service';
import { formationService } from '@/services/formation.service';
import { Formation } from '@/types/formation';
import { formatSelectOptions } from '@/utils/format-select-options';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ArticleOutlined,
  OndemandVideo,
  TopicOutlined,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  FormationFormData,
  formationDefaultValues,
  formationFormSchema,
} from './formation.schema';

type FormationModalProps = {
  formation: Formation | null;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const FormationModal: React.FC<FormationModalProps> = ({
  formation,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<FormationFormData>(
    {
      defaultValues: {
        title: formation?.title || formationDefaultValues.title,
        description:
          formation?.description || formationDefaultValues.description,
        contentsId: formation?.contentsId || formationDefaultValues.contentsId,
      },
      resolver: yupResolver(formationFormSchema),
    },
  );

  const selectForm = useForm({
    defaultValues: {
      contentId: '',
    },
  });

  const contents = useWatch({
    control,
    name: 'contentsId',
  });

  const isEditing = !!formation;
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Option[]>([]);

  const onSubmit = async (data: FormationFormData) => {
    setLoading(true);
    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: FormationFormData) => {
    const result = await formationService.createFormation(data);
    if (result) {
      toast.success('Formação criada com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: FormationFormData) => {
    const result = await formationService.updateFormation(
      String(formation?.id),
      data,
    );
    if (result) {
      toast.success('Formação atualizada com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const getData = async () => {
    const result = await classService.getClasses({
      select: 'id title',
    });

    if (result) {
      setClasses(formatSelectOptions(result, 'id', 'title'));
    }
  };

  const handleAddContent = (contentId: string) => {
    if (!contentId || contents.includes(contentId)) return;
    const newContents = [...contents, contentId];
    setValue('contentsId', newContents);
  };

  const handleRemoveContent = (contentId: string) => {
    const newContents = contents.filter((c) => c !== contentId);
    setValue('contentsId', newContents);
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
      title={`${isEditing ? 'Editar' : 'Criar'} formação`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar uma nova'
      } formação`}
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
          label="Titulo da formação"
          placeholder="Digite o titulo da formação"
          name="title"
          control={control}
          icon={<TopicOutlined />}
        />
        <TextInput
          label="Descrição da formação"
          placeholder="Digite a descrição..."
          name="description"
          control={control}
          multiline
          rows={3}
          icon={<ArticleOutlined sx={{ mt: -6 }} />}
        />
        <SelectInput
          control={selectForm?.control}
          name="contentId"
          placeholder="Selecione o nível de dificuldade"
          label="Selecione o conteúdo"
          options={classes?.filter((c) => !contents.includes(c.value))}
          icon={<OndemandVideo />}
          onCallback={handleAddContent}
        />
        <Divider sx={{ width: '100%' }} />
        <Typography variant="body2" color="text.secondary">
          Conteúdo selecionado
        </Typography>
        {contents?.length === 0 && (
          <Typography
            variant="caption"
            color="text.secondary"
            component="p"
            mx="auto"
            my={2}
          >
            Nenhum conteúdo selecionado
          </Typography>
        )}

        {contents?.map((contentId) => (
          <Chip
            key={contentId}
            label={classes.find((c) => c.value === contentId)?.label}
            variant="outlined"
            onDelete={() => handleRemoveContent(contentId)}
          />
        ))}
      </Box>
    </ModalBase>
  );
};
