export default function PatientCard({ id, name }) {
  return (
    <>
      <a href={`/patients/${id}`} className='flex flex-col gap-4 border-2 w-4/12 p-6 m-2 bg-white rounded-xl shadow-lg items-start justify-start'>
        <div className='gap-4 flex flex-col'>
          <div>
            <img src="/images/userPhoto.png" className='rounded-full bg-blue-600' width={60} height={60} alt="Foto do Paciente" />
          </div>
          <div>
            <span className='font-semibold text-lg'>Nome: </span>{name}
          </div>
        </div>
      </a>
    </>
  );
}
