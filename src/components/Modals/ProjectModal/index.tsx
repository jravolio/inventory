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


interface clickedTableProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
  empresa: number;
  area_negocio: string
  tipo: string
}


export function ProjectModal({ isOpen,onRequestClose,isAddMode,clickedTableRow,}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [area_negocio, setArea_negocio] = useState(""); // ME DESCULPEM PRECISO QUE FIQUE ASSIM POR CONTA DA API :(
  const [tipo, setTipo] = useState("")
  const [observacao, setObservacao] = useState("");
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext)
  const { sucessToastMessage } = useContext(ProjectsContext)
  const { errorToastMessage } = useContext(ProjectsContext)
  const apiUrl = '/projetos/'

  const setVariablesToZero = () => {
    setNome("")
    setDescricao("")
    setArea_negocio("")
    setTipo("")
    setObservacao("")
  };

  useEffect(() => {
    setAddMode(isAddMode);


    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setNome(row.nome);
        setDescricao(row.descricao);
        setObservacao(row.observacao);
        setArea_negocio(row.area_negocio)
        setTipo(row.tipo)
        setClickedTableRowId(row.id);
      } else {
        setVariablesToZero();
      }
    };

    defineMode(clickedTableRow);
  }, [clickedTableRow, isAddMode]);



  function handleSubmit(data: FormEvent) {
    return addMode ? createNewAccount(data) : updateAccount(data);
  }

  async function createNewAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      area_negocio,
      tipo,
      observacao,
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
      area_negocio,
      tipo,
      observacao,
    };

    await api
      .put(apiUrl + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage())
      .catch((error) => errorToastMessage(error))
      

      setVariablesToZero()
  
      getApiResponse() // apenas para atualizar o grid
  
      onRequestClose();
  }

  const handleSelectType = (event: any) =>{
    setTipo(event.target.value)
  }

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
        <h2>{addMode ? "Criar Projeto" : "Editar Projeto"}</h2>

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

        <input
          placeholder="Área de negócio"
          value={area_negocio}
          onChange={(event) => setArea_negocio(event.target.value)}
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
          onChange={(event) => handleSelectType(event)}
          value={tipo}
        >
          <option value="A">Ambiente</option>
          <option value="B">Aplicacao</option>
          <option value="C">Automação</option>
          <option value="D">RPA Uipath</option>
        </select>


        <button type="submit">{addMode ? "Cadastrar" : "Editar"}</button>
      </form>
    </Modal>
  );
}
