import { useState } from 'react';
import FloatInput from './../../../components/FloatInput/index';


const ConsultsByName = (props) => {

  const consults = {
    tittle: props.tittle,
    date: props.date,
    content: props.content,
    id: props.id,
    local: props.local
  };

  const [id, setId] = useState(consults.id)
  const [nomePaciente, setNomePaciente] = useState(consults.tittle)
  const [content, setContent] = useState(consults.content)
  const [local, setLocal] = useState(consults.local)

  return (
    <>
      <div className='h-screen w-screen flex flex-row items-center justify-center'>
        <div className='flex flex-row gap-2 rounded-lg bg-secondary-color justify-center p-16 w-10/12'>
          <FloatInput type='number' name='id' id={'id'} placeholder='ID' onChange={(e) => setId(e.target.value)} value={id} readOnly />

          <FloatInput type='text' name='local' id={'local'} placeholder='Local' onChange={(e) => setLocal(e.target.value)} value={local} />

          <FloatInput type='nomePaciente' name='nomePaciente' id={'nomePaciente'} placeholder='Nome do Paciente' onChange={(e) => setNomePaciente(e.target.value)} value={nomePaciente} />

          <FloatInput type='text' name='content' id={'content'} placeholder='Conteudo' onChange={(e) => setContent(e.target.value)} value={content} />
        </div>
      </div>
    </>
  )
}

export default ConsultsByName;
