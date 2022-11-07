import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { NewAccountModal } from "../components/AccountModal";
import Head from 'next/head'


interface clickedTableProps{
  id: number
  nome: string
  observacao: string
  descricao: string
  empresa: number
}


export default function ServiceAccounts() {
  const apiUrl = '/contas'
  const [clickedTableRow, setClickedTableRow] = useState<clickedTableProps[]>([]);
  const [isAddMode, setIsAddMode] = useState(true)

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  
  function handleOpenNewProjectModal() {
    setIsAddMode(true)
    setIsNewAccountModalOpen(true);
  }

  function handleCloseNewProjectModal() {
    setIsNewAccountModalOpen(false);
  }


  // console.log(isAddMode + ' Vindo do pages')

  const handleEditButton = (event: any, row: any) =>{
    event.stopPropagation()
    setClickedTableRow(row)
    setIsAddMode(false)
    setIsNewAccountModalOpen(true) // abrindo modal na mão
  }

  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Conta", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 100 },
    { field: "observacao", headerName: "Observação", width: 200 },
    { field: "empresa", headerName: "Empresa", width: 200, valueGetter: (params) =>{ 
      // TODO: fazer isso ser dinâmico, pegando as empresas via api
      if (params.row.empresa == 1){
      return 'V.tal'
    }
      else{
        return'Oi'
      }
  }  },
  ];

  return (

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
  );
}
