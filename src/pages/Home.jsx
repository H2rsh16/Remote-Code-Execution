import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { Code_Snipets, extensions } from "./data";
import Output from "./Output";
import Input from "./Input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Home = () => {
  const editorRef = useRef("");
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const [language, setLanguage] = useState("java");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const notifySuccessToast = (res) => {
    toast.success(res.data.message);
  };

  const notifyErrorToast = (err) => {
    toast.error(err.response?.data?.message || "Error try Again!!");
  };

  const fetchProfile = async () => {
    setIsProfileLoading(true);
    await axios
      .get("https://rce-system-backend.onrender.com/profile", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setUser(response.data.data.name);
        }
      })
      .catch((error) => {
        notifyErrorToast(error);
        setTimeout(() => {
          logout();
          navigate("/");
        }, 2500);
      })
      .finally(() => {
        setIsProfileLoading(false);
      });
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
      const response = await axios.post(
        "https://rce-system-backend.onrender.com/logout",
        {},
        { withCredentials: true },
      );
      notifySuccessToast(response);
      setTimeout(() => {
        logout();
        navigate("/");
      }, 2500);
    } catch (error) {
      notifyErrorToast(error);
    }
  };

  const exportFile = () => {
    const content = editorRef.current.getValue();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Code." + extensions[language];

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("File exported successfully!");
  };

  const importFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const ext = file.name.split(".").pop();
      if (!(ext in extensions) || extensions[ext] !== language) {
        toast.error(
          "Invalid File! Please select a valid " + language + " file",
        );
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setValue(content);
          toast.success("File imported successfully!");
        };
        reader.readAsText(file);
      }
    } else {
      toast.error("File Not Imported!");
    }
    event.target.value = null;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                CodeRunner
              </h1>
              <p className="text-xs text-gray-500">Online Code Compiler</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-800/50 rounded-full pl-2 pr-4 py-1.5 border border-gray-700/50">
              {isProfileLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-300 font-medium">
                {isProfileLoading ? "Loading..." : user}
              </span>
            </div>
            <button
              onClick={LogOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-red-600/20 hover:text-red-400 rounded-lg border border-gray-700/50 hover:border-red-500/50 transition-all duration-200"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6 h-[calc(100vh-73px)]">
        {/* Left Panel - Code Editor */}
        <div className="flex-1 flex flex-col bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <LanguageSelector language={language} onSelect={onSelect} />
              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                Ready
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="file"
                onInput={importFile}
                id="fileInput"
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="h-4 w-4"
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
                <span className="hidden sm:inline">Import</span>
              </label>
              <button
                onClick={exportFile}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 hover:border-indigo-500/50 transition-all duration-200"
              >
                <svg
                  className="h-4 w-4"
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
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              onMount={onMount}
              defaultValue={Code_Snipets[language]}
              value={value}
              onChange={(value) => setValue(value)}
              options={{
                fontSize: 14,
                fontFamily: "JetBrains Mono, Fira Code, monospace",
                minimap: { enabled: false },
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* Right Panel - Output & Input */}
        <div className="flex-1 flex flex-col gap-4 lg:max-w-lg xl:max-w-xl">
          <Output editorRef={editorRef} language={language} />
          <Input />
        </div>
      </main>
    </section>
  );
};

export default Home;
