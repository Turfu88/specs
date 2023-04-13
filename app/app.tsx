
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import './styles/theme.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
              <Router />
        </QueryClientProvider>
    </React.StrictMode>
);