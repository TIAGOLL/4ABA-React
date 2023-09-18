
import SideBar from '../../components/SideBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
//Consumo de API

const Dashboard = () => {

  const [data, setData] = useState([])
  const [country, setCountry] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadTempApi() {
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=6f042669ca2a07ebc963d8d1024e451d')
      .then((res) => {
        res.data.map((item) => {
          setCountry(item.country)
          setDate(item.date)
          setContent(item.text)
          return setLoading(false)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }



  useEffect(() => {
    setLoading(false)
    loadTempApi()
  }, [])

  return (<>
    <div className='flex flex-row h-full w-full'>
      <SideBar />
      <div className='flex flex-col w-9/12 items-center justify-start pb-12 gap-4 mt-4 ml-12'>
        <div className='flex flex-col items-center bg-zinc-100 w-8/12 p-10 mt-5 justify-center rounded-xl py-6 space-y-8 shadow-lg shadow-zinc-800 border-3'>
          <h1>Notícias</h1>
          <div>
            {content}
          </div>

          <div className='flex flex-row w-full items-center justify-center text-center'>
            <div className='text-left w-6/12'>
              <p>Data: {date}</p>
            </div>
            <div className='text-right w-6/12'>
              <p>Local: {country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Dashboard;
