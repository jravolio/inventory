import { FiUsers, FiBox, FiServer, FiFeather, FiBook } from 'react-icons/fi'
import styles from './styles.module.scss'


export function Sidebar() {
  return (
      <div className={styles.sidebar}>
        <div className={styles.top}>
          <span className={styles.logo}>V.tal</span>
        </div>
        <hr />
        <div className={styles.center}>
          <ul>
            <p className={styles.title}>LISTS</p>
            <li>
              <a href="/serviceAccounts">
              <FiUsers className={styles.icon} />
              <span>Contas de serviço</span>
              </a>
            </li>
            <li>
              <a href="/projects">
              <FiBox className={styles.icon} />
              <span>Projeto</span>
              </a>
            </li>
            <li>
              <a href="/servers">
              <FiServer className={styles.icon} />
              <span>Servidores</span>
              </a>
            </li>
            {/* <li>
              <a href="/">
              <FiBook className={styles.icon} />
              <span>Cadastros</span>
              </a>
            </li> */}
            <li>
              <a href="/">
              <FiFeather className={styles.icon} />
              <span>Inventario</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
}
