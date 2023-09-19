import ConsultsCard from '../../components/ConsultsCard';
import SideBar from '../../components/SideBar';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/connectionDB';
import { useDispatch } from 'react-redux';
import { ChangePage } from '../../redux/pageSlice';

const Consults = () => {

  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadConsults() {
    onSnapshot(collection(db, "consults"), (querySnapshot) => {
      const consults = [];
      querySnapshot.forEach((doc) => {
        consults.push({ ...doc.data(), id: doc.id });
      });
      setData(consults)
    })
  }

  useEffect(() => {
    loadConsults();
    setLoading(false)

    dispatch(ChangePage('consults'))
        // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='flex flex-row h-screen w-full'>
        <SideBar />
        <div className='flex flex-col w-9/12 items-center justify-start gap-4 ml-12'>
          <div className='flex w-full pt-4 items-center justify-start'>
            <a className='bg-green-500 flex w-40 flex-row border-2 rounded-lg p-4 m-1 justify-center font-semibold' href={'/consults/create'}>
              Criar consulta
            </a>
          </div>
          <div className='flex items-center justify-start h-[83vh] overflow-y-auto'>
            <div className='flex flex-wrap h-full w-full gap-4'>
              {
                loading ? <h1>Carregando...</h1> :
                  data.map(({ id, local, date, createdAt, namePatient, nameProfessional, description }) => (
                    <ConsultsCard key={id} id={id} date={date} namePatient={namePatient} nameProfessional={nameProfessional} description={description} local={local} />
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consults;
