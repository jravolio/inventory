import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { InventoryModal } from "../components/Modals/InventoryModal";
import Head from 'next/head'
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";
import { ViewModal } from "../components/Modals/ViewModal";


export default function Home() {
  const apiUrl = "/inventario/all/";
  const tableName = 'Inventário'
  const { handleOpenNewProjectModal } = useContext(ProjectsContext);
  const { handleEditButton } = useContext(ProjectsContext);
  const { isNewAccountModalOpen } = useContext(ProjectsContext);
  const { handleCloseNewProjectModal } = useContext(ProjectsContext);
  const { isAddMode } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);
  
  // Definindo colunas
  const columns: GridColDef[] = [
    {
      field: "projeto",
      headerName: "Projeto",
      width: 200,
      valueGetter: (params) => params.row.projeto.nome,
    },
    {
      field: "integracao",
      headerName: "Integração",
      width: 200,
      valueGetter: (params) => params.row.integracao.nome,
    },
    {
      field: "servidor",
      headerName: "Servidor",
      width: 200,
      valueGetter: (params) => params.row.servidor.nome,
    },
    {
      field: "conta_servico",
      headerName: "Conta",
      width: 200,
      valueGetter: (params) => params.row.conta_servico.nome,
    },
    {
      field: "empresa",
      headerName: "Empresa",
      width: 200,
      valueGetter: (params) =>{
        if (params.row.conta_servico.empresa == 1) {
          return "V.tal";
        } else {
          return "Oi";
        }
      },
    },
    {
      field: "descricao",
      headerName: "Descrição Projeto",
      width: 250,
      valueGetter: (params) => params.row.projeto.descricao,
    },
    {
      field: "descricao_integracao",
      headerName: "Descrição Integração",
      width: 200,
      valueGetter: (params) => params.row.integracao.descricao,
    },
  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Inventário</title>
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
