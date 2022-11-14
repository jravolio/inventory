import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "../services/api";
import { toast } from 'react-toastify';


interface clickedTableProps {
    id: number;
    nome: string;
    observacao: string;
    descricao: string;
    empresa: number;
  }
  

interface ProjectsProviderProps{
    children: ReactNode
    apiUrl: string
}

interface ProjectsContextData{
    projects: any
    isAddMode: boolean;
    isNewAccountModalOpen: boolean;
    isDeleteModalOpen: boolean;
    clickedTableRow: clickedTableProps[]
    getApiResponse: () => void;
    handleOpenNewProjectModal: () => void;
    handleCloseNewProjectModal: () => void;
    handleOpenDeleteModal: (event: any, row: any) => void;
    handleCloseDeleteModal: () => void;
    sucessToastMessage: () => void;
    errorToastMessage: (error: any) => void;
    handleDeleteButton: (event: any, row: any) => void
    handleEditButton: (event: any, row: any) => void;
}

export const ProjectsContext = createContext<ProjectsContextData>(
    {} as ProjectsContextData
)

export function ProjectsProvider({apiUrl, children}: ProjectsProviderProps) {
    const [projects, setProjects] = useState([]);
    const [clickedTableRow, setClickedTableRow] = useState<clickedTableProps[]>([]);
    const [isAddMode, setIsAddMode] = useState(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    
    // Realizando chamada na api e renderizando a pagina sempre que o componente clickedTableRow for atualizado
    useEffect(() => {
      getApiResponse()
      
    }, [clickedTableRow]);

    async function handleDeleteButton( event: any, row: any ) {
        event.stopPropagation()
        setClickedTableRow(row);
        if(apiUrl == '/inventario/all/'){
          await api.delete('/inventarios/' + row.id)
        } else{
          await api.delete(apiUrl + '/' + row.id)
        }
        handleCloseDeleteModal()
        getApiResponse()
      }

      function handleEditButton(event: any, row: any) {
        event.stopPropagation();
        setClickedTableRow(row);
        setIsAddMode(false);
        setIsNewAccountModalOpen(true); // abrindo modal na mão
      };
    
      function handleOpenNewProjectModal() {
        setIsAddMode(true);
        setIsNewAccountModalOpen(true);
      }
    
      function handleCloseNewProjectModal() {
        setIsNewAccountModalOpen(false);
      }
    
      function handleOpenDeleteModal( event: any, row: any) {
        event.stopPropagation();
        setClickedTableRow(row);
        setDeleteModalOpen(true);
      }
    
      function handleCloseDeleteModal() {
        setDeleteModalOpen(false);
      }
    

    async function getApiResponse() {
        const { data } = await api.get(apiUrl);
        setProjects(data);
    }
    
    function sucessToastMessage(){
        toast.success('Requisição concluída!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    function errorToastMessage(error: any){
        toast.error('Ocorreu um erro na requisição!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

        console.log(error)
    }

    return(
        <ProjectsContext.Provider value={{projects, getApiResponse ,handleDeleteButton, sucessToastMessage, errorToastMessage, handleEditButton, handleCloseNewProjectModal, handleOpenNewProjectModal, clickedTableRow, isAddMode, isNewAccountModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, isDeleteModalOpen}}>
            {children}
        </ProjectsContext.Provider>
    )
}