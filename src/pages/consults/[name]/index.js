import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../services/connectionDB';
import { useParams } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';


const ConsultsByName = (props) => {

  // estilos do campos para o código ficar mais clean
  const styleLabel = 'cursor-text absolute left-2 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-secondary-color'

  const { id } = useParams();


  const consult = {
    id: id,
    local: props.local,
    date: props.date,
    namePatient: props.namePatient,
    nameProfessional: props.nameProfessional,
    description: props.description,
    createdAt: props.createdAt,
  };

  const [data, setData] = useState([]);
  const [local, setLocal] = useState();
  const [date, setDate] = useState();
  const [namePatient, setNamePatient] = useState();
  const [nameProfessional, setNameProfessional] = useState();
  const [description, setDescription] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [idConsult, setIdConsult] = useState();

  async function loadConsult() {
    onSnapshot(collection(db, "consults"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setIdConsult(doc.id)
          setDate(doc.data().date)
          setLocal(doc.data().local)
          setNamePatient(doc.data().namePatient)
          setNameProfessional(doc.data().nameProfessional)
          setDescription(doc.data().description)
          setCreatedAt(doc.data().createdAt.toDate().toLocaleDateString('pt-BR'))
        }
      });
    })
  }

  useEffect(() => {
    loadConsult();
  }, []);

  return (
    <>
      <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <a href={'/consults'} className='w-6/12 items-start justify-start'>
          <ArrowBigLeft width={30} height={30} />
        </a>
        <div className="flex w-full flex-col items-center text-center justify-center font-semibold mb-4">
          <h1 className='p-0 m-0'>Editar Consulta</h1>
        </div>
        <div className='flex flex-row gap-2 rounded-lg bg-secondary-color justify-center p-16 w-8/12'>
          <div className='flex w-ful flex-wrap px-14 justify-start items-center gap-8'>
            <div className='flex relative w-8/12 items-center justify-center'>
              <input readOnly required type="text" id='name' value={idConsult} className={styleInput} />
              <label htmlFor="name" className={styleLabel}>ID</label>
            </div>
            <div className='flex relative w-3/12 items-center justify-center'>
              <input required onChange={(e) => setLocal(e.target.value)} value={local} type="text" id='local' className={styleInput} />
              <label htmlFor="local" className={styleLabel}>Local</label>
            </div>
            <div className='flex relative w-4/12 items-center justify-center'>
              <input required onChange={(e) => setDate(e.target.value)} value={date} type="text" id='date' className={styleInput} />
              <label htmlFor="date" className={styleLabel}>Data da consulta</label>
            </div>
            <div className='flex relative w-7/12 items-center justify-center'>
              <input required onChange={(e) => setNamePatient(e.target.value)} value={namePatient} type="text" id='namePatient' className={styleInput} />
              <label htmlFor="namePatient" className={styleLabel}>Nome do paciente</label>
            </div>
            <div className='flex relative w-full items-center justify-center'>
              <input required onChange={(e) => setNameProfessional(e.target.value)} value={nameProfessional} type="text" id='nameProfessional' className={styleInput} />
              <label htmlFor="nameProfessional" className={styleLabel}>Nome do Profissional</label>
            </div>
            <div className='flex relative w-full items-center justify-center'>
              <input required onChange={(e) => setDescription(e.target.value)} value={description} type="text" id='description' className={styleInput} />
              <label htmlFor="description" className={styleLabel}>Descrição</label>
            </div>
            <div className='flex relative w-full items-center justify-center'>
              <input readOnly required onChange={(e) => setCreatedAt(e.target.value)} value={createdAt} type="text" id='createdAt' className={styleInput} />
              <label htmlFor="createdAt" className={styleLabel}>Consulta criada em:</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsultsByName;
