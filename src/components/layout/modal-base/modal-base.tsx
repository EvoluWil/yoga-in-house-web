import { Close } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Divider,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { ModalBaseContainer } from './modal-base.style';

export type ModalBaseInternalProps = {
  buttons: JSX.Element;
  title: string;
  subtitle?: string;
} & ModalBaseProps;

export type ModalBaseProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalBase: React.FC<PropsWithChildren<ModalBaseInternalProps>> = ({
  open,
  onClose,
  children,
  buttons,
  title,
  subtitle,
}) => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ModalBaseContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack alignItems="center">
            <Typography
              variant="h6"
              className="text-left w-full"
              color="primary"
            >
              {title}
            </Typography>
            {!!subtitle && (
              <Typography variant="body2" className="text-left w-full">
                {subtitle}
              </Typography>
            )}
          </Stack>
          <IconButton color="primary" sx={{ mt: -3, mr: -3 }}>
            <Close onClick={onClose} />
          </IconButton>
        </Stack>
        <Divider className="w-full my-4" />
        {children}
        <Divider className="w-full my-4" />
        <Box
          className="flex gap-4 justify-end w-full items-center"
          flexDirection={{ sm: 'row', xs: 'column' }}
          sx={{
            '& button': {
              width: matches ? '100%' : 'auto',
            },
          }}
        >
          {buttons}
        </Box>
      </ModalBaseContainer>
    </Modal>
  );
};
