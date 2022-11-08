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
    clickedTableRow: clickedTableProps[]
    getApiResponse: () => void;
    handleOpenNewProjectModal: () => void;
    handleCloseNewProjectModal: () => void;
    sucessToastMessage: () => void;
    errorToastMessage: () => void;
    handleDeleteButton: (event: any, row: any) => void
    handleEditButton: (event: any, row: any) => void;
}

export const ProjectsContext = createContext<ProjectsContextData>(
    {} as ProjectsContextData
)

export function ProjectsProvider({apiUrl, children}: ProjectsProviderProps) {
    const [clickedRow, setClickedRow] = useState([]);
    const [projects, setProjects] = useState([]);
    const [clickedTableRow, setClickedTableRow] = useState<clickedTableProps[]>([]);
    const [isAddMode, setIsAddMode] = useState(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    
    // Realizando chamada na api e renderizando a pagina sempre que o componente clickedRow for atualizado
    useEffect(() => {
      const getProjects = async () => {
        const { data } = await api.get(apiUrl);
        setProjects(data);
      };
  
      getProjects();
    }, [clickedRow]);

    async function handleDeleteButton( event: any, row: any ) {
        event.stopPropagation()
        setClickedRow(row);
        await api.delete(apiUrl + '/' + row.id)
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

    function errorToastMessage(){
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
    }

    return(
        <ProjectsContext.Provider value={{projects, getApiResponse ,handleDeleteButton, sucessToastMessage, errorToastMessage, handleEditButton, handleCloseNewProjectModal, handleOpenNewProjectModal, clickedTableRow, isAddMode, isNewAccountModalOpen}}>
            {children}
        </ProjectsContext.Provider>
    )
}