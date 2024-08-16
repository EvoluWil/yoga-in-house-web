import { ColorInput } from '@/components/inputs/color-input/color-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { blogCategoryService } from '@/services/blog-category.service';
import { classCategoryService } from '@/services/class-category.service';
import { Category } from '@/types/category';
import { yupResolver } from '@hookform/resolvers/yup';
import { Event } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CategoryFormData,
  categoryDefaultValues,
  categoryFormSchema,
} from './category.schema';

type CategoryModalProps = {
  category: Category | null;
  onSuccess: () => Promise<unknown>;
  type: 'CLASS' | 'BLOG';
} & ModalBaseProps;

export const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  onSuccess,
  onClose,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<CategoryFormData>({
    defaultValues: {
      title: category?.title || categoryDefaultValues.title,
      color: category?.color || categoryDefaultValues.color,
    },
    resolver: yupResolver(categoryFormSchema),
  });

  const isEditing = !!category;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);

    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: CategoryFormData) => {
    let result: unknown;
    if (type === 'CLASS') {
      result = await classCategoryService.createClassCategory(data);
    }

    if (type === 'BLOG') {
      result = await blogCategoryService.createBlogCategory(data);
    }

    if (result) {
      toast.success('Categoria adicionado com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: CategoryFormData) => {
    let result: unknown;
    if (type === 'CLASS') {
      result = await classCategoryService.updateClassCategory(
        String(category?.id),
        data,
      );
    }

    if (type === 'BLOG') {
      result = await blogCategoryService.updateBlogCategory(
        String(category?.id),
        data,
      );
    }

    if (result) {
      toast.success('Categoria atualizado com sucesso!');
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
      title={`${isEditing ? 'Editar' : 'Criar'} categoria`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar uma nova'
      } categoria`}
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
          label="Titulo da categoria"
          placeholder="Digite o titulo da categoria"
          name="title"
          control={control}
          icon={<Event />}
        />

        <ColorInput control={control} name="color" label="Cor da categoria" />
      </Box>
    </ModalBase>
  );
};
