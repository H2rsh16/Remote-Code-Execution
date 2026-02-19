import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { languages_ver } from "./data";

const languages = Object.entries(languages_ver);

const languageIcons = {
  javascript: "JS",
  typescript: "TS",
  python: "PY",
  java: "JV",
  csharp: "C#",
  php: "PHP",
  cpp: "C++",
  c: "C",
  ruby: "RB",
  go: "GO",
  rust: "RS",
  swift: "SW",
};

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/25 transition-all duration-200">
        <span className="flex items-center justify-center h-5 w-5 bg-white/20 rounded text-xs font-bold">
          {languageIcons[language] || language.slice(0, 2).toUpperCase()}
        </span>
        <span className="capitalize">{language}</span>
        <ChevronDownIcon className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute left-0 z-50 mt-2 w-64 origin-top-left rounded-xl bg-gray-800 border border-gray-700/50 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75"
      >
        <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Select Language
          </div>
          {languages.map(([lang, version]) => (
            <MenuItem key={lang}>
              {({ active }) => (
                <button
                  onClick={() => onSelect(lang)}
                  className={`${
                    active ? "bg-indigo-600 text-white" : "text-gray-300"
                  } ${
                    language === lang
                      ? "bg-indigo-600/20 border-l-2 border-indigo-500"
                      : ""
                  } group flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-all duration-150`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center h-7 w-7 rounded-md text-xs font-bold ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {languageIcons[lang] || lang.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="capitalize font-medium">{lang}</span>
                  </div>
                  <span
                    className={`text-xs ${
                      active ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    v{version}
                  </span>
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default LanguageSelector;
