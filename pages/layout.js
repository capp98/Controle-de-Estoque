import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Controle de Estoque</h1>
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <p>© 2023 Controle de Estoque. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
