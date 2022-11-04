import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from 'react'
import { api } from "../../../services/api";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isAddMode: boolean
}

interface EmpresaProps{
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
}

export function NewAccountModal({ isOpen,onRequestClose, isAddMode }: NewAccountModalProps) {
    const [nome, setNome] = useState('')
    const [descricao,setDescricao] = useState('')
    const [observacao, setObservacao] = useState('')
    const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([])
    const [empresa, setEmpresa] = useState(1)
    const [addMode, setAddMode] = useState(isAddMode)




    useEffect(() =>{
      setAddMode(isAddMode)
      
      const setVariablesToZero = () =>{
        setNome('')
        setDescricao('')
        setObservacao('')
        setEmpresa(1)
      }

      if (!isAddMode){
        console.log('ta dentro do if')
      }

      setVariablesToZero()
    }, [isAddMode])

    useEffect(() => {

      const getCompanies = async () =>{
        const { data } = await api.get('/empresas/')
        setEmpresaObjects(data)
      }

      getCompanies();
    }, []);
    
    
    function handleSubmit(data: FormEvent){
      return addMode ? createNewAccount(data) : updateAccount(data)
    }

    function createNewAccount(event: FormEvent){
        event.preventDefault()
        
        const data ={
            nome,
            descricao,
            observacao,
            empresa
        }

        api.post('/contas/', data)
    }

    function updateAccount(event: FormEvent){
      event.preventDefault()
      console.log('veio no update')
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

      <form onSubmit={handleSubmit}>
        <h2>{addMode ? 'Criar conta' : 'Editar usuário'}</h2>

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
        <button type="submit">{addMode ? 'Cadastrar' : 'Editar'}</button>
      </form>
    </Modal>
  );
}
