import React, { useState } from "react";
import executeCode from "./Api";
import { toast } from "react-hot-toast";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const runCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) {
      toast.error("Please write some code first!");
      return;
    }
    try {
      setLoading(true);
      const startTime = Date.now();
      const { run: result } = await executeCode(language, code);
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);
      setOutput(result.output.split("\n"));
      if (result.stderr) {
        setError(true);
        toast.error("Code executed with errors");
      } else {
        setError(false);
        toast.success("Code executed successfully!");
      }
    } catch (error) {
      setOutput([error.message]);
      setError(true);
      toast.error("Execution failed!");
    } finally {
      setLoading(false);
    }
  };

  const exportCode = () => {
    if (!output) {
      toast.error("Run code first to export output");
      return;
    }

    const content = output;
    const result = `// Code:\n${editorRef.current.getValue()}\n\n// Output:\n${content.join("\n")}`;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Output.txt";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Output exported successfully!");
  };

  const clearOutput = () => {
    setOutput(null);
    setError(false);
    setExecutionTime(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
      {/* Output Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <svg
              className="h-4 w-4 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Output
          </h3>
          {executionTime && (
            <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
              {executionTime}ms
            </span>
          )}
          {output && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isError
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {isError ? "Error" : "Success"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {output && (
            <button
              onClick={clearOutput}
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
          )}
          <button
            onClick={exportCode}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 hover:border-indigo-500/50 transition-all duration-200"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Export
          </button>
          <button
            onClick={runCode}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg shadow-lg transition-all duration-200 ${
              isLoading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-green-500/25"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Running...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Content */}
      <div
        className={`flex-1 overflow-y-auto p-4 font-mono text-sm ${
          isError ? "text-red-400" : "text-gray-300"
        }`}
      >
        {output ? (
          <div className="space-y-0.5">
            {output.map((line, i) => (
              <div
                key={i}
                className="flex items-start gap-3 hover:bg-gray-700/30 px-2 py-0.5 rounded"
              >
                <span className="text-gray-600 text-xs select-none w-6 text-right">
                  {i + 1}
                </span>
                <span className="whitespace-pre-wrap break-all">{line}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <svg
              className="h-12 w-12 mb-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Click "Run Code" to see output here</p>
            <p className="text-xs text-gray-600 mt-1">
              Supports multiple programming languages
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;
