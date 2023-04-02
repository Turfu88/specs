import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingHome } from './pages/LandingHome';
import { Login } from './pages/Login/Login';
import { NoMatchPage } from './pages/NoMatchPage/NoMatchPage';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<div>yo !!!</div>} />
                <Route path="*" element={<NoMatchPage />} />
            </Routes>
        </BrowserRouter>
    );
}