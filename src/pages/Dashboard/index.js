
import SideBar from '../../components/SideBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChangePage } from '../../redux/pageSlice';
import { useDispatch } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/connectionDB';
//Consumo de API

const Dashboard = () => {

  const dispatch = useDispatch()

  const [country, setCountry] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [consultsAmount, setConsultsAmount] = useState(0)
  const [patientsAmount, setPatientsAmount] = useState(0)

  async function loadTempApi() {
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=6f042669ca2a07ebc963d8d1024e451d')
      .then((res) => {
        // eslint-disable-next-line
        res.data.map((item) => {
          setCountry(item.country)
          setDate(item.date)
          setContent(item.text)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function loadConsults() {
    onSnapshot(collection(db, "consults"), (querySnapshot) => {
      let contador = 0
      querySnapshot.forEach(() => {
        contador += 1
      });
      setConsultsAmount(contador)
    })
  }

  async function loadPatients() {
    onSnapshot(collection(db, "patients"), (querySnapshot) => {
      let contador = 0
      querySnapshot.forEach(() => {
        contador += 1
      });
      setPatientsAmount(contador)
    })
  }

  useEffect(() => {
    loadTempApi()
    loadPatients()
    loadConsults()
    setLoading(false)
    dispatch(ChangePage('dashboard'))
    // eslint-disable-next-line
  }, [])

  return (<>
    <div className='flex flex-row w-full'>
      <SideBar />
      <div className='flex flex-col w-9/12 items-center justify-start pb-12 gap-4 h-[97vh] mt-4 ml-12 overflow-y-auto'>
        <div className='w-8/12 flex flex-row gap-4'>
          <div className='flex flex-col gap-4 bg-zinc-100 w-6/12 p-10 mt-5 rounded-xl shadow-lg shadow-zinc-800 border-3'>
            <h1 className='w-full text-left m-0'>Consultas</h1>
            {loading ? <h1>Carregando...</h1> : <p className='font-semibold'>Total de consultas ativas: <span >{consultsAmount}</span></p>}
          </div>
          <div className='flex flex-col gap-4 bg-zinc-100 w-6/12 p-10 mt-5 rounded-xl shadow-lg shadow-zinc-800 border-3'>
            <h1 className='w-full text-left m-0'>Pacientes</h1>
            {loading ? <h1>Carregando...</h1> : <p className='font-semibold'>Total de pacientes: <span>{patientsAmount}</span></p>}
          </div>
        </div>

        <div className='flex flex-col items-center bg-zinc-100 w-8/12 p-10 mt-5 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <h1>Notícias</h1>
          <div>
            {loading ? <h1>Carregando...</h1> : content}
          </div>
          <div className='flex flex-row w-full items-center justify-center text-center'>
            <div className='text-left w-6/12'>
              {loading ? <h1>Carregando...</h1> : <p>Data: {date}</p>}
            </div>
            <div className='text-right w-6/12'>
              {loading ? <h1>Carregando...</h1> : <p>Local: {country}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Dashboard;
