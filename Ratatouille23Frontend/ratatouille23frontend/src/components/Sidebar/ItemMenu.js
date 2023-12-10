import { DASHBOARD, DIPENDENTI, TAVOLI, PIATTI, CATEGORIE, GESTIONEMENU, STATSALA, STATCUCINA, ORDINAZIONI, PROFILO, LOGOUT, GESTIONEATTIVITA } from "../../navigation/CONSTANTS";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableBarIcon from '@mui/icons-material/TableBar';
import FlatwareIcon from '@mui/icons-material/Flatware';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const itemMenu = [
    {
        id: 0,
        nome: 'Dashboard',
        link: DASHBOARD,
        icona: DashboardIcon,
    },
    {
        id: 1,
        nome: 'Dipendenti',
        link: DIPENDENTI,
        icona: SupervisedUserCircleIcon,
    },
    {
        id: 2,
        nome: 'Tavoli',
        link: TAVOLI,
        icona: TableBarIcon,
    },
    {
        id: 3,
        nome: 'Menu',
        icona: FlatwareIcon,
        subItem: [
            {
                id: 4,
                nome: 'Piatti',
                link: PIATTI, 
            },
            {
                id: 5,
                nome: 'Categorie',
                link: CATEGORIE,
            },
            {
                id: 6,
                nome: 'Gestione menu',
                link: GESTIONEMENU,
            }
        ],
    },
    {
        id: 7,
        nome: 'Statistiche',
        icona: LeaderboardIcon,
        subItem: [
            {
                id: 8,
                nome: 'Addetti alla sala',
                link: STATSALA,
            },
            {
                id: 9,
                nome: 'Addetti alla cucina',
                link: STATCUCINA,
            }
        ]
    },
    {
        id: 10,
        nome: 'Ordinazioni',
        icona: AppRegistrationIcon,
        link: ORDINAZIONI,
    },
    {
        id: 11,
        nome: 'Profilo',
        icona: AccountCircleIcon,
        link: PROFILO,
    },
    {
        id: 12,
        nome: 'Gestione attivitá',
        icona: SettingsIcon,
        link: GESTIONEATTIVITA,
    },
    {
        id: 13,
        nome: 'Logout',
        icona: LogoutIcon,
        link: LOGOUT,
    }
];