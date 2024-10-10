import React from "react"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { languages_ver } from "./data"

const languages = Object.entries(languages_ver)

const LanguageSelector = ({language, onSelect}) => {
    return(
        <>
            <Menu as="div" className="relative inline-block text-center">
                <div>
                    <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-gray px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-800 cursor-pointer">
                    {language}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute botton-100 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">

                    {
                        languages.map(([language, version])=> (
                            
                            <MenuItem key={language}>
                                <a
                                href="#"
                                onClick={() => {onSelect(language)}}
                                className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                {language}
                                &nbsp;
                                ({version})
                                </a>
                            </MenuItem>
                        ))
                    }
                    
                    </div>
                </MenuItems>
            </Menu> 
        </>
    )
}

export default LanguageSelector