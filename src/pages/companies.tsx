import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { CompanyModal } from "../components/Modals/CompanyModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";

export default function Companies() {
  const apiUrl = "/empresas";
  const tableName = 'Empresas'
  const { handleEditButton } = useContext(ProjectsContext)
  const { isNewAccountModalOpen } = useContext(ProjectsContext)
  const { handleCloseNewProjectModal } = useContext(ProjectsContext)
  const { isAddMode } = useContext(ProjectsContext)
  const { clickedTableRow } = useContext(ProjectsContext)
  const { handleOpenNewProjectModal } = useContext(ProjectsContext)


  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Empresa", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 100 },
    { field: "observacao", headerName: "Observação", width: 200 },

  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Empresas</title>
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
          <CompanyModal
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