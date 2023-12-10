import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../App.css';

const SidebarLayout = (props) => (
  <>
    <Sidebar />
    <main className='content'>
      <Outlet />
    </main>
  </>
);

export default SidebarLayout;