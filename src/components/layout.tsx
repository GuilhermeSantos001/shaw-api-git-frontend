import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../material-ui-theme';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  let navigate = useNavigate();

  const gotoHomePage = () => {
    navigate('/', { replace: true });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters={true} className="w-[100vw] h-[100vh]">
          <Grid container flexDirection={'row'} className="h-[100vh]">
            <Grid item className="absolute w-full h-[100px] bg-gray-800">
              <div className="flex items-center justify-center h-full">
                <h1 className='font-bold text-4xl text-center text-slate-100 hover:text-slate-300 hover:cursor-pointer' onClick={gotoHomePage}>
                  Shaw GIT API
                </h1>
              </div>
            </Grid>
            <Grid item className="absolute w-full top-[100px] bottom-[50px] overflow-auto">
              {children}
            </Grid>
            <Grid item className="absolute w-full bottom-0 h-[50px] bg-slate-200">
              <div className="flex items-center justify-center h-full">
                <h1 className='font-bold text-sm text-center text-slate-400 hover:text-slate-600 hover:cursor-pointer'>
                  Copyright © 2022 Lack Zillions Over
                </h1>
              </div>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment >
  );
}
