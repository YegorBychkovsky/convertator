import React from 'react';
import Box from '@mui/material/Box';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <Box
        className={styles.header}
        sx={{
          backgroundColor: 'primary.dark',
        }}>
        BEST Currency Converter
      </Box>
    </>
  );
};
export default Header;
