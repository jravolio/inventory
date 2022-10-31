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
          const { data: res } = await api.get("projects");
          setProjects(res);
        };
        getProjects();
      }, []);
    
      
  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "col1", headerName: "Projeto", width: 200 },
    { field: "col2", headerName: "Servidores Projeto", width: 200 },
    { field: "col3", headerName: "Tipo de servidor", width: 200 },
    { field: "col4", headerName: "Ambiente", width: 100 },
    { field: "col5", headerName: "Empresa Servidor", width: 200 },
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
