import { Outlet } from 'react-router-dom';
import '../../App.css';
import AppBarAddetti from './AppBarAddetti';

const AppBarLayout = () => (
  <>
    <AppBarAddetti/>
    <main className='content'>
      <Outlet />
    </main>
  </>
);

export default AppBarLayout;