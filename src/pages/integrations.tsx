import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { IntegrationModal } from "../components/Modals/IntegrationModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";


export default function Integrations() {
  const apiUrl = "/integracoes";
  const tableName = 'Integrações'
  const { handleOpenNewProjectModal } = useContext(ProjectsContext)
  const { handleEditButton } = useContext(ProjectsContext)
  const { isNewAccountModalOpen } = useContext(ProjectsContext)
  const { handleCloseNewProjectModal } = useContext(ProjectsContext)
  const { isAddMode } = useContext(ProjectsContext)
  const { clickedTableRow } = useContext(ProjectsContext)



  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Conta", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "observacao", headerName: "Observação", width: 300 },
  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Integrações</title>
        </Head>
        <Sidebar 
        tableName={tableName}
        handleOpenNewProjectModal={handleOpenNewProjectModal}
        />
        <div className="home-container">
          <Table
            columns={columns}
            handleEditButton={handleEditButton}
          />

          <IntegrationModal
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