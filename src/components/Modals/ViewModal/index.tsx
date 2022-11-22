import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ProjectsContext } from "../../../ProjectsContext";

interface ViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ViewModal() {
  const { isViewModalOpen } = useContext(ProjectsContext);
  const { handleCloseViewModal } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);

  const test = Object.keys(clickedTableRow);

  const testFunction = (
    <div>
      {test.map((test, index) => {
        switch (test) {
          case "id":
            return;

          case "nome":
            return (
              <div key={index}>
                <h1>Nome</h1>
                <p>{clickedTableRow.nome}</p>
              </div>
            );

          case "descricao":
            return (
              <div key={index}>
                <h1>Descrição</h1>
                <p>{clickedTableRow.descricao}</p>
              </div>
            );

          case "tipo":
            if (clickedTableRow.tipo == "A") {
              return (
                <div key={index}>
                  <h1>Tipo</h1>
                  <p>Servidor aplicacional</p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <h1>Tipo</h1>
                  <p>Banco de Dados</p>
                </div>
              );
            }

          case "ambiente":
            if (clickedTableRow.ambiente == "PRD") {
              return (
                <div key={index}>
                  <h1>Ambiente</h1>
                  <p>Produção</p>
                </div>
              );
            }
            if (clickedTableRow.ambiente == "DEV") {
              return (
                <div key={index}>
                  <h1>Ambiente</h1>
                  <p>Desenvolvimento</p>
                </div>
              );
            }
            if (clickedTableRow.ambiente == "HML") {
              return (
                <div key={index}>
                  <h1>Ambiente</h1>
                  <p>Homologação</p>
                </div>
              );
            }
            if (clickedTableRow.ambiente == "TST") {
              return (
                <div key={index}>
                  <h1>Ambiente</h1>
                  <p>Teste</p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <h1>Ambiente</h1>
                  <p>Não foi possível identificar</p>
                </div>
              );
            }

          case "observacao":
            return (
              <div key={index}>
                <h1>Observação</h1>
                <p>{clickedTableRow.observacao}</p>
              </div>
            );

          case "empresa":
            if (clickedTableRow.empresa == 1) {
              return (
                <div key={index}>
                  <h1>Empresa</h1>
                  <p>V.tal</p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <h1>Empresa</h1>
                  <p>Oi</p>
                </div>
              );
            }

          case "area_negocio":
            return (
              <div key={index}>
                <h1>Área de negócio</h1>
                <p>{clickedTableRow.area_negocio}</p>
              </div>
            );

          // Rota inventário
          case "projeto":
            return (
              <div key={index}>
                <h1>Projeto</h1>
                <p>{clickedTableRow.projeto.nome}</p>
              </div>
            );

          case "conta_servico":
            return (
              <div key={index}>
                <h1>Conta de serviço</h1>
                <p>{clickedTableRow.conta_servico.nome}</p>
              </div>
            );

          case "integracao":
            return (
              <div key={index}>
                <h1>Integração</h1>
                <p>{clickedTableRow.integracao.nome}</p>
              </div>
            );

          case "servidor":
            return (
              <div key={index}>
                <h1>Servidor</h1>
                <p>{clickedTableRow.servidor.nome}</p>
              </div>
            );

          default:
            return <h1>{test}</h1>;
        }
      })}
    </div>
  );

  return (
    <Modal
      isOpen={isViewModalOpen}
      onRequestClose={handleCloseViewModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button type="button" className="react-modal-close">
        <CgClose onClick={handleCloseViewModal} />
      </button>

      {testFunction}
    </Modal>
  );
}
