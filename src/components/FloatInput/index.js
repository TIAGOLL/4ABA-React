import { InputHTMLAttributes } from 'react';


const FloatInput = (props) => {

    return (
        <>
            <div className='flex relative w-full'>
                <input required id={props.id} {...props} className="pl-4 rounded-xl peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-secondary-color" />
                <label htmlFor={props.id} className="cursor-text absolute left-2 top-1 bottom-0 font-normal text-gray-600 text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-t-main peer-focus:text-lg peer-focus:m-0 peer-focus:font-semibold peer-valid:-top-7 peer-valid:text-t-main peer-valid:font-semibold peer-valid:text-lg peer-valid:m-0 peer-read-only:-top-7 peer-read-only:text-t-main peer-read-only:font-semibold peer-read-only:text-lg peer-read-only:m-0">{props.placeholder}
                </label>
            </div>
        </>
    )
}

export default FloatInput;
