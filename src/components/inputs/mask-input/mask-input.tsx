import InputMask from '@mona-health/react-input-mask';
import {
  Box,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type OutlinedTextInputPropsEdit = Omit<OutlinedTextFieldProps, 'variant'>;

export interface MaskInputStyledProps extends OutlinedTextInputPropsEdit {
  icon?: JSX.Element;
  mask: string;
}

export type MaskInputProps<T extends FieldValues> = MaskInputStyledProps &
  UseControllerProps<T>;

export function MaskInput<T extends FieldValues>({
  mask,
  name,
  icon,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  ...rest
}: MaskInputProps<T>) {
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

  return (
    <InputMask
      mask={mask}
      value={field.value}
      onChange={field.onChange}
      maskPlaceholder={null}
    >
      <Box width="100%">
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          helperText={error?.message}
          error={!!error?.message}
          disabled={disabled || isSubmitting}
          required={!!rules?.required}
          value={field.value}
          {...rest}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null,
          }}
        />
      </Box>
    </InputMask>
  );
}
