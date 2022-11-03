import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/NewAccountModal";
import Head from 'next/head'



export default function ServiceAccounts() {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const apiUrl = '/servidores'

  function handleOpenNewProjectModal() {
    setIsNewAccountModalOpen(true);
  }
  function handleCloseNewProjectModal() {
    setIsNewAccountModalOpen(false);
  }

  // Recebendo a resposta da api
  useEffect(() => {
    const getProjects = async () => {
      const { data: res } = await api.get(apiUrl);
      setProjects(res);
    };
    getProjects();
  }, []);

  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Conta", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 100 },
    { field: "observacao", headerName: "Observação", width: 200 },
    { field: "tipo", headerName: "Tipo", width: 200, valueGetter: (params) =>{ 
      if (params.row.tipo == 'A'){
      return 'Servidor Aplicacional'
    }
      else{
        return 'Banco de Dados'
      }
  }  },
    { field: "ambiente", headerName: "Ambiente", width: 200, valueGetter: (params) =>{ 
      if (params.row.ambiente == 'PRD'){
      return 'Produção'
    }
      if (params.row.ambiente == 'DEV'){
        return 'Desenvolvimento'
      }
      if (params.row.ambiente == 'HML'){
        return 'Homologação'
      }
      if (params.row.ambiente == 'TST'){
        return 'Teste'
      }
  }  },
  ];

  return (

    <div className="home">
    <Head>
      <title>Servidores</title>
    </Head>
      <Sidebar />
      <div className="home-container">
        <Table
          onOpenNewProjectModal={handleOpenNewProjectModal}
          props={projects}
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
