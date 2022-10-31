import { useState } from "react";
import {DataGrid,GridColDef, GridToolbar} from "@mui/x-data-grid";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";


interface ProjectProps{
  conta_servico: Array<String>;
  integracao: Array<String>;
  projeto: Array<String>;
  servidor: Array<String>;

}

interface TableProps{
  onOpenNewProjectModal: () => void;
  props: ProjectProps[];
  columns: GridColDef[];
}


export function Table({ onOpenNewProjectModal, props ,columns }: TableProps) {
  const [projects, setProjects] = useState<ProjectProps[]>([props[0]])

  console.log(props)
  // Coluna de edição e de ações
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: { row: { id: number } }) => {
        return (
          <div className={styles.cellAction}>
            <a href="/" style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              <div className={styles.editButton}>Edit</div>
            </a>
            <div
              className={styles.deleteButton}
            >
              Delete
            </div>
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
          rows={props}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />


      </div>
  );
}
