import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from './context/authContext';
import { ComplaintsContextProvider } from './context/complaintContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ComplaintsContextProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </ComplaintsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
