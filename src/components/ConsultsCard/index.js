import React from 'react';

export default function ConsultsCard({ id, local, date, createdAt, namePatient, nameProfessional, description }) {
    return (
        <>
            <div className='flex flex-col gap-4 border-2 w-3/12 p-6 m-2 shadow-lg items-start justify-start'>
                <div className='flex '>
                    <a href={`/consults/${id}`}>
                        {id}
                    </a>
                </div>

                <div>
                    <span className='font-semibold text-lg'>Data:</span> {date}
                </div>

                <div>
                    <span className='font-semibold text-lg'>Profissional:</span> {nameProfessional}
                </div>

                <div>
                    <span className='font-semibold text-lg'>Paciente:</span> {namePatient}
                </div>

                <div>
                    <span className='font-semibold text-lg'>Local:</span> {local}
                </div>

                <p>
                    <span className='font-semibold text-lg'>Descrição:</span> {description}
                </p>

            </div>
        </>
    );
}
