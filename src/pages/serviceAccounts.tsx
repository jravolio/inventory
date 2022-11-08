import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/AccountModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";

interface clickedTableProps {
  id: number;
  nome: string;
  observacao: string;
  descricao: string;
  empresa: number;
}

export default function ServiceAccounts() {
  const apiUrl = "/contas";
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
