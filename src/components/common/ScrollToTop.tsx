'use client';
import { Fab, ThemeProvider } from '@mui/material';
import { scrollFabTheme } from './Themes';
import { PageTop } from './Icon';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ThemeProvider theme={scrollFabTheme}>
      <Fab variant="extended" size="small" color="primary" className='pointer-events-auto' onClick={scrollToTop}>
        <div className='flex flex-row items-center'>
          <PageTop />
        </div>
      </Fab>
    </ThemeProvider>
  );
}