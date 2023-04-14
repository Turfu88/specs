import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Login } from './pages/Login/Login';
import { NoMatchPage } from './pages/NoMatchPage/NoMatchPage';
import { Contact } from './pages/Contact/Contact';
import { LandingConnected } from './pages/LandingConnected/LandingConnected';
import { ProjectView } from './pages/Project/ProjectView';
import { Settings } from './pages/Settings/Settings';
import { Element } from './pages/Element/Element';
import { ElementEdit } from './pages/Element/ElementEdit';
import { ProjectEdit } from './pages/Project/ProjectEdit';
import { EntryPoint } from './pages/EntryPoint/EntryPoint';
import { EntryPointEdit } from './pages/EntryPoint/EntryPointEdit';
import { PageView } from './pages/Page/PageView';
import { Summary } from './pages/Summary/Summary';
import { Feature } from './pages/Feature/Feature';
import { Spec } from './pages/Spec/Spec';
import { AddUser } from './pages/AddUser/AddUser';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';
import { isLogedIn } from './common/api/authentication';
import { ProjectCore } from './pages/ProjectCore/ProjectCore';
import { PageForm } from './pages/Page/PageForm';
import { FeatureForm } from './pages/Feature/FeatureForm';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                             element={<Homepage />} />
                <Route path="/login"                        element={<Login />} />
                <Route path="/contact"                      element={<Contact />} />
                <Route path="/creer-un-compte"              element={<CreateAccount />} />
                <Route path="/dashboard"                    element={<UserRoute><LandingConnected /></UserRoute>} />
                <Route path="/projet/nouveau"               element={<UserRoute><ProjectEdit /></UserRoute>} />
                <Route path="/projet/nouveau-coeur"         element={<UserRoute><ProjectCore /></UserRoute>} />
                <Route path="/projet/:uid/modifier"         element={<UserRoute><ProjectEdit /></UserRoute>} />
                <Route path="/projet/:uid"                  element={<UserRoute><ProjectView /></UserRoute>} />
                <Route path="/parametres/inviter-un-collaborateur" element={<UserRoute><AddUser /></UserRoute>} />
                <Route path="/parametres"                   element={<UserRoute><Settings /></UserRoute>} />
                <Route path="/elements"                     element={<UserRoute><Element /></UserRoute>} />
                <Route path="/element/:uid/modifier"        element={<UserRoute><ElementEdit /></UserRoute>} />
                <Route path="/element/:uid"                 element={<UserRoute><ElementEdit /></UserRoute>} />
                <Route path="/elements"                     element={<UserRoute><Element /></UserRoute>} />
                <Route path="/point-entree/:uid/modifier"   element={<UserRoute><EntryPointEdit /></UserRoute>} />
                <Route path="/point-entree/:uid"            element={<UserRoute><EntryPointEdit /></UserRoute>} />
                <Route path="/point-entree"                 element={<UserRoute><EntryPoint /></UserRoute>} />
                <Route path="/page/nouvelle"                element={<UserRoute><PageForm /></UserRoute>} />
                <Route path="/page/:uid"                    element={<UserRoute><PageView /></UserRoute>} />
                <Route path="/summary/:uid"                 element={<UserRoute><Summary /></UserRoute>} />
                <Route path="/fonctionnalite/nouvelle"      element={<UserRoute><FeatureForm /></UserRoute>} />
                <Route path="/fonctionnalite/:uid"          element={<UserRoute><Feature /></UserRoute>} />
                <Route path="/spec/:uid"                    element={<UserRoute><Spec /></UserRoute>} />
                <Route path="*"                             element={<NoMatchPage />} />
            </Routes>
        </BrowserRouter>
    );
}

function AdminRoute({ children }: { children: JSX.Element }) {    
    if (!isLogedIn('ROLE_ADMIN')) {
        return <Navigate to="/login" replace />
    }
    return (children);
}

function UserRoute({ children }: { children: JSX.Element }) {    
    if (!isLogedIn('ROLE_USER')) {
        return <Navigate to="/login" replace />
    }
    return (children);
}
