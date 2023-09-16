import LoadingIcon from "../../icons/LoadingIcon";

const IfLoading = () => {
    return (
        <>
            {/* PC */}
            <div className="items-center justify-center text-center gap-4 flex-row hidden lg:flex">
                <div className="animate-spin "><LoadingIcon widht={20}/></div>
                <p className="w-full flex flex-row text-left text-black font-semibold text-xl">Carregando...</p>
            </div>

            {/* MOBILE */}
            <div className="items-center justify-center text-center flex flex-col p-10 lg:hidden">
                <div className="animate-spin "><LoadingIcon strokeWidht={15} /></div>
                <p className="w-full flex flex-row text-left text-black font-bold text-xl">Carregando...</p>
            </div>
        </>
    )
}

export default IfLoading;
