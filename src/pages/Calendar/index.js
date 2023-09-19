import SideBar from '../../components/SideBar';
import CardWeekDay from '../../components/CardWeekDay';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChangePage } from '../../redux/pageSlice';

const Calendar = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ChangePage('calendar'))
  }, [])
  return (
    <>
      <div className='flex flex-row w-screen h-full'>

        <SideBar />

        <div className='flex flex-row w-10/12 items-center justify-center gap-1 p-4 h-screen'>
          <CardWeekDay tittle={'Segunda'} tasks={[]} />
          <CardWeekDay tittle={'Terça'} tasks={[]} />
          <CardWeekDay tittle={'Quarta'} tasks={[]} />
          <CardWeekDay tittle={'Quinta'} tasks={[]} />
          <CardWeekDay tittle={'Sexta'} tasks={[]} />
          <CardWeekDay tittle={'Sábado'} tasks={[]} />
          <CardWeekDay tittle={'Domingo'} tasks={[]} />
        </div>
      </div>
    </>
  )
}

export default Calendar;
