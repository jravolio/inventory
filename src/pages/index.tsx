import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useState,useEffect } from 'react'
import Modal from 'react-modal'
import { api } from "../../services/api";
import { GridColDef } from "@mui/x-data-grid";



export default function Projects() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [projects, setProjects] = useState([]);


  function handleOpenNewProjectModal(){
    setIsNewProjectModalOpen(true)
  }
  function handleCloseNewProjectModal(){ 
    setIsNewProjectModalOpen(false)
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
    { field: "col1", headerName: "Projeto", width: 200 },
    { field: "col2", headerName: "Descrição do projeto", width: 100 },
    { field: "col3", headerName: "Conta de serviço", width: 100 },
    { field: "col4", headerName: "Integração", width: 200 },
    { field: "col5", headerName: "Servidor", width: 200 },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Table onOpenNewProjectModal={handleOpenNewProjectModal} props={projects} columns={columns} />
        <Modal
          isOpen={isNewProjectModalOpen}
          onRequestClose={handleCloseNewProjectModal}
        >
          <h2>Adicionar projeto</h2>

        </Modal>
      </div>
    </div>
  );
}
