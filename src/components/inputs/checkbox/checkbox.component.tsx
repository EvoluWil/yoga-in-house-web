import { theme } from '@/global/theme';
import {
  Checkbox as CheckboxBase,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface CheckboxPropsEdit extends CheckboxProps {
  label: string;
}

export type TextInputProps<T extends FieldValues> = CheckboxPropsEdit &
  UseControllerProps<T>;

export function Checkbox<T extends FieldValues>({
  label,
  name,
  icon,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
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
    <FormControl
      required
      error={!!error?.message}
      disabled={disabled || isSubmitting}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <CheckboxBase
              size="small"
              sx={{
                color: error?.message
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
                '&.Mui-checked': {
                  color: error?.message
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
                },
              }}
            />
          }
          sx={{
            '& .MuiFormControlLabel-label': {
              color: 'grey.700',
              fontSize: 14,
              ml: -0.5,
            },
          }}
          label={label}
        />
      </FormGroup>
      <FormHelperText sx={{ mt: -0.5 }}>{error?.message}</FormHelperText>
    </FormControl>
  );
}
