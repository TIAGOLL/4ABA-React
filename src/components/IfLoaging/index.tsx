import LoadingIcon from "@/icons/LoadingIcon";

const IfLoading = () => {
    return (
        <>
            {/* PC */}
            <div className="items-center justify-center text-center flex-col p-20 hidden lg:flex">
                <div className="animate-spin "><LoadingIcon /></div>
                <p className="w-full flex flex-row text-left text-white font-bold text-xl">Carregando...</p>
            </div>

            {/* MOBILE */}
            <div className="items-center justify-center text-center flex flex-col p-10 lg:hidden">
                <div className="animate-spin "><LoadingIcon strokeWidht={15} /></div>
                <p className="w-full flex flex-row text-left text-white font-bold text-xl">Carregando...</p>
            </div>
        </>
    )
}

export default IfLoading;
