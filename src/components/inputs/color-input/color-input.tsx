import { Box, Typography } from '@mui/material';
import { Wheel } from '@uiw/react-color';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export interface ColorInputStyledProps {
  label: string;
}

export type ColorInputProps<T extends FieldValues> = ColorInputStyledProps &
  UseControllerProps<T>;

export function ColorInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
}: ColorInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });
  return (
    <Box className="flex items-center justify-center flex-col ">
      <Typography
        variant="body2"
        fontSize={14}
        gutterBottom
        color={error?.message ? 'error.main' : 'grey.700'}
      >
        {label}
      </Typography>
      <Wheel
        color={field.value}
        height={80}
        width={80}
        slot="bottom-right"
        onChange={(color) => {
          field.onChange(color.hex);
        }}
      />
      {!!error?.message && (
        <Typography variant="caption" gutterBottom color="error" mt={1}>
          {label}
        </Typography>
      )}
    </Box>
  );
}
