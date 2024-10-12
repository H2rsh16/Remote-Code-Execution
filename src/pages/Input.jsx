import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


let globalString = '';

export const setGlobalString = (value) => {
  globalString = value;
};

export const getGlobalString = () => {
  return globalString;
};


const Input = () => {
    const [text, setText] = useState("")
    const handleChange = (event) => {
        setText(event.target.value)
    }

    const importInput = (event) => {
        const f = event.target.files[0];

        if (f) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const content = e.target.result;
                setText(content);
                event.target.value = null;
            };

            reader.onerror = () => {
                toast.error("File reading error!", {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        background: '#e74c3c',
                        color: '#fff',
                    },
                });
            };

            reader.readAsText(f);
        } else {
            toast.error("No file selected. Please choose a file to import.", {
                position: 'top-center',
                duration: 3000,
                style: {
                    background: '#e74c3c',
                    color: '#fff',
                },
            });
        }
    }

    setGlobalString(text)   

    return (
        <section className="bg-zinc-900">
            <div className="h-60 flex flex-col mt-2">
                <div className="flex flex-row w-full py-3 px-2">
                    <span className="flex w-1/2">
                        <span className="rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300">Input</span>
                    </span>
                    <div className="flex gap-x-1.5">
                        <input type="file" id="import" onInput={importInput} className="invisible" />
                        <label htmlFor="import" onInput={importInput} className="flex flex-row justify-center gap-x-1.5 rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">
                            <svg className="h-5 w-5 text-gray-300"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                            </svg> 
                            Import
                        </label>
                    </div>
                </div>
                    <textarea
                    onChange={handleChange}
                    value={text}
                    className="resize-none rounded-md bg-zinc-800 border-2 border-zinc-700 text-gray-300 h-80 px-3 py-2 h-full" cols="15"></textarea>
            </div>
            <Toaster />
        </section>
    )
}

export default Input