import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/connectionDB';
import { useParams } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import IfLoading from '../../../components/IfLoading';
import { PenLine } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { User } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';


const LoginFormSchema = z.object({
  // criação do schema de validação, mapea os campos do formulário

  namePatient: z.string()
    .nonempty('Preencha este campo')
    .min(3, 'O nome do paciente precisa de no mínimo 3 caracteres')
    .max(50, 'O nome do paciente não pode conter mais que 50 caracteres'),

  nameProfessional: z.string()
    .nonempty('Preencha este campo')
    .min(3, 'O nome do profissional precisa de no mínimo 3 caracteres')
    .max(50, 'O nome do paciente não pode conter mais que 50 caracteres'),

  description: z.string()
    .nonempty('Preencha este campo')
    .min(6, 'A descrição precisa de no mínimo 6 caracteres')
    .max(1000, 'A descrição não pode conter mais que 1000 caracteres'),

  local: z.string()
    .nonempty('Preencha este campo')
    .min(3, 'O local precisa de no mínimo 3 caracteres')
    .max(50, 'O local não pode conter mais que 50 caracteres'),

  date: z.string()

})



const ConsultsById = () => {

  // estilos do campos para o código ficar mais clean
  const styleLabel = 'cursor-text absolute left-2 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500'

  //validação de formulário
  const { register, formState: { errors } } = useForm({
    //register: registra os campos do formulário
    //handleSubmit: acionada quando aperto o botão de login
    //formState: retorna o estado do formulário
    //touched: retorna se o campo foi tocado
    //mode: definição de quando a validação ira ocorrer
    resolver: zodResolver(LoginFormSchema),
    touched: true,
    mode: 'all',
  })

  const { id } = useParams();
  const navigate = useNavigate();

  const [output, setOutput] = useState();
  const [onfocus, setOnFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState();
  const [date, setDate] = useState();
  const [namePatient, setNamePatient] = useState();
  const [nameProfessional, setNameProfessional] = useState();
  const [description, setDescription] = useState();
  const [createdAt, setCreatedAt] = useState();

  async function loadConsult() {
    onSnapshot(collection(db, "consults"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setDate(doc.data().date)
          setLocal(doc.data().local)
          setNamePatient(doc.data().namePatient)
          setNameProfessional(doc.data().nameProfessional)
          setDescription(doc.data().description)
          setCreatedAt(doc.data().createdAt)
          //.toDate().toLocaleDateString('pt-BR')
        }
      });
    })
  }

  useEffect(() => {
    loadConsult();
    setLoading(false);
    // eslint-disable-next-line
  }, []);


  async function updateConsult(e) {
    e.preventDefault();
    setLoading(true)
    await updateDoc(doc(db, "consults", id), {
      local: local,
      date: date,
      namePatient: namePatient,
      nameProfessional: nameProfessional,
      description: description,
      createdAt: createdAt,
      updateAt: new Date()
    })
    loadConsult();
    setLoading(false)
    setOutput(<span className='font-semibold text-green-600'>Consulta atualizada com sucesso!</span>)
    setTimeout(() => {
      setOutput(undefined)
    }, 3000);
  }


  async function deleteConsult(e) {
    e.preventDefault();
    setLoading(true)
    await deleteDoc(doc(db, "consults", id))
    loadConsult();
    setLoading(false)
    setOutput(<span className='font-semibold text-red-600'>Consulta deletada com sucesso!</span>)
    setTimeout(() => {
      setOutput(undefined)
    }, 3000);
    navigate('/consults')
  }


  return (
    <>
      <div className="flex h-full justify-center items-center bg-zinc-400 bg-cover bg-no-repeat">
        <div className='flex flex-col m-10 items-center bg-zinc-100 w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <div className='relative top-5 left-14 flex items-start justify-start w-full' >
            <a href={'/consults'}>
              <ArrowBigLeft width={30} height={30} />
            </a>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='p-0 m-0 font-semibold'>Editar consulta</h1>
          </div>
          <form className="w-full gap-8 flex-col flex">
            <div className='flex w-full flex-col px-14 pt-10 justify-center text-center items-center gap-8'>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <User strokeWidth={2} width={30} height={30} />
                  <input required {...register('namePatient')} onChange={e => setNamePatient(e.target.value)} value={loading ? 'Carregando...' : namePatient} id='namePatient' className={styleInput} type='text' />
                  <label htmlFor='namePatient' className={styleLabel}>Nome do paciente</label>
                </div>
                {errors.namePatient && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.namePatient.message}</span>}
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <User strokeWidth={2} width={30} height={30} />
                  <input required {...register('nameProfessional')} onChange={e => setNameProfessional(e.target.value)} value={loading ? 'Carregando...' : nameProfessional} id='nameProfessional' className={styleInput} type='text' />
                  <label htmlFor='nameProfessional' className={styleLabel}>Profissional resposável</label>
                </div>
                {errors.nameProfessional && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.nameProfessional.message}</span>}
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <MapPin strokeWidth={2} width={30} height={30} />
                  <input required {...register('local')} onChange={e => setLocal(e.target.value)} value={loading ? 'Carregando...' : local} id='local' className={styleInput} type='text' />
                  <label htmlFor='local' className={styleLabel}>Local</label>
                </div>
                {errors.local && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.local.message}</span>}
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <CalendarDays strokeWidth={2} width={30} height={30} />
                  <input required {...register('date')} onChange={e => setDate(e.target.value)} value={loading ? 'Carregando...' : date} id='date' className={styleInput} type='date' placeholder={false} onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)} />
                  <label htmlFor='date' className={styleLabel}>{onfocus ? 'Data' : ''}</label>
                </div>
                {errors.date && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.date.message}</span>}
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <PenLine strokeWidth={2} width={30} height={30} />
                  <textarea required {...register('description')} onChange={e => setDescription(e.target.value)} value={loading ? 'Carregando...' : description} id='description' className={styleInput + "h-20 min-h-[200px] p-2"} type='text' />
                  <label htmlFor='description' className={styleLabel}>Descrição</label>
                </div>
                {errors.description && <span className='flex pl-10 py-1 font-semibold text-red-600'>{errors.description.message}</span>}
              </div>
              {
                output && output
              }
            </div>
            <div className='flex w-full flex-row gap-4 justify-center items-center'>
              <button onClick={(e) => updateConsult(e)} className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-4/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
                {loading ? <IfLoading /> : <span>Salvar</span>}
              </button>
              <button onClick={(e) => deleteConsult(e)} className='bg-red-500 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-4/12 text-center items-center rounded-lg hover:border-black hover:bg-red-700' >
                {loading ? <IfLoading /> : <span>Excluir</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ConsultsById;
