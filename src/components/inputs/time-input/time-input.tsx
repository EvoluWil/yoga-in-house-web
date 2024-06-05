import { Stack, TextField } from '@mui/material';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { TextInputStyledProps } from '../text-input/text-input';

type TimeStyledProps = {
  maxTime?: Date;
  minTime?: Date;
  label: string;
} & TextInputStyledProps;

export type TimeProps<T extends FieldValues> = TimeStyledProps &
  UseControllerProps<T>;

export function TimeInput<T extends FieldValues>({
  maxTime,
  minTime,
  name,
  icon,
  control,
  defaultValue,
  rules,
  label,
  shouldUnregister,
  disabled,
  ...rest
}: TimeProps<T>) {
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
        <DesktopTimePicker
          label={label}
          maxTime={maxTime}
          minTime={minTime}
          inputFormat="HH:mm"
          ampm={false}
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
