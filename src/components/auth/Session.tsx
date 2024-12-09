import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import '../../assets/css/session.css';

function Session(): JSX.Element {
  return (
    <main className="session-container">
      <section className="session-content">
        <h1 className="sesion-title">Esport Gaming Center</h1>
        <figure className="session-logo-container">
          <img src={logo} alt="Gaming Center logo" className="session-logo" />
        </figure>
        <nav className="session-btns">
          <Link to="/login" className="session_btn">Log in</Link>
          <Link to="/signup" className="session_btn">Sign Up</Link>
        </nav>
      </section>
    </main>
  );
}

export default Session;
