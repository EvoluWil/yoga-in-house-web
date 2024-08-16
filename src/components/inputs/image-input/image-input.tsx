import { AddAPhotoOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { ChangeEvent, useMemo } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface FileInputStyledProps {
  variant?: 'CIRCLE' | 'RECTANGLE';
  isBase64?: boolean;
  sx?: SxProps<Theme>;
}

export type ImageInputProps<T extends FieldValues> = FileInputStyledProps &
  UseControllerProps<T>;

export function ImageInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  variant = 'CIRCLE',
  isBase64 = false,
  sx,
}: ImageInputProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const preview = useMemo(() => {
    if (typeof field?.value === 'string' && field?.value?.includes('http')) {
      return `${field.value}?${new Date().getTime()}`;
    }

    if (field?.value && isBase64) {
      return field.value;
    }

    if (field?.value) {
      return URL.createObjectURL(field.value);
    }

    return null;
  }, [field?.value]);

  const handleAddImageClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      if (isBase64) {
        const reader = new FileReader();

        reader.onload = (e) => {
          field.onChange(e.target?.result);
        };

        reader.readAsDataURL(event.target.files[0]);
      } else {
        field.onChange(event.target.files[0]);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      gap={2}
      sx={sx}
    >
      <Box component="label" sx={{ cursor: 'pointer' }} height="80%">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={handleAddImageClick}
          disabled={disabled || isSubmitting}
        />
        <Avatar
          src={preview || ''}
          className="aspect-square mx-8 my-auto bg-transparent cursor-pointer border-2"
          sx={{
            width: variant === 'CIRCLE' ? 144 : 280,
            height: variant === 'CIRCLE' ? 144 : 280 / 1.5,
            borderStyle: preview ? 'solid' : 'dashed',
            borderColor: !!error?.message
              ? 'error.main'
              : preview
              ? 'primary.main'
              : 'grey.400',
            '&.MuiAvatar-root': {
              borderRadius: variant === 'CIRCLE' ? '50%' : '8px',
            },
          }}
        >
          {!preview && (
            <Stack direction="column" alignItems="center">
              <AddAPhotoOutlined
                sx={{
                  fontSize: 32,
                  color: !!error?.message ? 'error.main' : 'text.secondary',
                }}
              />
              <Typography
                variant="caption"
                color={!!error?.message ? 'error.main' : 'text.secondary'}
              >
                Adicionar imagem
              </Typography>
            </Stack>
          )}
        </Avatar>
      </Box>
      {preview && (
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAddImageClick}
            disabled={disabled || isSubmitting}
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            size="small"
          >
            Alterar imagem
          </Button>
        </label>
      )}
      {!!error?.message && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
