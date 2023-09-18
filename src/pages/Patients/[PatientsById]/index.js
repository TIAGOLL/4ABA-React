import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowBigLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../services/connectionDB'
import IfLoading from '../../../components/IfLoaging'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const createUserSchema = z.object({
  namePatient: z.string()
    .nonempty('Preencha este campo')
    .max(40, 'Este campo deve ter no máximo 40 caracteres')
    .min(3, 'Este campo deve ter no mínimo 5 caracteres')
    .trim(),

  adress: z.string()
    .nonempty('Preencha este campo')
    .min(5, 'Este campo deve ter no mínimo 5 caracteres')
    .max(40, 'Este campo deve ter no máximo 40 caracteres'),

  cpf: z.string()
    .nonempty('Preencha este campo')
    .min(11, 'Este campo deve ter no mínimo 11 caracteres')
    .max(11, 'Este campo deve ter no máximo 11 caracteres')
    .trim(),

  dateOfBirth: z.string(),

  rName: z.string()
    .nonempty('Preencha este campo')
    .max(40, 'Este campo deve ter no máximo 40 caracteres')
    .min(3, 'Este campo deve ter no mínimo 3 caracteres')
    .trim(),

  rCpf: z.string()
    .nonempty('Preencha este campo')
    .min(11, 'Este campo deve ter no mínimo 11 caracteres')
    .max(11, 'Este campo deve ter no máximo 11 caracteres')
    .trim(),

  rPhone: z.string()
    .nonempty('Preencha este campo')
    .min(11, 'Este campo deve ter no mínimo 11 caracteres')
    .max(11, 'Este campo deve ter no máximo 11 caracteres')
    .trim(),

  rdateOfBirth: z.string()

})


