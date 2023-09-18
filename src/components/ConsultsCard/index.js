import React from 'react';

export default function ConsultsCard({ id, local, date, createdAt, namePatient, nameProfessional, description }) {
    return (
        <>
            <a href={`/consults/${id}`} className='flex flex-col gap-4 border-2 w-5/12 p-6 m-2 bg-white rounded-xl shadow-lg items-start justify-start'>
                <div>
                    <div>
                        <span className='font-semibold text-lg'>Data da consulta:</span> {date}
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
            </a>

        </>
    );
}
