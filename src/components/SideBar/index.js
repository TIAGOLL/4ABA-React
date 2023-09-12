import { CalendarDays, HomeIcon, Power, Users, GanttChartSquareIcon } from "lucide-react";
import React from "react";
import ActiveLink from './../ActiveLink/index';
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate()

    function desconnectUser() {
        localStorage.removeItem('@ticketsPRO');
        navigate('/')
    }

    return (
        <>
            <div className="h-screen w-2/12 flex flex-col">
                <aside className="flex w-full flex-col h-full relative bg-blue-400 py-12">
                    <nav className="space-y-8 text-lg">
                        <div className="container flex flex-col items-center">
                            <img src='/images/psicologaPhoto.png' height={80} width={80} alt="Imagem de Perfil" className="border-4 rounded-full border-sky-900" />
                            <span className="text-t-main font-semibold pt-3">User Name</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <ActiveLink href='/dashboard' ><HomeIcon />Home</ActiveLink>
                            <ActiveLink href='/patients' ><Users />Pacientes</ActiveLink>
                            <ActiveLink href='/calendar' ><CalendarDays />Calendario</ActiveLink>
                            <ActiveLink href='/consults' ><GanttChartSquareIcon />Consultas</ActiveLink>
                            <div className="flex flex-col absolute bottom-2">
                                <button onClick={(e) => desconnectUser(e)} className="flex gap-7 font-semibold bg-background-color py-4 pl-6 rounded-l-3xl shadow-black"><Power />Desconectar</button>
                            </div>
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    )
}

export default SideBar;
