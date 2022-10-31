import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/NewAccountModal";




export default function ServiceAccounts() {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  

  function handleOpenNewProjectModal() {
    setIsNewAccountModalOpen(true);
  }
  function handleCloseNewProjectModal() {
    setIsNewAccountModalOpen(false);
  }

  // Recebendo a resposta da api
  useEffect(() => {
    const getProjects = async () => {
      const { data: res } = await api.get("/inventario/all/");
      setProjects(res);
    };
    getProjects();
  }, []);

  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "conta_servico", headerName: "Conta", width: 200 },
    { field: "integracao", headerName: "Integração", width: 100 },
    { field: "projeto", headerName: "Projeto", width: 200 },
    { field: "servidor", headerName: "Servidor", width: 200 },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Table
          onOpenNewProjectModal={handleOpenNewProjectModal}
          props={projects}
          columns={columns}
        />
        <NewAccountModal
          isOpen={isNewAccountModalOpen}
          onRequestClose={handleCloseNewProjectModal}
        />
      </div>
    </div>
  );
}
