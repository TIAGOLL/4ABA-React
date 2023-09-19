const CardWeekDay = ({ tittle, tasks }) => {

    return (
        <>
            <div className="flex h-full w-full flex-col p-4 bg-white rounded-xl items-center border-2 shadow-md shadow-zinc-500">
                <div className="p-2 font-semibold text-t-main text-sm">
                    <h1>{tittle}</h1>
                </div>
                <div className="p-2">
                    {tasks}
                </div>
            </div>
        </>
    )
}

export default CardWeekDay;
