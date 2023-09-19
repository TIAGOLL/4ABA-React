import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/connectionDB';
import PatientCard from '../../components/PatientCard';
import { useDispatch } from 'react-redux';
import { ChangePage } from '../../redux/pageSlice';

const Patients = () => {


  const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  async function loadPatient() {
    onSnapshot(collection(db, "patients"), (querySnapshot) => {
      const patients = [];
      querySnapshot.forEach((doc) => {
        patients.push({ ...doc.data(), id: doc.id });
      });
      setData(patients)
    })
  }

  useEffect(() => {
    loadPatient()
    setLoading(false)
    dispatch(ChangePage('patients'))
  }, [])

  return (
    <>
      <div className='flex flex-row h-full w-full'>
        <SideBar />
        <div className='flex flex-col w-9/12 items-center justify-start pb-12 gap-4 mt-4 ml-12'>
          <div className='flex w-full h-24 items-center justify-start'>
            <a className='bg-green-500 flex w-56 flex-row border-2 rounded-lg p-4 m-1 justify-center font-semibold' href={'/patients/create'}>
              Cadastrar paciente
            </a>
          </div>
          <div className='flex w-full justify-start overflow-y-auto'>
            <div className='flex flex-wrap w-full gap-4'>
              {
                loading ? <h1>Carregando...</h1> :
                  data.map(({ id, name }) => (
                    <PatientCard id={id} name={name} />
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Patients;
