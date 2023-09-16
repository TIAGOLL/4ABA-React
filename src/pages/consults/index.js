import ConsultsCard from '../../components/ConsultsCard';
import IfLoading from '../../components/IfLoaging';
import SideBar from '../../components/SideBar';
import { Suspense, useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/connectionDB';

const Consults = () => {

  const [consults, setData] = useState([]);

  async function loadConsults() {
    onSnapshot(collection(db, "consults"), (querySnapshot) => {
      const consults = [];
      querySnapshot.forEach((doc) => {
        consults.push({ ...doc.data() });
      });
      setData(consults)
      console.log('Consultas carregadas');
    })
  }

  useEffect(() => {
    loadConsults();
  }, []);

  return (
    <>
      <div className='flex flex-row w-full h-screen'>
        <SideBar />
        <div className='flex flex-col w-9/12 items-center justify-start pb-12 gap-4 mt-12 ml-12'>
          <div className='flex w-full items-center justify-start'>
            <a className='bg-green-500 flex w-40 flex-row border-2 rounded-lg p-4 m-1 justify-center font-semibold' href={'/consults/create'}>
              Criar consulta
            </a>
          </div>
          <div className='flex items-center justify-start h-screen overflow-y-auto'>
            <div className='flex flex-wrap w-full gap-4'>
              <Suspense fallback={<IfLoading />}>
                {
                  consults.map(({ id, local, date, createdAt, namePatient, nameProfessional, description }) => (
                    <ConsultsCard key={id} date={date} namePatient={namePatient} nameProfessional={nameProfessional} description={description} local={local} />
                    ))
                }
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consults;
