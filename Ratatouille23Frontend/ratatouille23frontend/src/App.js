import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardContainer } from './pages/Dashboard/';
import { DipendentiContainer } from './pages/Dipendenti/';
import { TavoliContainer } from './pages/Tavoli/';
import { ProfiloContainer } from './pages/Profilo/';
import { PiattiContainer } from './pages/Piatti/';
import { CategorieContainer } from './pages/Categorie';
import { GestioneMenuContainer } from './pages/Gestione menu';
import { StatisticheSalaContainer } from './pages/Statistiche Sala';
import { StatisticheCucinaContainer } from './pages/Statistiche cucina';
import { OrdinazioniContainer } from './pages/Ordinazioni';
import { GestioneAttivitaContainer} from './pages/GestioneAttivita'
import LoginView from './pages/Login/LoginView';
import NotFound from './pages/NotFound/NotFound';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import useAuth from './hooks/useAuth';
import PrimoAccesso from './pages/Primo Accesso/PrimoAccesso';

const theme = createTheme({
    palette: {
        primary: {
          main: '#FFB232', //giallo
          semitransparent: 'rgba(255,178,50,0.5)',
          lighter: '#FFC96F',
        },
        secondary: {
          main: '#A85000', //marrone
          semitransparent: 'rgba(168,80,0,0.5)',
          lighter: '#C2844C',
        },
        tertiary: {
          main: '#618E34', //verde
          semitransparent: 'rgba(97, 142, 52, 0.5)',
          lighter: '#618E34',
        },
        fourtiary: {
          main: '#FF3131',
        },
        pagesBackground: {
          main: '#F0F0F0',
        },
        white: {
          main: '#FFFFFF',
        },
        sidebar: {
          main:'#50752C',
        },
        black: {
          main:'#000000',
        },
        grey: {
          main: '#D6D6D6',
          dark: '#9F9F9F',
          darker: '#6E6E6E',
        }
      },
});

function App() {
  const {auth} = useAuth();
  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
        <div className='app'>
          {/*routes amministratore e supervisore*/}
          <Routes>

            {/*public routes*/}
            <Route path="/login" element={<LoginView />}></Route>

            {/*protected routes*/}
            <Route element={<RequireAuth allowedRoles={['Amministratore', 'Supervisore']}/>}>
              <Route path="/piatti" element={<PiattiContainer/>}></Route>
              <Route path="/categorie" element={<CategorieContainer/>}></Route>
              <Route path="/gestionemenu" element={<GestioneMenuContainer/>}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['Amministratore']}/>}>
              <Route path="/dipendenti" element={<DipendentiContainer/>}></Route>
              <Route path="/statsala" element={<StatisticheSalaContainer/>}></Route>
              <Route path="/statcucina" element={<StatisticheCucinaContainer/>}></Route>
              <Route path="/gestioneattivita" element ={<GestioneAttivitaContainer/>}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['Amministratore', 'Addetto alla sala']}/>}>
              <Route path="/tavoli" element={<TavoliContainer/>}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['Amministratore', 'Addetto alla cucina']}/>}>
              <Route path="/ordinazioni" element={<OrdinazioniContainer/>}></Route>
            </Route>
          
            <Route element={<RequireAuth allowedRoles={['Amministratore', 'Supervisore', 'Addetto alla sala', 'Addetto alla cucina']}/>}>
              <Route path="/" element={auth?.dipendente?.primoAccesso ? <Navigate to="/primoaccesso"/> : (auth?.dipendente?.ruolo === 'Amministratore' || auth?.dipendente?.ruolo === 'Supervisore') ? <DashboardContainer/> : auth?.dipendente?.ruolo === 'Addetto alla sala' ? <Navigate to="/tavoli"/> : <Navigate to="/ordinazioni"/>}></Route>
              <Route path="/profilo" element={<ProfiloContainer/>}></Route>
              <Route path="/primoaccesso" element={<PrimoAccesso/>}></Route>
              <Route path="/unauthorized" element={<Unauthorized/>}></Route>
            </Route>

            {/*catch all*/}
            {/*<Route path="/unauthorized" element={<Unauthorized/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>*/}
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
