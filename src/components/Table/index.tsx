import { useState, useEffect } from "react";
import {DataGrid,GridColDef, GridToolbar, GridRowsProp} from "@mui/x-data-grid";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import { api } from '../../../services/api'


interface TableProps{
  onOpenNewProjectModal: () => void;
  props: GridRowsProp[];
  columns: GridColDef[];
  apiUrl: string;
}

interface RowProps{
  id: number;
}


export function Table({ onOpenNewProjectModal ,columns, apiUrl }: TableProps) {
  const [clickedRow, setClickedRow] = useState<RowProps>({id:1});
  const [projects, setProjects] = useState([]);
  
  // Realizando chamada na api e renderizando a pagina sempre que o componente clickedRow for atualizado
  useEffect(() => {
    const getProjects = async () => {
      const { data } = await api.get(apiUrl);
      setProjects(data);
    };

    getProjects();
  }, [clickedRow]);


  const handleDeleteButton = async ( event: any, row: any ) =>{
    event.stopPropagation()
    setClickedRow(row);
    await api.delete(apiUrl + '/' + row.id)
  }

  const handleEditButton = (event: any, row: any) =>{
    event.stopPropagation()
    setClickedRow(row);
  }


  // Coluna de edição e de ações
  const actionColumn = [
    {
      field: "action",
      headerName: "Ações",
      description:'Coluna para realizar ações',
      sortable: false,
      width: 200,
      renderCell: (params: { row: { id: number } }) => {
        return (
          <div className={styles.cellAction}>
            <button>
            <a href="#" style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </a>
            </button>

            <button>
            <a href="/" onClick={(event) => handleEditButton(event, params.row)} style={{ textDecoration: "none" }}>
              <div className={styles.editButton}>Edit</div>
            </a>
            </button>

            <button onClick={(event) => handleDeleteButton(event, params.row)}>
            <div className={styles.deleteButton}>
              Delete
            </div>
            </button>
          </div>
        );
      },
    },
  ];

  return (
      <div className={styles.datatable}>
        <div className={styles.datatableTitle}>
          Dashboard
          <Button onClick={onOpenNewProjectModal} variant="outlined" color="success">
            Add new
          </Button>
        </div>
        <DataGrid
          className="datagrid"
          getRowId={(row) => row.id}
          rows={projects}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />


      </div>
  );
}
