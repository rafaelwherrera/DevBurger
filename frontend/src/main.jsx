import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import AppProvider from './hooks';
import GlobalStyles from './styles/globalStyles';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/StripeConfig';
import { Router } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Deixe apenas esse BrowserRouter */}
      <AppProvider>
        <Elements stripe={stripePromise}>
          <ThemeProvider theme={theme}>
            <Router /> {/* Esse é o seu roteamento */}
          </ThemeProvider>
        </Elements>
        <GlobalStyles />
        <ToastContainer
          theme="colored"
          toastClassName="custom-toast"
          progressClassName="custom-progress" />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
