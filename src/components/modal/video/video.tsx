import { Option } from '@/components/inputs/select-input/select-input';
import { VideoInput } from '@/components/inputs/video-input/video-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { classService } from '@/services/class.service';
import { firebaseService } from '@/services/firebase.service';
import { Category } from '@/types/category';
import { Class } from '@/types/class';
import { Instructor } from '@/types/instructor';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  VideoFormData,
  videoDefaultValues,
  videoFormSchema,
} from './video.schema';

type SelectOptions = {
  instructors: Option<Instructor>[];
  categories: Option<Category>[];
};

type VideoModalProps = {
  classData: Class | null;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const VideoModal: React.FC<VideoModalProps> = ({
  classData,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<VideoFormData>({
    defaultValues: {
      video: videoDefaultValues.video,
      duration: videoDefaultValues.duration,
    },
    resolver: yupResolver(videoFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: VideoFormData) => {
    if (!classData) return;

    setLoading(true);
    await classService.updateClass(classData?.id, {
      duration: data.duration,
    });

    const videoUrl = await firebaseService.uploadFile({
      file: data.video as File,
      collectionId: classData?.id,
      destination: 'classes',
      type: 'video',
    });

    if (videoUrl) {
      const hasSuccess = await classService.updateClassVideo(
        classData.id,
        videoUrl,
      );

      if (hasSuccess) {
        await onSuccess();
        toast.success('Aula atualizada com sucesso!');
        handleClose();
      }
    } else {
      toast.error(
        'Falha ao fazer upload do vídeo. Tente novamente mais tarde!',
      );
    }

    setLoading(false);
  };

  const handleChangeDuration = (duration: number) => {
    if (duration) {
      setValue('duration', Math.floor(duration));
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
      title="Alterar video"
      subtitle="Selecione o novo video"
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
        <VideoInput
          name="video"
          control={control}
          sx={{ mt: 2 }}
          onChangeDuration={handleChangeDuration}
        />
      </Box>
    </ModalBase>
  );
};
