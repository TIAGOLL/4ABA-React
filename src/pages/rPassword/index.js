import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowBigLeft } from 'lucide-react'


const LoginFormSchema = z.object({
  // criação do schema de validação, mapea os campos do formulário
  email: z.string()
    .nonempty('Preencha este campo')
    .email('Digite um E-mail válido')
    .toLowerCase(),
})

const Rpassword = () => {

  // estilos do campos para o código ficar mais clean
  const styleLabel = 'cursor-text absolute left-2 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0'
  const styleInput = 'pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-secondary-color'

  const [email, setEmail] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    //register: registra os campos do formulário
    //handleSubmit: acionada quando aperto o botão de login
    //formState: retorna o estado do formulário
    //touched: retorna se o campo foi tocado
    //mode: definição de quando a validação ira ocorrer
    resolver: zodResolver(LoginFormSchema),
    touched: true,
    mode: 'all',
  })

  function rpassword() {

  }

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-zinc-500">
        <div className='flex flex-col items-center bg-background-color w-4/12 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <div href={'/'} className='relative top-20 left-14 flex items-start justify-start w-full' >
            <a href={'/'}>
              <ArrowBigLeft width={30} height={30} />
            </a>
          </div>
          <div className="flex w-full flex-col items-center text-center justify-center font-semibold mb-4">
          <h1>Recupere sua senha</h1>
              <h6>Enviaremos um código para seu e-mail cadastrado</h6>
          </div>
          <form onSubmit={handleSubmit(rpassword)} className="w-full gap-8 flex-col flex pt-4">
            <div className='flex w-full flex-col px-14 justify-center items-center gap-8'>
              <div className='flex flex-col w-full'>
                <div className='flex relative w-full space-x-2 items-center justify-center'>
                  <input required {...register('email')} onChange={e => setEmail(e.target.value)} value={email} id={'email'} className={styleInput} type='text' />
                  <label htmlFor='email' className={styleLabel}>Email
                  </label>
                </div>
                {errors.email && <span>{errors.email.message}</span>}
              </div>
            </div>
            <div className='flex w-full flex-col justify-center items-center'>
              <button type='submit' className='bg-green-600 flex justify-center font-semibold py-1 border border-zinc-500 text-lg w-6/12 text-center items-center rounded-lg hover:border-black hover:bg-green-700' >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Rpassword;
