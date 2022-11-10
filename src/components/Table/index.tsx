import { useContext } from "react";
import {DataGrid,GridColDef, GridToolbar, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton} from "@mui/x-data-grid";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ProjectsContext } from "../../ProjectsContext";
import { Sidebar } from "../Sidebar";


interface TableProps{
  columns: GridColDef[];
  handleEditButton(event: any, params:any): any;
}


export function Table({ columns, handleEditButton }: TableProps) {
  const { projects } = useContext(ProjectsContext)
  const { handleDeleteButton } = useContext(ProjectsContext)


  // Coluna de edição e de ações
  const actionColumn = [
    {
      field: "action",
      headerName: "Ações",
      description:'Coluna para realizar ações',
      sortable: false,
      width: 100,
      renderCell: (params: { row: { id: number } }) => {
        return (
          <div className={styles.cellAction}>
            
            <button onClick={(event) => handleEditButton(event, params.row)}>
              <div className={styles.editButton}><FiEdit/></div>
            </button>

            <button onClick={(event) => handleDeleteButton(event, params.row)}>
            <div className={styles.deleteButton}>
              <FiTrash2/>
            </div>
            </button>
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer color="#f2f2f2">
        <GridToolbarColumnsButton color="inherit"/>
        <GridToolbarFilterButton color="inherit"/>
        <GridToolbarDensitySelector color="inherit"/>
        <GridToolbarExport color="inherit"/>
      </GridToolbarContainer>
    );
  }
  return (
      <div className={styles.datatable}>
        <DataGrid
          className={styles.datagrid}
          getRowId={(row) => row.id}
          rows={projects}
          columns={columns.concat(actionColumn)}
          pageSize={13}
          rowsPerPageOptions={[13]}
          components={{ Toolbar: CustomToolbar }}
          localeText={{
            toolbarColumns: 'Colunas',
            toolbarColumnsLabel: 'Selecionar Colunas',
            columnsPanelTextFieldLabel: 'Achar coluna',
            columnsPanelTextFieldPlaceholder: 'Título da coluna',
            columnsPanelDragIconLabel: 'Reorganizar coluna',
            columnsPanelShowAllButton: 'Mostrar todos',
            columnsPanelHideAllButton: 'Esconder todos',
            
            toolbarFilters: 'Filtros',
            toolbarFiltersLabel: 'Mostrar filtros',
            toolbarFiltersTooltipHide: 'Esconder filtros',
            toolbarFiltersTooltipShow: 'Mostrar filtros',
            toolbarQuickFilterPlaceholder: 'Procurar…',
            toolbarQuickFilterLabel: 'Procurar',
            toolbarQuickFilterDeleteIconLabel: 'Limpar',
            filterPanelAddFilter: 'Adicionar filtro',
            filterPanelDeleteIconLabel: 'Deletar',
            filterPanelLinkOperator: 'Operador Lógico',
            filterPanelOperators: 'Operador',
            filterPanelOperatorAnd: 'E',
            filterPanelOperatorOr: 'Ou',
            filterPanelColumns: 'Colunas',
            filterPanelInputLabel: 'Valor',
            filterPanelInputPlaceholder: 'Filtrar valor',
            filterOperatorContains: 'contém',
            filterOperatorEquals: 'igual',
            filterOperatorStartsWith: 'começa com',
            filterOperatorEndsWith: 'termina com',
            filterOperatorIs: 'é',
            filterOperatorNot: 'não é',
            filterOperatorAfter: 'é depois',
            filterOperatorOnOrAfter: 'contém antes e depois',
            filterOperatorBefore: 'contém depois',
            filterOperatorOnOrBefore: 'está antes ou depois',
            filterOperatorIsEmpty: 'está vazio',
            filterOperatorIsNotEmpty: 'não está vazio',
            filterOperatorIsAnyOf: 'é qualquer um de',

            toolbarDensity: 'Tamanho',
            toolbarDensityLabel: 'Tamanho',
            toolbarDensityCompact: 'Compacto',
            toolbarDensityStandard: 'Padrão',
            toolbarDensityComfortable: 'Grande',

            toolbarExport: 'Baixar',
            toolbarExportLabel: 'Baixar',
            toolbarExportCSV: 'Baixar como CSV',
            toolbarExportPrint: 'Imprimir',
            toolbarExportExcel: 'Baixar como Excel',
          }}
        />

        <footer>
          Developed by AIOPS
        </footer>

        <ToastContainer />

      </div>
  );
}
