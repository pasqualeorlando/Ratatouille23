import { PROFILO, LOGOUT, TAVOLI, ORDINAZIONI } from "../../navigation/CONSTANTS";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import TableBarIcon from '@mui/icons-material/TableBar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const items = [
    {
        id: 1,
        nome: 'Tavoli',
        link: TAVOLI,
        icona: TableBarIcon,
    },
    {
        id: 2,
        nome: 'Ordinazioni',
        icona: AppRegistrationIcon,
        link: ORDINAZIONI,
    },
    {
        id: 3,
        nome: 'Profilo',
        icona: SupervisedUserCircleIcon,
        link: PROFILO,
    },
    {
        id: 4,
        nome: 'Logout',
        icona: LogoutIcon,
        link: LOGOUT,
    },
];