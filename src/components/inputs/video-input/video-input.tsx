import { VideoCallOutlined } from '@mui/icons-material';
import { Box, Button, Stack, SxProps, Theme, Typography } from '@mui/material';
import { ChangeEvent, useMemo } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface FileInputStyledProps {
  defaultValue?: string;
  onChangeDuration?: (duration: number) => void;
  sx?: SxProps<Theme>;
}

export type VideoInputProps<T extends FieldValues> = FileInputStyledProps &
  UseControllerProps<T>;

export function VideoInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  onChangeDuration,
  sx,
}: VideoInputProps<T>) {
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
    if (
      defaultValue ||
      (typeof field?.value === 'string' && field?.value?.includes('http'))
    ) {
      return defaultValue;
    }

    if (field?.value) {
      return URL.createObjectURL(field.value);
    }

    return null;
  }, [field?.value, defaultValue]);

  const handleAddImageClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      if (onChangeDuration) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const videoElement = document.createElement(
            'video',
          ) as HTMLVideoElement;
          if (videoElement) {
            videoElement.src = e.target?.result as string;
            videoElement.onloadedmetadata = function () {
              onChangeDuration(videoElement.duration);
            };
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      field.onChange(event.target.files[0]);
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
          accept="video/*"
          onChange={handleAddImageClick}
          disabled={disabled || isSubmitting}
        />
        <Box
          className="bg-transparent cursor-pointer border-2 flex items-center justify-center rounded-md"
          sx={{
            width: 282,
            height: 286 / 1.5,
            borderStyle: preview ? 'solid' : 'dashed',
            borderColor: !!error?.message
              ? 'error.main'
              : preview
              ? 'primary.main'
              : 'grey.400',
          }}
        >
          {preview ? (
            <Box
              component="video"
              src={preview}
              controls
              sx={{
                width: 280,
                height: 280 / 1.5,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          ) : (
            <Stack direction="column" alignItems="center">
              <VideoCallOutlined
                sx={{
                  fontSize: 42,
                  color: !!error?.message ? 'error.main' : 'text.secondary',
                }}
              />
              <Typography
                variant="caption"
                color={!!error?.message ? 'error.main' : 'text.secondary'}
              >
                Adicionar video
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>
      {preview && (
        <label>
          <input
            type="file"
            accept="video/*"
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
            Alterar video
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
