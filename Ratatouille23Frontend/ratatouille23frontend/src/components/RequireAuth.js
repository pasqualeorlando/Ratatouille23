import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SidebarLayout from "./Sidebar/SidebarLayout";
import AppBarLayout from './AppBarAddetti/AppBarLayout';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.dipendente ?
            allowedRoles?.includes(auth.dipendente.ruolo) ? 
                (auth?.dipendente.ruolo === 'Amministratore' || auth.dipendente.ruolo === 'Supervisore')?
                    <SidebarLayout><Outlet/></SidebarLayout>
                : <AppBarLayout><Outlet/></AppBarLayout>
            : <Navigate to="/unauthorized" state={{from: location}} replace/>
    : <Navigate to="/login"/>
}

export default RequireAuth;