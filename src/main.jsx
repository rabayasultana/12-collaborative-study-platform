import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './providers/Authprovider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <div className='max-w-screen-xl mx-auto font-lato'>
     <RouterProvider router={router} />
     </div>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
