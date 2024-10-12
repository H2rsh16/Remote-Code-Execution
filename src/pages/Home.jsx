import React, { useRef, useState, useEffect } from "react";
import Editor from '@monaco-editor/react';
import LanguageSelector from "./LanguageSelector";
import { Code_Snipets, extensions } from "./data";
import Output from "./Output";
import Input from "./Input";
import { Toaster, toast } from 'react-hot-toast';
import Profile from './Imgs/Dp.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "./AuthContex";

const Home = () =>{
    const editorRef = useRef("");
    const [value, setValue] = useState("");
    const [user, setUser] = useState("");
    const [language, setLanguage] = useState("java");
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        fetchProfile();
    });


    const notifySuccessToast = (res) => {
        toast.success(res.data.message, {
            position: 'top-center',
            duration: 3000,
            style: {
                background: '#333',
                color: '#fff',
            },
        });
    };
    
    const notifyErrorToast = (err) => {
        toast.error(err.response?.data?.message || "Error try Again!!", {
            position: 'top-center',
            duration: 3000,
            style: {
                background: '#e74c3c',
                color: '#fff',
            },
        });
    };

    
    const fetchProfile = async () => {
        await axios.get('https://rce-system-backend.onrender.com/profile', { withCredentials: true })
        .then((response) => {
                if (response.data && response.data.data) {
                    setUser(response.data.data.name);
                }
            }
        ).catch((error) => {
            notifyErrorToast(error)
            setTimeout(() => {
                logout();
                navigate('/');
            }, 2500);
        })



    };
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(Code_Snipets[language]);
    };

    const LogOut = async () => {
        try {
            const response = await axios.post('https://rce-system-backend.onrender.com/logout', {}, { withCredentials: true });
            notifySuccessToast(response)
            setTimeout(() => {
                logout();
                navigate('/');
            }, 2500);
        } catch (error) {
            notifyErrorToast(error)
        }
    };

    const exportFile = () => {
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
            if (!(ext in extensions) || extensions[ext] !== language) {
                toast.error("Invalid File", {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        background: '#e74c3c',
                        color: '#fff',
                    },
                });
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    setValue(content);
                };
                reader.readAsText(file);
            }
        } else {
            toast.error("File Not Import!!", {
                position: 'top-center',
                duration: 3000,
                style: {
                    background: '#e74c3c',
                    color: '#fff',
                },
            });

            notifyErrorToast("")
        }
    };

    return (
        <section className="relative px-3 py-5 bg-zinc-900 flex lg:flex-row gap-4 h-fit w-fit md:w-screen lg:h-screen xl:h-screen lg:w-screen xl:w-screen sm:flex-col md:flex-col">
            <div className="absolute flex justify-center items-center right-10 flex gap-x-1.5 px-5">
                <img alt="profilePic" src={Profile} className="w-9 h-9 rounded-full"/>
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
            <Toaster />
        </section>
    )
}

export default Home