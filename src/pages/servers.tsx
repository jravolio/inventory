import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/AccountModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";


export default function ServiceAccounts() {
  const apiUrl = "/servidores";
  const { handleOpenNewProjectModal } = useContext(ProjectsContext)
  const { handleEditButton } = useContext(ProjectsContext)
  const { isNewAccountModalOpen } = useContext(ProjectsContext)
  const { handleCloseNewProjectModal } = useContext(ProjectsContext)
  const { isAddMode } = useContext(ProjectsContext)
  const { clickedTableRow } = useContext(ProjectsContext)



  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Conta", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 100 },
    { field: "observacao", headerName: "Observação", width: 200 },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 200,
      valueGetter: (params) => {
        if (params.row.tipo == "A") {
          return "Servidor Aplicacional";
        } else {
          return "Banco de Dados";
        }
      },
    },
    {
      field: "ambiente",
      headerName: "Ambiente",
      width: 200,
      valueGetter: (params) => {
        if (params.row.ambiente == "PRD") {
          return "Produção";
        }
        if (params.row.ambiente == "DEV") {
          return "Desenvolvimento";
        }
        if (params.row.ambiente == "HML") {
          return "Homologação";
        }
        if (params.row.ambiente == "TST") {
          return "Teste";
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
        <Sidebar />
        <div className="home-container">
          <Table
            columns={columns}
            apiUrl={apiUrl}
            handleOpenNewProjectModal={handleOpenNewProjectModal}
            handleEditButton={handleEditButton}
          />

          <NewAccountModal
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