const PatientsById = () => {

  // estilos do campos para o código ficar mais clean
  const styleLabel = 'cursor-text absolute left-2 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500'


  const { id } = useParams();
  const navigate = useNavigate();
  //hooks para os inputs do paciente
  const [idPatient, setIdPatient] = useState('')
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [cpf, setCpf] = useState('')
  const [adress, setAdress] = useState('')

  //hooks para os inputs do responsável
  const [rName, setrName] = useState('')
  const [rDateOfBirth, setrDateOfBirth] = useState('')
  const [rCpf, setrCpf] = useState('')
  const [rPhone, setrPhone] = useState('')

  const [loading, setLoading] = useState(true)
  const [onfocus, setOnFocus] = useState(false)
  const [onfocus1, setOnFocus1] = useState(false)
  const [output, setOutput] = useState('')


  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(createUserSchema),
    touched: true,
    mode: 'all',
  })

  async function loadPatient() {
    onSnapshot(collection(db, "patients"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setIdPatient(doc.id)
          setName(doc.data().name)
          setDateOfBirth(doc.data().dateOfBirth)
          setCpf(doc.data().cpf)
          setAdress(doc.data().adress)
          setrName(doc.data().rName)
          setrCpf(doc.data().rCpf)
          setrPhone(doc.data().rPhone)
          setrDateOfBirth(doc.data().rDateOfBirth)
        }
      });
    })
  }

  useEffect(() => {
    loadPatient();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  async function updatePatient(e, idPatient) {
    setLoading(true)
    e.preventDefault()

    await updateDoc(doc(db, "patients", idPatient),
      {
        name: name,
        dateOfBirth: dateOfBirth,
        cpf: cpf,
        adress: adress,
        rName: rName,
        rCpf: rCpf,
        rPhone: rPhone,
        rDateOfBirth: rDateOfBirth
      }
    )
      .then(() => {
        setOutput(<div className='flex w-full justify-center items-center'><span className='flex w-full justify-start py-1 font-semibold text-green-600'>Paciente atualizado com sucesso!</span></div>)
        setTimeout(() => {
          setOutput('')
        }, 3000)
      })
      .catch((error) => {
        setOutput(<div div className='flex w-full justify-center items-center' ><span className='flex w-full justify-start py-1 font-semibold text-red-600'>Erro ao atualizar paciente!</span></div >)
        setTimeout(() => {
          setOutput('')
        }, 3000)
      })
      .finally(() => {
        setTimeout(() => {
          navigate('/patients')
        }, 3000);
        setLoading(false)
      })

  }

  async function deletePatient(e, idPatient) {
    setLoading(true)
    e.preventDefault()
    await deleteDoc(doc(db, "patients", idPatient))
      .then(() => {
        setOutput(<div className='flex w-full justify-center items-center'><span className='flex w-full justify-start py-1 font-semibold text-red-600'>Paciente excluído com sucesso!</span></div>)
        setTimeout(() => {
          setOutput('')
        }, 3000)
      })
      .catch((error) => {
        setOutput(<div div className='flex w-full justify-center items-center' ><span className='flex w-full justify-start py-1 font-semibold text-red-600'>Erro ao excluir paciente!</span></div >)
        setTimeout(() => {
          setOutput('')
        }, 3000)
      })
      .finally(() => {
        setTimeout(() => {
          navigate('/patients')
        }, 3000);
      })
    setLoading(false)
  }


  return (
    <div className="flex h-full justify-center items-center bg-zinc-500">
      <div className='flex flex-wrap items-center bg-zinc-200 justify-center rounded-xl m-14 py-6 space-y-8 shadow-lg shadow-zinc-800 border-3 lg:w-6/12'>
        <a href='/patients' className='w-full m-0 p-0 pl-14 justify-start items-center'>
          <ArrowBigLeft width={30} height={30} />
        </a>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='m-0 p-0 font-semibold'>Cadastro de pacientes</h1>
        </div>
        <form className='w-full gap-8 flex-col flex'>
          <div className="w-full flex flex-col gap-4">
            <div className='flex justify-start items-center font-bold text-xl ml-14 mb-6'>
              <h3>Paciente:</h3>
            </div>
            <div className='flex w-ful flex-wrap px-14 justify-start items-center gap-8'>
              <div className='flex relative w-full items-center justify-center flex-col'>
                <input required {...register('namePatient')} onChange={(e) => setName(e.target.value)} value={loading ? 'Carregando...' : name} type="text" id='name' className={styleInput} />
                <label htmlFor="name" className={styleLabel}>Nome</label>
                {errors.namePatient && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.namePatient.message}</span>}
              </div>
              <div className='flex relative w-full items-center justify-center flex-col'>
                <input required {...register('dateOfBirth')} onChange={(e) => setDateOfBirth(e.target.value)} type="date" value={loading ? 'Carregando...' : dateOfBirth} id='dateofbirth' onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)} className={styleInput} />
                <label htmlFor="dateofbirth" className={styleLabel}>{onfocus ? 'Data de nascimento' : ''}</label>
                {errors.dateOfBirth && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.dateOfBirth.message}</span>}
              </div>
              <div className='flex relative w-full items-center justify-center flex-col'>
                <input required {...register('cpf')} onChange={(e) => setCpf(e.target.value)} type="text" value={loading ? 'Carregando...' : cpf} id='cpf' className={styleInput} />
                <label htmlFor="cpf" className={styleLabel}>CPF</label>
                {errors.cpf && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.cpf.message}</span>}
              </div>
              <div className='flex relative w-full items-center justify-center flex-col'>
                <input required {...register('adress')} onChange={(e) => setAdress(e.target.value)} type="text" value={loading ? 'Carregando...' : adress} id='adress' className={styleInput} />
                <label htmlFor="adress" className={styleLabel}>Endereço</label>
                {errors.adress && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.adress.message}</span>}
              </div>
            </div>
            <div className="w-full flex flex-col gap-8">
              <div className='flex justify-start items-center font-bold text-xl ml-14 mb-6'>
                <h3>Responsável:</h3>
              </div>
              <div className='flex w-ful flex-wrap px-14 justify-start items-center gap-8'>
                <div className='flex relative w-full items-center justify-center flex-col'>
                  <input required {...register('rName')} value={loading ? 'Carregando...' : rName} onChange={(e) => setrName(e.target.value)} type="text" id='rname' className={styleInput} />
                  <label htmlFor="rname" className={styleLabel}>Nome</label>
                  {errors.rName && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.rName.message}</span>}
                </div>
                <div className='flex relative w-full items-center justify-center flex-col'>
                  <input required {...register('rDateOfBirth')} value={loading ? 'Carregando...' : rDateOfBirth} onChange={(e) => setrDateOfBirth(e.target.value)} type="date" id='rdateofbirth' className={styleInput} onFocus={() => setOnFocus1(true)} onBlur={() => setOnFocus1(false)} />
                  <label htmlFor="rdateofbirth" className={styleLabel}>{onfocus1 ? 'Data de nascimento' : ''}</label>
                  {errors.rDateOfBirth && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.rDateOfBirth.message}</span>}
                </div>
                <div className='flex relative w-full items-center justify-center flex-col'>
                  <input required {...register('rCpf')} value={loading ? 'Carregando...' : rCpf} onChange={(e) => setrCpf(e.target.value)} type="text" id='rcpf' className={styleInput} />
                  <label htmlFor="rcpf" className={styleLabel}>CPF</label>
                  {errors.rCpf && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.rCpf.message}</span>}
                </div>
                <div className='flex relative w-full items-center justify-center flex-col'>
                  <input required {...register('rPhone')} value={loading ? 'Carregando...' : rPhone} onChange={(e) => setrPhone(e.target.value)} type="text" id='rPhone' className={styleInput} />
                  <label htmlFor="rPhone" className={styleLabel}>Telefone</label>
                  {errors.rPhone && <span className='flex w-full justify-start py-1 font-semibold text-red-600'>{errors.rPhone.message}</span>}
                </div>
                {
                  output && output
                }
                <div className='flex w-full flex-row gap-4 justify-center items-center'>
                  <button onClick={e => updatePatient(e, idPatient)} className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-4/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
                    {loading ? <IfLoading /> : <span>Salvar</span>}
                  </button>
                  <button onClick={e => deletePatient(e, idPatient)} className='bg-red-500 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-4/12 text-center items-center rounded-lg hover:border-black hover:bg-red-700' >
                    {loading ? <IfLoading /> : <span>Excluir</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div >
    </div >
  )

}

export default PatientsById;
