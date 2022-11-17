import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ProjectsContext } from "../../../ProjectsContext";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isAddMode: boolean;
  clickedTableRow: any
}

interface IntegrationProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
}
interface ProjetoProps extends IntegrationProps{
  area_negocio: string;
  tipo: string;
}
interface AccountProps extends IntegrationProps {
  empresa: number;
}
interface ServerProps extends IntegrationProps{
  tipo: string;
  ambiente: string;
  empresa: number;
}
interface clickedTableProps extends IntegrationProps{
  conta_servico: AccountProps
  projeto: ProjetoProps
  integracao: IntegrationProps
  servidor: ServerProps
}


export function InventoryModal({ isOpen,onRequestClose,isAddMode,clickedTableRow,}: NewAccountModalProps) {
  const [projectsObjects, setProjectsObjects] = useState<ProjetoProps[]>([])
  const [integrationObjects, setIntegrationObjects] = useState<IntegrationProps[]>([])
  const [serverObjects, setServerObjects] = useState<ServerProps[]>([])
  const [accountObjects, setAccountObjects] = useState<AccountProps[]>([])
  const [projeto, setProjeto] = useState(1)
  const [conta_servico, setConta_servico] = useState(1)
  const [integracao, setIntegracao] = useState(1)
  const [servidor, setServidor] = useState(1)
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext)
  const { sucessToastMessage } = useContext(ProjectsContext)
  const { errorToastMessage } = useContext(ProjectsContext)
  

  const setVariablesToZero = () => {
    setProjeto(1);
    setIntegracao(1);
    setServidor(1);
    setConta_servico(1)
  };



  useEffect(() => {
    const getApiResponse = async (apiUrl: any, setStateObjects: any, setState: any) => {
      const { data } = await api.get(apiUrl);
      setStateObjects(data);
      setStateObjects((state: any) =>{
        setState(state[0].id)
        return state
      })
    };

    getApiResponse('/projetos/', setProjectsObjects, setProjeto)
    getApiResponse('/integracoes/', setIntegrationObjects, setIntegracao)
    getApiResponse('/servidores/', setServerObjects, setServidor)
    getApiResponse('/contas/', setAccountObjects, setConta_servico)

  }, []);

  useEffect(() => {
    setAddMode(isAddMode);
    
    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setProjeto(row.projeto.id);
        setIntegracao(row.integracao.id);
        setServidor(row.servidor.id);
        setConta_servico(row.conta_servico.id);
        setClickedTableRowId(row.id);
      } else {
        setVariablesToZero();
      }
    };



    defineMode(clickedTableRow);
  }, [clickedTableRow, isAddMode]);

  function handleSubmit(data: FormEvent) {
    return addMode ? createNewInventory(data) : updateInventory(data);
  }

  async function createNewInventory(event: FormEvent) {
    event.preventDefault();

    const data = {
      projeto,
      integracao,
      servidor,
      conta_servico,
    };

    await api
      .post("/inventarios/", data)
      .then(() => sucessToastMessage('Criado com sucesso!'))
      .catch((error) => errorToastMessage(error))

    setVariablesToZero()

    getApiResponse() // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateInventory(event: FormEvent) {
    event.preventDefault();

    const data = {
      projeto,
      integracao,
      servidor,
      conta_servico,
    };

    await api
      .put("/inventarios/" + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage('Modificado com sucesso!'))
      .catch((error) => errorToastMessage(error))
      
      setVariablesToZero()
  
      getApiResponse() // apenas para atualizar o grid
  
      onRequestClose();
  }


  const handleSelect = (event: any, setState: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setState(Number(optionElementId));
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button type="button" className="react-modal-close">
        <CgClose onClick={onRequestClose} />
      </button>

      <form onSubmit={handleSubmit}>
        <h2>{addMode ? "Criar item" : "Editar item"}</h2>

        <select
          className="react-modal-options"
          onChange={(event) => handleSelect(event, setProjeto)}
          value={projeto}
          id='test'
        >
          {projectsObjects.map((item) => {
            return (
              <option id={item.id.toString()} value={item.id} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>


        <select
          className="react-modal-options"
          onChange={(event) => handleSelect(event, setIntegracao)}
          value={integracao}
        >
          {integrationObjects.map((item) => {
            return (
              <option id={item.id.toString()} value={item.id} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>

        <select
          className="react-modal-options"
          onChange={(event) => handleSelect(event, setServidor)}
          value={servidor}
        >
          {serverObjects.map((item) => {
            return (
              <option id={item.id.toString()} value={item.id} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>

        <select
          className="react-modal-options"
          onChange={(event) => handleSelect(event, setConta_servico)}
          value={conta_servico}
        >
          {accountObjects.map((item) => {
            return (
              <option id={item.id.toString()} value={item.id} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>
        
        <button type="submit">{addMode ? "Cadastrar" : "Editar"}</button>
      </form>
    </Modal>
  );
}
