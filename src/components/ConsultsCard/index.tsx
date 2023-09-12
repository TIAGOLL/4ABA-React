import Link from 'next/link';


export default function ConsultsCard({ tittle, content, id, date, local }: ServicesPostsProps) {
    return (
        <>
            <div key={id} className='flex flex-col gap-4 border-2 w-3/12 p-2 m-2 shadow-lg items-start justify-start'>
                <div className='flex '>
                    <Link href={`/consults/${tittle}`}>
                        {tittle}
                    </Link>
                </div>

                <div>
                    Data: {date}
                </div>

                <div>
                    Local: {local}
                </div>

                <p>
                    {content}
                </p>

            </div>
        </>
    );
}
