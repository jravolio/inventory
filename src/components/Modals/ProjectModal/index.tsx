import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ProjectsContext } from "../../../ProjectsContext";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isAddMode: boolean;
  clickedTableRow: any;
}

interface clickedTableProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
  empresa: number;
  area_negocio: string;
  tipo: string;
}

export function ProjectModal({
  isOpen,
  onRequestClose,
  isAddMode,
  clickedTableRow,
}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [area_negocio, setArea_negocio] = useState(""); // ME DESCULPEM PRECISO QUE FIQUE ASSIM POR CONTA DA API :(
  const [tipo, setTipo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext);
  const { sucessToastMessage } = useContext(ProjectsContext);
  const { errorToastMessage } = useContext(ProjectsContext);
  const apiUrl = "/projetos/";

  const setVariablesToZero = () => {
    setNome("");
    setDescricao("");
    setArea_negocio("");
    setObservacao("");
    setTipo("A");
  };

  useEffect(() => {
    setAddMode(isAddMode);

    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setNome(row.nome);
        setDescricao(row.descricao);
        setObservacao(row.observacao);
        setArea_negocio(row.area_negocio);
        setTipo(row.tipo);
        setClickedTableRowId(row.id);
      } else {
        setVariablesToZero();
      }
    };

    defineMode(clickedTableRow);
  }, [clickedTableRow, isAddMode]);

  function handleSubmit(data: FormEvent) {
    return addMode ? createNewProject(data) : updateProject(data);
  }

  async function createNewProject(event: FormEvent) {
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
      .then(() => sucessToastMessage("Projeto criado com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateProject(event: FormEvent) {
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
      .then(() => sucessToastMessage("Projeto atualizado com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  const handleSelectType = (event: any) => {
    setTipo(event.target.value);
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
        <div className="react-modal-header">
          <TerminalRoundedIcon className="icon" />
          <h2>{addMode ? "Criar Projeto" : "Editar Projeto"}</h2>
        </div>

        <div className="react-modal-div">
          <h3>Nome do projeto</h3>
          <input
            placeholder="Nome do Projeto"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Descri????o do projeto</h3>
          <textarea
            placeholder="Descri????o"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Observa????es do projeto</h3>
          <textarea
            placeholder="Observa????o"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>??rea de neg??cio do projeto</h3>
          <input
            placeholder="??rea de neg??cio"
            value={area_negocio}
            onChange={(event) => setArea_negocio(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Ambiente do projeto</h3>
          <select
            className="react-modal-options"
            onChange={(event) => handleSelectType(event)}
            value={tipo}
          >
            <option value="A">Ambiente</option>
            <option value="B">Aplicacao</option>
            <option value="C">Automa????o</option>
            <option value="D">RPA Uipath</option>
          </select>
        </div>

        <button type="submit">{addMode ? "Cadastrar" : "Salvar"}</button>
      </form>
    </Modal>
  );
}
