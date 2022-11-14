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
}


export function InventoryModal({ isOpen,onRequestClose,isAddMode,clickedTableRow,}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([]);
  // const [projectsObjects, setProjectsObjects] = useState<>([])
  const [empresa, setEmpresa] = useState(1);
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext)
  const { sucessToastMessage } = useContext(ProjectsContext)
  const { errorToastMessage } = useContext(ProjectsContext)
  


  useEffect(() => {
    setAddMode(isAddMode);

    const setVariablesToZero = () => {
      setNome("");
      setDescricao("");
      setObservacao("");
      setEmpresa(1);
    };

    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setNome(row.nome);
        setDescricao(row.descricao);
        setObservacao(row.observacao);
        setEmpresa(row.empresa);
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

    getApiResponse('/empresas/', setEmpresaObjects)
  }, []);

  function handleSubmit(data: FormEvent) {
    return addMode ? createNewAccount(data) : updateAccount(data);
  }

  async function createNewAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      observacao,
      empresa,
    };

    
    await api
      .post("/contas/", data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))

    setNome("");
    setDescricao("");
    setObservacao("");
    setEmpresa(1);

    getApiResponse() // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      observacao,
      empresa,
    };

    await api
      .put("/contas/" + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))
      
      setNome("");
      setDescricao("");
      setObservacao("");
      setEmpresa(1);
  
      getApiResponse() // apenas para atualizar o grid
  
      onRequestClose();
  }

  const handleSelectProject = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setEmpresa(Number(optionElementId));
  };

  const handleSelectAccount = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setEmpresa(Number(optionElementId));
  };

  const handleSelectIntegration = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setEmpresa(Number(optionElementId));
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
        >
          {empresaObjects.map((item) => {
            return (
              <option id={item.id.toString()} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>

        <select
          className="react-modal-options"
          onChange={(event) => handleSelectCompany(event)}
        >
          {empresaObjects.map((item) => {
            return (
              <option id={item.id.toString()} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>

        <select
          className="react-modal-options"
          onChange={(event) => handleSelectCompany(event)}
        >
          {empresaObjects.map((item) => {
            return (
              <option id={item.id.toString()} key={item.id}>
                {item.nome}
              </option>
            );
          })}
        </select>

        <select
          className="react-modal-options"
          onChange={(event) => handleSelectCompany(event)}
        >
          {empresaObjects.map((item) => {
            return (
              <option id={item.id.toString()} key={item.id}>
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
