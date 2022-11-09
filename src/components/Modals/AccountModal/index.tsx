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


export function AccountModal({ isOpen,onRequestClose,isAddMode,clickedTableRow,}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([]);
  const [empresa, setEmpresa] = useState(1);
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext)
  const { sucessToastMessage } = useContext(ProjectsContext)
  const { errorToastMessage } = useContext(ProjectsContext)
  const apiUrl = "/contas/"
  

  
      const setVariablesToZero = () => {
        setNome("");
        setDescricao("");
        setObservacao("");
        setEmpresa(1);
      };

  useEffect(() => {
    setAddMode(isAddMode);

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
    const getCompanies = async () => {
      const { data } = await api.get("/empresas/");
      setEmpresaObjects(data);
    };

    getCompanies();
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
      .post(apiUrl, data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))

    
    setVariablesToZero()

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
      .put(apiUrl + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))


      setVariablesToZero()
  
      getApiResponse() // apenas para atualizar o grid
  
      onRequestClose();
  }

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
        <h2>{addMode ? "Criar conta" : "Editar usuário"}</h2>

        <input
          placeholder="Nome da Conta"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className="react-modal-options"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          className="react-modal-options"
        />

        <textarea
          placeholder="Observação"
          value={observacao}
          onChange={(event) => setObservacao(event.target.value)}
          className="react-modal-options"
        />

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
