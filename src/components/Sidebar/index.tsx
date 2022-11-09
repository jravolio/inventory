import { FiUsers, FiBox, FiServer, FiHome, FiAlignJustify } from "react-icons/fi";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { useState } from 'react';
import VtalLogo from '../../assets/vtalLogo.svg';
import styles from "./styles.module.scss";

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  return (
    <div>
      <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsSidebarOpen(true)}>
        <FiAlignJustify />
      </IconButton>

      <Drawer  anchor="left" open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant='h6' component='div'>
              <img src={VtalLogo} />
            </Typography>


        </Box>

        <div className={styles.center}>
          <ul>
            <p className={styles.title}>LISTS</p>
            <li>
              <a href="/">
                <FiHome className={styles.icon} />
                <span>Home</span>
              </a>
            </li>
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
          </ul>
        </div>
      </Drawer>
    </div>
  );
}
