import { ImageInput } from '@/components/inputs/image-input/image-input';
import {
  Option,
  SelectInput,
} from '@/components/inputs/select-input/select-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import { VideoInput } from '@/components/inputs/video-input/video-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { classCategoryService } from '@/services/class-category.service';
import { classService } from '@/services/class.service';
import { firebaseService } from '@/services/firebase.service';
import { instructorService } from '@/services/instructor.service';
import { Category } from '@/types/category';
import { Class } from '@/types/class';
import { DifficultyEnumOptions } from '@/types/difficulty';
import { Instructor } from '@/types/instructor';
import { formatSelectOptions } from '@/utils/format-select-options';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ArticleOutlined,
  Event,
  TimerOutlined,
  TrendingUp,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ClassFormData,
  classDefaultValues,
  classFormSchema,
  classFormUpdateSchema,
} from './class.schema';

type SelectOptions = {
  instructors: Option<Instructor>[];
  categories: Option<Category>[];
};

type ClassModalProps = {
  classData: Class | null;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const ClassModal: React.FC<ClassModalProps> = ({
  classData,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<ClassFormData>({
    defaultValues: {
      title: classData?.title || classDefaultValues.title,
      description: classData?.description || classDefaultValues.description,
      difficulty: classData?.difficulty || classDefaultValues.difficulty,
      duration: classData?.duration || classDefaultValues.duration,
      instructorId: classData?.instructorId || classDefaultValues.instructorId,
      classCategoryId:
        classData?.classCategoryId || classDefaultValues.classCategoryId,
      picture: classData?.picture || classDefaultValues.picture,
      video: classData?.video || classDefaultValues.video,
    },
    resolver: yupResolver(
      classData ? classFormUpdateSchema : classFormSchema,
    ) as any,
  });

  const isEditing = !!classData;
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<SelectOptions>({
    instructors: [],
    categories: [],
  });

  const onSubmit = async (data: ClassFormData) => {
    setLoading(true);

    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async ({ video, ...rest }: ClassFormData) => {
    const result = await classService.createClass(rest);

    if (result?.id) {
      const videoUrl = await firebaseService.uploadFile({
        file: video as File,
        collectionId: result.id,
        destination: 'classes',
        type: 'video',
      });

      if (videoUrl) {
        const hasSuccess = await classService.updateClassVideo(
          result.id,
          videoUrl,
        );

        if (hasSuccess) {
          toast.success('Aula criada com sucesso!');
          await onSuccess();
          handleClose();
        }
      } else {
        await classService.deleteClass(result.id);
      }
    }
  };

  const handleEdit = async (data: ClassFormData) => {
    if (data?.video) {
      delete data.video;
    }

    if (data?.picture?.includes('http')) {
      delete data.picture;
    }

    const result = await classService.updateClass(String(classData?.id), data);
    if (result) {
      toast.success('Aula atualizada com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleChangeDuration = (duration: number) => {
    if (duration) {
      setValue('duration', Math.round(duration / 60));
    }
  };

  const getData = async () => {
    const instructors = await instructorService.getInstructors({
      select: 'id name',
    });

    const categories = await classCategoryService.getClassCategories({
      select: 'id title',
    });

    if (categories && instructors) {
      setSelectOptions({
        instructors: formatSelectOptions(instructors, 'id', 'name'),
        categories: formatSelectOptions(categories, 'id', 'title'),
      });
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
      title={`${isEditing ? 'Editar' : 'Criar'} aula`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar uma nova'
      } aula`}
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
        <ImageInput
          name="picture"
          control={control}
          isBase64
          variant="RECTANGLE"
          sx={{ mb: 2 }}
        />
        <TextInput
          label="Titulo da aula"
          placeholder="Digite o titulo"
          name="title"
          control={control}
          icon={<Event />}
        />
        <TextInput
          label="Descrição da aula"
          placeholder="Digite a descrição..."
          name="description"
          control={control}
          multiline
          rows={3}
          icon={<ArticleOutlined sx={{ mt: -6 }} />}
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
          placeholder="Selecione a instrutor"
          name="instructorId"
          control={control}
          type="number"
          options={selectOptions.instructors}
          icon={<TimerOutlined />}
        />
        <SelectInput
          placeholder="Selecione a categoria"
          name="classCategoryId"
          control={control}
          type="number"
          options={selectOptions.categories}
          icon={<TimerOutlined />}
        />
        {!classData && (
          <VideoInput
            name="video"
            control={control}
            sx={{ mt: 2 }}
            onChangeDuration={handleChangeDuration}
          />
        )}
      </Box>
    </ModalBase>
  );
};
