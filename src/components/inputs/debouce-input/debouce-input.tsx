import { useDebounce } from '@/hooks/debounce';
import { Search } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  StandardTextFieldProps,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

type StandardInputDebouncePropsEdit = Omit<
  StandardTextFieldProps,
  'onChange' | 'variant'
>;

export interface InputDebounceProps extends StandardInputDebouncePropsEdit {
  onChange: (value: string) => Promise<void> | void;
  loading?: boolean;
}

export const InputDebounce: React.FC<InputDebounceProps> = ({
  onChange,
  loading,
  ...rest
}) => {
  const [value, setValue] = useState('');
  const [oldValue, setOldValue] = useState('');

  const debounced = useDebounce(value, 500);

  const handleChange = async (value: string) => {
    await onChange(value);
    setOldValue(value);
  };

  useEffect(() => {
    if (debounced !== oldValue) {
      handleChange(debounced);
    }
  }, [debounced, oldValue]);

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: <Search color="primary" sx={{ mr: 1 }} />,
        endAdornment: (value !== oldValue || loading) && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress color="primary" size={24} />
          </Box>
        ),
        disableUnderline: true,
        sx: { fontSize: 'default' },
      }}
      variant="standard"
      size="small"
      fullWidth
      sx={{
        minWidth: '200px',
        bgcolor: 'white',
        borderRadius: 1,
        p: 0.7,
      }}
      {...rest}
    />
  );
};
