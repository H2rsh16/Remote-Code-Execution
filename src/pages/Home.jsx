import React, { useRef, useState, useEffect, version } from "react";
import Editor from '@monaco-editor/react';
import LanguageSelector from "./LanguageSelector";
import { Code_Snipets, extensions, languages_ver } from "./data";
import Output from "./Output";
import Input from "./Input";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './Imgs/Dp.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "./AuthContex";

const Home = () =>{
    const editorRef = useRef()
    const [value, setValue] = useState("")
    const [user, setUser] = useState("")
    const [language, setLanguage] = useState("java")
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('https://rce-system-backend.onrender.com/register/profile', {
                    withCredentials: true
                });

                // Check if the response is valid
                if (response.data) {
                    setUser(response.data.data["name"]);

                    // Show success toast only once
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error try Again!!", {
                    position: "top-center",
                    autoClose: 3000,
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

        fetchProfile();
    }, []); // Empty dependency array ensures this runs only once
    

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const onSelect = (language) => {
        setLanguage(language)
        setValue(
            Code_Snipets[language]
        )
    }

    const LogOut = async () => {
            const response = await axios.post('https://rce-system-backend.onrender.com/logout',{}, {
                withCredentials: true
            }).then((response)=>{
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });

                setTimeout(()=>{
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.removeItem('rememberMe');
                    logout();
                    navigate('/')
                }, 2500);
            }).catch((error)=>{
                toast.error(error.response.data.message || "Error try Again!!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            })
        
    }

    const exportFile = (event) => {
      const content = editorRef.current.getValue();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Code.' + extensions[language];

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    
    const importFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            const ext = file.name.split('.').pop();
            
            if(extensions[ext] != language || !(ext in extensions)){
                toast.error("Invalid File !!", {
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
            else{
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    const content = e.target.result;
                    setValue(content)
                };
    
                reader.readAsText(file);
            }
        } else {
            toast.error("File Import Error!!", {
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
        <section className="relative px-3 py-5 bg-zinc-900 flex lg:flex-row gap-4 h-fit w-fit md:w-screen lg:h-screen xl:h-screen lg:w-screen xl:w-screen sm:flex-col md:flex-col">
            <div className="absolute flex justify-center items-center right-10 flex gap-x-1.5 px-5">
                <img src={Profile} className="w-9 h-9 rounded-full"/>
                <span className="text-sm text-gray-300 font-bold">{user}</span>
                <button onClick={LogOut} className="rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">Log Out</button>
            </div>
            <div className="w-6/12 sm:w-full md:w-full mt-10">
                <div className="flex flex-row py-3 px-2">
                        <span className="flex w-1/2">
                            <LanguageSelector language={language} onSelect={onSelect} />
                        </span>
                        <div className="flex gap-x-1.5">
                            <input type="file" onInput={importFile} id="input" className="invisible" />
                            <label htmlFor="" onClick={exportFile} className="flex flex-row rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">
                                <svg className="h-5 w-5 text-gray-300"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                </svg>
                                    Export
                            </label>
                            <label htmlFor="input" onInput={importFile} className="flex flex-row justify-center gap-x-1.5 rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">
                                <svg className="h-5 w-5 text-gray-300"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                </svg> 
                                Import
                            </label>
                        </div>
                </div>
                <div className="sm:h-50">
                    <Editor 
                    height={500}
                    className="editor"
                    theme="vs-dark"
                    language={language}
                    onMount={onMount}
                    defaultValue={Code_Snipets[language]}
                    value={value}
                    onChange={(value) => setValue(value)}
                    />
                </div>
            </div>
            <div className="w-6/12 sm:w-full md:w-full bg-zinc-900 mt-10">
                <Output editorRef={editorRef} language={language}/>
                <Input/>
            </div>
        </section>
        </>
    )
}

export default Home