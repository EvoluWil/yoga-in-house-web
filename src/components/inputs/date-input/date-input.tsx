import { Stack, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { TextInputStyledProps } from '../text-input/text-input';

type DateStyledProps = {
  maxDate?: Date;
  minDate?: Date;
  label: string;
} & TextInputStyledProps;

export type DateProps<T extends FieldValues> = DateStyledProps &
  UseControllerProps<T>;

export function DateInput<T extends FieldValues>({
  maxDate,
  minDate,
  name,
  icon,
  control,
  defaultValue,
  rules,
  label,
  shouldUnregister,
  disabled,
  ...rest
}: DateProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || undefined,
    rules,
    shouldUnregister,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ width: '100%' }}>
        <DesktopDatePicker
          label={label}
          maxDate={maxDate}
          minDate={minDate}
          inputFormat="DD/MM/YYYY"
          disabled={disabled}
          InputAdornmentProps={{ position: 'start' }}
          renderInput={(params) => (
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              helperText={error?.message}
              error={!!error?.message}
              disabled={disabled || isSubmitting}
              required={!!rules?.required}
              type="date"
              {...rest}
              {...params}
              sx={{
                '.MuiFormHelperText-root, .MuiOutlinedInput-notchedOutline, .MuiInputLabel-root':
                  !!error?.message
                    ? {
                        color: (theme) => `${theme.palette.error.main}`,
                        borderColor: (theme) =>
                          `${theme.palette.error.main} !important`,
                      }
                    : {},
              }}
            />
          )}
          {...field}
        />
      </Stack>
    </LocalizationProvider>
  );
}
