import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/NewAccountModal";
import Head from 'next/head'



export default function ServiceAccounts() {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const apiUrl = '/contas'
  

  function handleOpenNewProjectModal() {
    setIsNewAccountModalOpen(true);
  }
  function handleCloseNewProjectModal() {
    setIsNewAccountModalOpen(false);
  }


  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Conta", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 100 },
    { field: "observacao", headerName: "Observação", width: 200 },
    { field: "empresa", headerName: "Empresa", width: 200, valueGetter: (params) =>{ 
      if (params.row.empresa == 1){
      return 'V.tal'
    }
      else{
        return'Oi'
      }
  }  },
  ];

  return (

    <div className="home">
    <Head>
      <title>Contas de serviço</title>
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
