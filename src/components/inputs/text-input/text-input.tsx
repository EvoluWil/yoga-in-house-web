import {
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

export interface TextInputStyledProps extends OutlinedTextInputPropsEdit {
  icon?: JSX.Element;
}

export type TextInputProps<T extends FieldValues> = TextInputStyledProps &
  UseControllerProps<T>;

export function TextInput<T extends FieldValues>({
  name,
  icon,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  select = false,
  ...rest
}: TextInputProps<T>) {
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
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      select={select}
      helperText={error?.message}
      error={!!error?.message}
      disabled={disabled || isSubmitting}
      required={!!rules?.required}
      sx={{
        '*': {
          zIndex: 1,
        },
      }}
      {...rest}
      {...field}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment
            position="start"
            sx={
              select && !field.value
                ? {
                    position: 'relative',
                    '&:after': {
                      content: `"${rest?.placeholder}"`,
                      position: 'absolute',
                      top: -12,
                      left: 32,
                    },
                  }
                : {}
            }
          >
            {icon}
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
