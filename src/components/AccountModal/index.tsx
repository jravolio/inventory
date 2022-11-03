import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from 'react'
import { api } from "../../../services/api";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface EmpresaProps{
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
}

export function NewAccountModal({ isOpen,onRequestClose }: NewAccountModalProps) {
    const [nome, setNome] = useState('')
    const [descricao,setDescricao] = useState('')
    const [observacao, setObservacao] = useState('')
    const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([])
    const [empresa, setEmpresa] = useState(1)

    useEffect(() => {

      const handleGetCompanies = async () =>{
        const { data } = await api.get('/empresas/')
        setEmpresaObjects(data)
      }

      handleGetCompanies();
    }, []);
    
    
    function handleCreateNewAccount(event: FormEvent){
        event.preventDefault()
        
        const data ={
            nome,
            descricao,
            observacao,
            empresa
        }

        console.log(data)
        api.post('/contas/', data)
    }

    const handleSelectCompany = (event:any) =>{
      const index = event.target.selectedIndex;
      const optionElement = event.target.childNodes[index];
      const optionElementId = optionElement.getAttribute('id');

      setEmpresa(optionElementId)
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

      <form onSubmit={handleCreateNewAccount}>
        <h2>Adicionar Conta</h2>

        <input 
        placeholder="Nome da Conta"
        value={nome}
        onChange={event => setNome(event.target.value)}
        className='react-modal-options'
        />

        <textarea 
        placeholder="Descrição"
        value={descricao}
        onChange={event => setDescricao(event.target.value)}
        className='react-modal-options'
        />

        <textarea 
        placeholder="Observação" 
        value={observacao}
        onChange={event => setObservacao(event.target.value)}
        className='react-modal-options'
        />
        
        <select 
        className='react-modal-options'
        onChange={event => handleSelectCompany(event)}
        >
          {empresaObjects.map((item) =>{
            return <option id={(item.id).toString()} key={item.id}>{item.nome}</option>
          })}
          
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
}
