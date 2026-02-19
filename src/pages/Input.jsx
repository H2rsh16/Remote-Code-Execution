import React, { useState } from "react";
import { toast } from "react-hot-toast";

let globalString = "";

export const setGlobalString = (value) => {
  globalString = value;
};

export const getGlobalString = () => {
  return globalString;
};

const Input = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const importInput = (event) => {
    const f = event.target.files[0];

    if (f) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setText(content);
        event.target.value = null;
        toast.success("Input file imported successfully!");
      };

      reader.onerror = () => {
        toast.error("File reading error!");
      };

      reader.readAsText(f);
    } else {
      toast.error("No file selected. Please choose a file to import.");
    }
  };

  const clearInput = () => {
    setText("");
    toast.success("Input cleared!");
  };

  const copyInput = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Input copied to clipboard!");
    } else {
      toast.error("No input to copy!");
    }
  };

  setGlobalString(text);

  return (
    <div className="flex-1 flex flex-col bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl min-h-[200px]">
      {/* Input Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <svg
              className="h-4 w-4 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Input
          </h3>
          {text && (
            <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
              {text.length} chars
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {text && (
            <>
              <button
                onClick={copyInput}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>
              <button
                onClick={clearInput}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
            </>
          )}
          <input
            type="file"
            id="inputImport"
            onInput={importInput}
            className="hidden"
          />
          <label
            htmlFor="inputImport"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 hover:border-purple-500/50 transition-all duration-200 cursor-pointer"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Import
          </label>
        </div>
      </div>

      {/* Input Textarea */}
      <div className="flex-1 p-2">
        <textarea
          onChange={handleChange}
          value={text}
          placeholder="Enter your input here...&#10;&#10;You can paste test cases or import from a file."
          className="w-full h-full resize-none bg-transparent text-gray-300 text-sm font-mono placeholder-gray-600 focus:outline-none p-2"
        />
      </div>
    </div>
  );
};

export default Input;
