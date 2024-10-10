import React, { useState } from "react";
import executeCode from "./Api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Output = ({editorRef, language}) => {
    const [output, setOutput] = useState(null)
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const runCode = async () => {
        const code = editorRef.current.getValue();
        if(!code) return;
        try{
            setLoading(true)
            const {run: result} = await executeCode(language, code);
            setOutput(result.output.split("\n"));
            if(result.stderr){
                setError(true)
            }
            else{
                setError(false)
            }
        }
        catch(error){
            setOutput(error.message)
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        finally{
            setLoading(false)
        }
    }

const exportCode = (event) => {
    const content = output;

    
    if(content){
        const result = `\ncode : "\n${editorRef.current.getValue()}\n",\noutput:  "\n\t${content}\n"`;
        const blob = new Blob([result], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Output.' +"txt";
    
        document.body.appendChild(a);
        a.click();
    
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    else{
        toast.error("Run Code first!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }
};


    return (
        <>

            <div className="flex flex-row bg-zinc-900 w-full py-3 px-2">
                <div className="flex w-1/2 sm:w-full">
                {
                    isLoading ?  <button className="inline-flex justify-center gap-x-1.5 rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.02502 12.0002C5.02526 8.66068 7.32548 5.78639 10.519 5.1351C13.7125 4.48382 16.9098 6.23693 18.1557 9.32231C19.4015 12.4077 18.3489 15.966 15.6415 17.8212C12.9341 19.6764 9.32601 19.3117 7.02377 16.9502C5.74387 15.6373 5.02489 13.8568 5.02502 12.0002Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.1819 5.1352C10.2334 4.53373 7.24846 5.98176 5.83137 8.70099C4.41427 11.4202 4.89879 14.7702 7.0245 16.9505C9.15022 19.1307 12.4165 19.6276 15.0677 18.1742C17.719 16.7208 19.1308 13.6593 18.5444 10.6352" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                            <span>Running</span>
                    </button> :
                    <button className="inline-flex justify-center gap-x-1.5 rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer"
                    onClick={runCode}>
                            <span>Run</span>
                    </button>
                }
                </div>
                <div className="flex gap-x-1.5">
                    <label onClick={exportCode} className="flex flex-row rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">
                    <svg className="h-5 w-5 text-gray-300"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                        Export
                    </label>
                </div>
            </div>

            {
                isError ? 
                <div className="bg-zinc-800 overflow-y-scroll border-2 rounded-md text-red-500 border-zinc-700 h-60 mt-2 px-2 py-1 ">
                    {
                        Array.isArray(output) ? output.map((line, i) => <div key={i}>{line}</div>) : <div>Click "Run Code" to see output here</div>
                    }
                </div>
                :
                <div className="bg-zinc-800 overflow-y-scroll border-2 rounded-md text-gray-300 border-zinc-700 h-60 mt-2 px-2 py-1 ">
                    {
                        Array.isArray(output) ? output.map((line, i) => <div key={i}>{line}</div>) : <div>Click "Run Code" to see output here</div>
                    }
                </div>
            }
        
            <ToastContainer/>
        </>
    )
}

export default Output