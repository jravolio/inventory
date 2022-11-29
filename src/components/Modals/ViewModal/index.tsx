import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { useContext } from "react";
import { ProjectsContext } from "../../../ProjectsContext";
import styles from "./styles.module.scss";

export function ViewModal() {
  const { isViewModalOpen } = useContext(ProjectsContext);
  const { handleCloseViewModal } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);

  const ObjectKeys = Object.keys(clickedTableRow);

  const getAllTitles = (
    <div>
      {ObjectKeys.map((test, index) => {
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
            if (clickedTableRow.ambiente) {
              if (clickedTableRow.tipo == "A") {
                return (
                  <div key={index}>
                    <h1>Tipo</h1>
                    <p>Servidor aplicacional</p>
                  </div>
                );
              }

              return (
                <div key={index}>
                  <h1>Tipo</h1>
                  <p>Banco de Dados</p>
                </div>
              );
            } else {
              if (clickedTableRow.tipo == "A") {
                return (
                  <div key={index}>
                    <h1>Tipo de projeto</h1>
                    <p>Ambiente</p>
                  </div>
                );
              }
              if (clickedTableRow.tipo == "B") {
                return (
                  <div key={index}>
                    <h1>Tipo de projeto</h1>
                    <p>Aplicação</p>
                  </div>
                );
              }
              if (clickedTableRow.tipo == "C") {
                return (
                  <div key={index}>
                    <h1>Tipo de projeto</h1>
                    <p>Automação</p>
                  </div>
                );
              }
              if (clickedTableRow.tipo == "D") {
                return (
                  <div key={index}>
                    <h1>Tipo de projeto</h1>
                    <p>RPA Uipath</p>
                  </div>
                );
              }
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
            }
              return (
                <div key={index}>
                  <h1>Ambiente</h1>
                  <p>Não foi possível identificar</p>
                </div>
              );
            

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
            }
              return (
                <div key={index}>
                  <h1>Empresa</h1>
                  <p>Oi</p>
                </div>
              );
            

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
                <h2 className={styles.subtitle}>
                  {clickedTableRow.projeto.nome}
                </h2>
              </div>
            );

          case "integracao":
            const rowIntegration = clickedTableRow.integracao;
            return (
              <div key={index}>
                <h1>Integrações</h1>
                <div className={styles.divFlex}>
                  {rowIntegration.map((row: any, index: number) => (
                    <p key={index}>{row.nome}</p>
                  ))}
                </div>
              </div>
            );
            
            case "conta_servico":
              const rowAccount = clickedTableRow.conta_servico;
            return (
              <div key={index}>
                <h1>Conta de serviço</h1>
                <div className={styles.divFlex}>
                  {rowAccount.map((row: any, index: number) => (
                    <p key={index}>{row.nome}</p>
                    ))}
                </div>
              </div>
            );
            
            case "servidor":
              const rowServer = clickedTableRow.servidor;
              return (
                <div key={index}>
                  <h1>Servidores</h1>
                  <div className={styles.divFlex}>
                    {rowServer.map((row: any, index: number) => (
                      <p key={index}>{row.nome}</p>
                    ))}
                  </div>

                  <h1>Descrição do projeto</h1>
                  <p>{clickedTableRow.projeto.descricao}</p>
                </div>
              );

          default:
            return
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

      {getAllTitles}
    </Modal>
  );
}
