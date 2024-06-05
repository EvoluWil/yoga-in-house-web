import { Box, styled } from '@mui/material';

export const ModalBaseContainer = styled(Box)`
  position: relative;
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: auto;
  overflow-x: hidden;
  max-height: 80vh;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up('md')} {
    max-width: 70%;
  }
`;
