import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { AccountModal } from "../components/Modals/AccountModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";


export default function ServiceAccounts() {
  const apiUrl = "/contas";
  const tableName = 'Contas de serviço'
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
    {
      field: "empresa",
      headerName: "Empresa",
      width: 200,
      valueGetter: (params) => {
        // TODO: fazer isso ser dinâmico, pegando as empresas via api
        if (params.row.empresa == 1) {
          return "V.tal";
        } else {
          return "Oi";
        }
      },
    },
  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Contas de serviço</title>
        </Head>
        <div className="home-container">
          <Table
            columns={columns}
            handleOpenNewProjectModal={handleOpenNewProjectModal}
            handleEditButton={handleEditButton}
            tableName={tableName}
          />

          <AccountModal
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
