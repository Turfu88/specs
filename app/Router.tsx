import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from './pages/Homepage/Homepage';
import { Login } from './pages/Login/Login';
import { NoMatchPage } from './pages/NoMatchPage/NoMatchPage';
import { Contact } from './pages/Contact/Contact';
import { LandingConnected } from './pages/LandingConnected/LandingConnected';
import { ProjectView } from './pages/Project/ProjectView';
import { Settings } from './pages/Settings/Settings';
import { ElementView } from './pages/Element/ElementView';
import { ElementCreate } from './pages/Element/ElementCreate';
import { NewProjectForm } from './pages/Project/NewProjectForm';
import { ConnectionView } from './pages/EntryPoint/ConnectionView';
import { ConnectionCreate } from './pages/EntryPoint/ConnectionCreate';
import { PageView } from './pages/Page/PageView';
import { Summary } from './pages/Summary/Summary';
import { FeatureView } from './pages/Feature/FeatureView';
import { SpecView } from './pages/Spec/SpecView';
import { AddUser } from './pages/AddUser/AddUser';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';
import { isLogedIn } from './common/api/authentication';
import { ProjectCore } from './pages/ProjectCore/ProjectCore';
import { PageCreate } from './pages/Page/PageCreate';
import { FeatureCreate } from './pages/Feature/FeatureCreate';
import { SpecCreate } from './pages/Spec/SpecCreate';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                             element={<Homepage />} />
                <Route path="/login"                        element={<Login />} />
                <Route path="/contact"                      element={<Contact />} />
                <Route path="/creer-un-compte"              element={<CreateAccount />} />
                <Route path="/dashboard"                    element={<UserRoute><LandingConnected /></UserRoute>} />
                <Route path="/projet/nouveau"               element={<UserRoute><NewProjectForm /></UserRoute>} />
                <Route path="/projet/nouveau-coeur"         element={<UserRoute><ProjectCore /></UserRoute>} />
                <Route path="/projet/:uid"                  element={<UserRoute><ProjectView /></UserRoute>} />
                <Route path="/parametres/inviter-un-collaborateur" element={<UserRoute><AddUser /></UserRoute>} />
                <Route path="/parametres"                   element={<UserRoute><Settings /></UserRoute>} />
                <Route path="/element/nouveau"              element={<UserRoute><ElementCreate /></UserRoute>} />
                <Route path="/element/:uid"                 element={<UserRoute><ElementView /></UserRoute>} />
                <Route path="/connexion/nouvelle"           element={<UserRoute><ConnectionCreate /></UserRoute>} />
                <Route path="/connexion/:uid"               element={<UserRoute><ConnectionView /></UserRoute>} />
                <Route path="/page/nouvelle"                element={<UserRoute><PageCreate /></UserRoute>} />
                <Route path="/page/:uid"                    element={<UserRoute><PageView /></UserRoute>} />
                <Route path="/summary/:uid"                 element={<UserRoute><Summary /></UserRoute>} />
                <Route path="/fonctionnalite/nouvelle"      element={<UserRoute><FeatureCreate /></UserRoute>} />
                <Route path="/fonctionnalite/:uid"          element={<UserRoute><FeatureView /></UserRoute>} />
                <Route path="/spec/nouvelle"                element={<UserRoute><SpecCreate /></UserRoute>} />
                <Route path="/spec/:uid"                    element={<UserRoute><SpecView /></UserRoute>} />
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
