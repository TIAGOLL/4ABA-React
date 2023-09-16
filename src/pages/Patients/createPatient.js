import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
const createUserSchema = z.object({
  name: z.string()
    .nonempty('Preencha este campo')
    .max(40, 'Este campo deve ter no máximo 40 caracteres')
    .min(5, 'Este campo deve ter no mínimo 5 caracteres')
    .trim(),

  email: z.string()
    .nonempty('Preencha este campo')
    .email('Digite um email válido')
    .toLowerCase()
    .trim(),

  password: z.string()
    .nonempty('Preencha este campo')
    .min(6, 'Este campo deve ter no mínimo 6 caracteres')
    .max(20, 'Este campo deve ter no máximo 20 caracteres')
    .trim(),

})


const CreatePatient = () => {

  // estilos do campos para o código ficar mais clean
  const styleLabel = 'cursor-text absolute left-2 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-secondary-color'

  //hooks para os inputs do paciente
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmPassword, setConfirmPassword] = useState('')

  //hooks para os inputs do responsável
  const [rName, setrName] = useState('')
  const [rAge, setrAge] = useState('')
  const [aCpf, setrCpf] = useState('')
  const [rEmail, setrEmail] = useState('')
  const [rAdress, setrAdress] = useState('')



  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createUserSchema),


  })

  function createUser(data) {

  }

  return (
    <div className="flex h-full justify-center items-center bg-zinc-500">
      <div className='flex flex-wrap items-center bg-background-color justify-center rounded-xl m-14 py-6 space-y-8 shadow-lg shadow-zinc-800 border-3 lg:w-6/12'>
        <div className="flex w-ful flex-row items-center  font-semibold mb-4">
          <div className="flex flex-row justify-start items-start">
            <a href='/'>
              <ArrowBigLeft />
            </a>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1>Cadastro</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit(createUser)} className='w-full gap-8 flex-col flex'>
          <div className="w-full flex flex-col gap-8">
            <div className='flex justify-start items-center font-bold text-xl ml-14 mb-6'>
              <h3>Paciente:</h3>
            </div>
            <div className='flex w-ful flex-wrap px-14 justify-start items-center gap-8'>
              <div className='flex relative w-8/12 items-center justify-center'>
                <input required onChange={(e) => setName(e.target.value)} type="text" id='name' className={styleInput} />
                <label htmlFor="name" className={styleLabel}>Nome</label>
              </div>
              <div className='flex relative w-3/12 items-center justify-center'>
                <input required onChange={(e) => setAge(e.target.value)} type="text" id='age' className={styleInput} />
                <label htmlFor="age" className={styleLabel}>Idade</label>
              </div>
              <div className='flex relative w-4/12 items-center justify-center'>
                <input required onChange={(e) => setCpf(e.target.value)} type="text" id='cpf' className={styleInput} />
                <label htmlFor="cpf" className={styleLabel}>CPF</label>
              </div>
              <div className='flex relative w-7/12 items-center justify-center'>
                <input required onChange={(e) => setEmail(e.target.value)} type="text" id='email' className={styleInput} />
                <label htmlFor="email" className={styleLabel}>Email</label>
              </div>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={(e) => setPassword(e.target.value)} type="password" id='password' className={styleInput} />
                <label htmlFor="password" className={styleLabel}>Senha</label>
              </div>
              <div className='flex relative w-full items-center justify-center'>
                <input required onChange={(e) => setConfirmPassword(e.target.value)} type="password" id='confirmPassword' className={styleInput} />
                <label htmlFor="confirmPassword" className={styleLabel}>Confirmar Senha</label>
              </div>
            </div>
            <div className="w-full flex flex-col gap-8">
              <div className='flex justify-start items-center font-bold text-xl ml-14 mb-6'>
                <h3>Responsável:</h3>
              </div>
              <div className='flex w-ful flex-wrap px-14 justify-start items-center gap-8'>
                <div className='flex relative w-8/12 items-center justify-center'>
                  <input onChange={(e) => setrName(e.target.value)} type="text" id='rname' className={styleInput} />
                  <label htmlFor="rname" className={styleLabel}>Nome</label>
                </div>
                <div className='flex relative w-3/12 items-center justify-center'>
                  <input onChange={(e) => setrAge(e.target.value)} type="text" id='rage' className={styleInput} />
                  <label htmlFor="rage" className={styleLabel}>Idade</label>
                </div>
                <div className='flex relative w-4/12 items-center justify-center'>
                  <input onChange={(e) => setrCpf(e.target.value)} type="text" id='rcpf' className={styleInput} />
                  <label htmlFor="rcpf" className={styleLabel}>CPF</label>
                </div>
                <div className='flex relative w-7/12 items-center justify-center'>
                  <input onChange={(e) => setrEmail(e.target.value)} type="text" id='remail' className={styleInput} />
                  <label htmlFor="remail" className={styleLabel}>Email</label>
                </div>
                <div className='flex relative w-7/12 items-center justify-center'>
                  <input onChange={(e) => setrAdress(e.target.value)} type="text" id='radress' className={styleInput} />
                  <label htmlFor="radress" className={styleLabel}>Endereço</label>
                </div>
                <div className='flex w-full flex-col justify-center items-center'>
                  <button type="submit" className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700'>Cadastrar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div >
    </div >
  )

}

export default CreatePatient;
