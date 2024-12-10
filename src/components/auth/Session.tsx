import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import styles from './Session.module.css';

function Session(): JSX.Element {
  return (
    <main className={styles['session-container']}>
      <section className={styles['session-content']}>
        <h1 className={styles['sesion-title']}>Esport Gaming Center</h1>
        <figure className={styles['session-logo-container']}>
          <img src={logo} alt="Gaming Center logo" className={styles['session-logo']} />
        </figure>
        <nav className={styles['session-btns']}>
          <Link to="/login" className={styles['session-btn']}>Log in</Link>
          <Link to="/signup" className={styles['session-btn']}>Sign Up</Link>
        </nav>
      </section>
    </main>
  );
}

export default Session;
