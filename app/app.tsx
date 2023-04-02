
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import './styles/theme.css';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);