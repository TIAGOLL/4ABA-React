import ConsultsCard from '@/components/ConsultsCard';
import IfLoading from '@/components/IfLoaging';
import SideBar from '../../components/SideBar';
import Link from 'next/link';
import { Suspense } from 'react';
import dados from '../../../../dados.json';

const Consults = () => {

  const consults = dados.consults


  return (
    <>
      <div className='flex flex-row w-full h-screen'>
        <SideBar />
        <div className='flex flex-col w-9/12 items-center justify-start pb-12 gap-4 mt-12 ml-12'>
          <div className='flex w-full items-center justify-start'>
            <Link className='bg-green-500 flex w-40 flex-row border-2 rounded-lg p-4 m-1 justify-center font-semibold' href={'/consults/create'}>
              Criar consulta
            </Link>
          </div>
          <div className='flex items-center justify-start h-screen overflow-y-auto'>
            <div className='flex flex-wrap w-full h-full gap-4'>
              <Suspense fallback={<IfLoading />}>
                {
                  consults.map(({ id, tittle, content, date, local }) => (
                    <ConsultsCard key={id} content={content} date={date} tittle={tittle} local={local} />
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
