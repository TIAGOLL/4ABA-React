import CardWeekDay from '@/components/CardWeekDay';
import SideBar from '../../components/SideBar';

const Calendar = () => {

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
