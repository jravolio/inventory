import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/Modals/AccountModal";
import Head from 'next/head'



export default function ServiceAccounts() {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const apiUrl = '/empresas'
  

  function handleOpenNewProjectModal() {
    setIsNewAccountModalOpen(true);
  }
  function handleCloseNewProjectModal() {
    setIsNewAccountModalOpen(false);
  }


  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Empresa", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 100 },
    { field: "observacao", headerName: "Observação", width: 200 },

  ];

  return (

    <div className="home">
    <Head>
      <title>Empresas</title>
    </Head>
      <Sidebar />
      <div className="home-container">
        <Table
          onOpenNewProjectModal={handleOpenNewProjectModal}
          columns={columns}
          apiUrl={apiUrl}
        />
        <NewAccountModal
          isOpen={isNewAccountModalOpen}
          onRequestClose={handleCloseNewProjectModal}
        />
      </div>
    </div>
  );
}
