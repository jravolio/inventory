import { useContext } from "react";
import {DataGrid,GridColDef, GridToolbar, GridRowsProp} from "@mui/x-data-grid";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProjectsContext } from "../../ProjectsContext";


interface TableProps{
  columns: GridColDef[];
  handleOpenNewProjectModal: () => void;
  handleEditButton(event: any, params:any): any;
}


export function Table({ columns, handleOpenNewProjectModal,handleEditButton }: TableProps) {
  const { projects } = useContext(ProjectsContext)
  const { handleDeleteButton } = useContext(ProjectsContext)


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

            <button onClick={(event) => handleEditButton(event, params.row)}>
              <div className={styles.editButton}>Edit</div>
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

          <Button onClick={handleOpenNewProjectModal} variant="outlined" color="success">
            Add new
          </Button>


        </div>
        <DataGrid
          className="datagrid"
          getRowId={(row) => row.id}
          rows={projects}
          columns={columns.concat(actionColumn)}
          pageSize={13}
          rowsPerPageOptions={[13]}
          components={{ Toolbar: GridToolbar }}
        />

        <ToastContainer />

      </div>
  );
}
