import { useState } from 'react';
import logo from '../assets/logo.jpg';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { sessionServices } from '../services/sessionServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Navbar(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { getAuthUser, removeCookies } = useAuth();
  const authUser = getAuthUser();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleLogout = async () => {
    sessionServices.logOut().then(() => {
      toast.success('Logout Successfully');
      removeCookies();
    }).catch(() => {
      toast.error('Oops! Failed to logout');
    }).finally(() => {
      navigate('/login');
    })
  };

  return (
    <>
      <div className="mob-nav">
        <FontAwesomeIcon icon={faBars} className="humburger" onClick={toggleSidebar} />
      </div>
      <div className={`side-bar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-logo-container">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>
        <div className="sidebar-links-container">
          <Link to="/games" className={`nav-link ${location.pathname === '/games' ? 'active' : ''}`} onClick={closeSidebar}>Home Page</Link>
          {
            authUser!.isAdmin
              ? <Link to="/gameList" className={`nav-link ${location.pathname === '/gameList' ? 'active' : ''}`} onClick={closeSidebar}>Games</Link>
              : null
          }
          {
            authUser!.isAdmin
              ? <Link to="/addGame" className={`nav-link ${location.pathname === '/addGame' ? 'active' : ''}`} onClick={closeSidebar}>Add Game</Link>
              : null
          }
          <Link to="/reservations" className={`nav-link ${location.pathname === '/reservations' ? 'active' : ''}`} onClick={closeSidebar}>Reservations</Link>
          <button
            disabled={!authUser}
            onClick={handleLogout}
            type="button"
            className="list-group-item list-group-item-action"
          >
            Log Out
          </button>
        </div>
        <div className="license-container">
          <p className="license">&copy; Esports Gaming Center</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
