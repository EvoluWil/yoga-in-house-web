import { ImageInput } from '@/components/inputs/image-input/image-input';
import {
  Option,
  SelectInput,
} from '@/components/inputs/select-input/select-input';
import { TextInput } from '@/components/inputs/text-input/text-input';
import {
  ModalBase,
  ModalBaseProps,
} from '@/components/layout/modal-base/modal-base';
import { blogCategoryService } from '@/services/blog-category.service';
import { blogService } from '@/services/blog.service';
import { instructorService } from '@/services/instructor.service';
import { Blog } from '@/types/blog';
import { Category } from '@/types/category';
import { Instructor } from '@/types/instructor';
import { formatSelectOptions } from '@/utils/format-select-options';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArticleOutlined, Event, TimerOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BlogFormData, blogDefaultValues, blogFormSchema } from './blog.schema';

type SelectOptions = {
  instructors: Option<Instructor>[];
  categories: Option<Category>[];
};

type BlogModalProps = {
  blog?: Blog;
  onSuccess: () => Promise<unknown>;
} & ModalBaseProps;

export const BlogModal: React.FC<BlogModalProps> = ({
  blog,
  onSuccess,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<BlogFormData>({
    defaultValues: {
      title: blog?.title || blogDefaultValues.title,
      picture: blog?.picture || blogDefaultValues.picture,
      content: blog?.content || blogDefaultValues.content,
      instructorId: blog?.instructorId || blogDefaultValues.instructorId,
      blogCategoryId: blog?.blogCategoryId || blogDefaultValues.blogCategoryId,
    },
    resolver: yupResolver(blogFormSchema),
  });

  const isEditing = !!blog;
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<SelectOptions>({
    instructors: [],
    categories: [],
  });

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);

    if (isEditing) {
      await handleEdit(data);
    } else {
      await handleCrate(data);
    }
    setLoading(false);
  };

  const handleCrate = async (data: BlogFormData) => {
    const result = await blogService.createBlog(data);
    if (result) {
      toast.success('Notícia criada com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const handleEdit = async (data: BlogFormData) => {
    const result = await blogService.updateBlog(String(blog?.id), data);
    if (result) {
      toast.success('Notícia atualizada com sucesso!');
      await onSuccess();
      handleClose();
    }
  };

  const getData = async () => {
    const instructors = await instructorService.getInstructors({
      select: 'id name',
    });

    const categories = await blogCategoryService.getBlogCategories({
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
      title={`${isEditing ? 'Editar' : 'Criar'} notícia`}
      subtitle={`Preencha os campos abaixo para ${
        isEditing ? 'editar' : 'criar uma nova'
      } notícia`}
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
          label="Titulo da notícia"
          placeholder="Digite o titulo"
          name="title"
          control={control}
          icon={<Event />}
        />

        <TextInput
          label="Conteúdo da notícia"
          placeholder="Digite o conteúdo.."
          name="content"
          control={control}
          multiline
          rows={3}
          icon={<ArticleOutlined sx={{ mt: -6 }} />}
        />

        <SelectInput
          placeholder="Selecione a categoria"
          name="blogCategoryId"
          control={control}
          type="number"
          options={selectOptions.categories}
          icon={<TimerOutlined />}
        />

        <SelectInput
          placeholder="Selecione a instrutor"
          name="instructorId"
          control={control}
          type="number"
          options={selectOptions.instructors}
          icon={<TimerOutlined />}
        />
      </Box>
    </ModalBase>
  );
};
