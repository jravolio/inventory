import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useState } from 'react'
import { api } from "../../../services/api";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}



export function NewAccountModal({ isOpen,onRequestClose }: NewAccountModalProps) {
    const [account, setAccount] = useState('')
    const [company,setCompany] = useState('')
    const [type, setType] = useState('')


    function handleCreateNewAccount(event: FormEvent){
        event.preventDefault()

        const data ={
            account,
            company,
            type
        }

        api.post('/accounts', data)
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
        placeholder="Conta"
        value={account}
        onChange={event => setAccount(event.target.value)}
        />
        <input 
        placeholder="Empresa"
        value={company}
        onChange={event => setCompany(event.target.value)}
        />
        <input 
        placeholder="Tipo" 
        value={type}
        onChange={event => setType(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
}
