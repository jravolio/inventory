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

interface ProjetoProps {
  id: number;
  nome: string;
  descricao: string;
  area_negocio: string;
  observacao: string;
  tipo: string;
}
interface IntegrationProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
}
interface AccountProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
  empresa: number;
}
interface ServerProps {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  ambiente: string;
  observacao: string;
  empresa: number;
}
interface EmpresaProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
}
interface clickedTableProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
  empresa: number;
  conta_servico: AccountProps
  projeto: ProjetoProps
  integracao: IntegrationProps
  servidor: ServerProps
}


export function InventoryModal({ isOpen,onRequestClose,isAddMode,clickedTableRow,}: NewAccountModalProps) {
  const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([]);
  const [projectsObjects, setProjectsObjects] = useState<ProjetoProps[]>([])
  const [integrationObjects, setIntegrationObjects] = useState<IntegrationProps[]>([])
  const [serverObjects, setServerObjects] = useState<ServerProps[]>([])
  const [accountObjects, setAccountObjects] = useState<AccountProps[]>([])
  const [projeto, setProjeto] = useState(1)
  const [conta_servico, setConta_servico] = useState(1)
  const [integracao, setIntegracao] = useState(1)
  const [servidor, setServidor] = useState(1)
  const [empresa, setEmpresa] = useState(1);
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
    setEmpresa(1);
  };

  useEffect(() => {
    setAddMode(isAddMode);


    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setProjeto(row.projeto.id);
        setIntegracao(row.integracao.id);
        setServidor(row.servidor.id);
        setConta_servico(row.conta_servico.id);
        setEmpresa(row.conta_servico.empresa);
        setClickedTableRowId(row.id);
      } else {
        setVariablesToZero();
      }
    };

    defineMode(clickedTableRow);
  }, [clickedTableRow, isAddMode]);

  useEffect(() => {
    const getApiResponse = async (apiUrl: any, setState: any) => {
      const { data } = await api.get(apiUrl);
      setState(data);
    };

    getApiResponse('/projetos/', setProjectsObjects)
    getApiResponse('/integracoes/', setIntegrationObjects)
    getApiResponse('/servidores/', setServerObjects)
    getApiResponse('/contas/', setAccountObjects)
    getApiResponse('/empresas/', setEmpresaObjects)
  }, []);

  function handleSubmit(data: FormEvent) {
    return addMode ? createNewAccount(data) : updateAccount(data);
  }

  async function createNewAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      projeto,
      integracao,
      servidor,
      conta_servico,
      empresa,
    };

    
    await api
      .post("/inventarios/", data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))

    setVariablesToZero()

    getApiResponse() // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      projeto,
      integracao,
      servidor,
      conta_servico,
      empresa,
    };

    await api
      .put("/inventarios/" + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))
      
      setVariablesToZero()
  
      getApiResponse() // apenas para atualizar o grid
  
      onRequestClose();
  }

  const handleSelectProject = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setProjeto(Number(optionElementId));
  };
  
  const handleSelectIntegration = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setIntegracao(Number(optionElementId));
  };

  const handleSelectServer = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setServidor(Number(optionElementId));
  };

  const handleSelectAccount = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setConta_servico(Number(optionElementId));
  };


  const handleSelectCompany = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setEmpresa(Number(optionElementId));
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
        <hr />

        <select
          className="react-modal-options"
          onChange={(event) => handleSelectProject(event)}
          value={projeto}
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
          onChange={(event) => handleSelectIntegration(event)}
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
          onChange={(event) => handleSelectServer(event)}
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
          onChange={(event) => handleSelectAccount(event)}
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
        
        <select
          className="react-modal-options"
          onChange={(event) => handleSelectCompany(event)}
          value={empresa}
        >
          {empresaObjects.map((item) => {
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
