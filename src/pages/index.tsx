import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { InventoryModal } from "../components/Modals/InventoryModal";
import Head from 'next/head'
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";


export default function Home() {
  const apiUrl = "/inventarios/";
  const { handleOpenNewProjectModal } = useContext(ProjectsContext);
  const { handleEditButton } = useContext(ProjectsContext);
  const { isNewAccountModalOpen } = useContext(ProjectsContext);
  const { handleCloseNewProjectModal } = useContext(ProjectsContext);
  const { isAddMode } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);

  
  // Definindo colunas
  const columns: GridColDef[] = [
    {
      field: "conta_servico",
      headerName: "Conta",
      width: 200,
      valueGetter: (params) => params.row.conta_servico.nome,
    },
    {
      field: "integracao",
      headerName: "Integração",
      width: 100,
      valueGetter: (params) => params.row.integracao.nome,
    },
    {
      field: "projeto",
      headerName: "Projeto",
      width: 200,
      valueGetter: (params) => params.row.projeto.nome,
    },
    {
      field: "servidor",
      headerName: "Servidor",
      width: 200,
      valueGetter: (params) => params.row.servidor.nome,
    },
  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Contas de serviço</title>
        </Head>
        <Sidebar />
        <div className="home-container">
          <Table
            columns={columns}
            handleOpenNewProjectModal={handleOpenNewProjectModal}
            handleEditButton={handleEditButton}
          />

          <InventoryModal
            isOpen={isNewAccountModalOpen}
            onRequestClose={handleCloseNewProjectModal}
            isAddMode={isAddMode}
            clickedTableRow={clickedTableRow}
          />
        </div>
      </div>
    </ProjectsProvider>
  );
}
