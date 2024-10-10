import axios from "axios"
import { languages_ver } from "./data";
import { getGlobalString } from "./Input";
const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});


const executeCode  = async (language, code) => {
    const i = getGlobalString()
    
    const response = await API.post("/execute", {
        language: language,
        version: languages_ver[language],
        files: [
            {
                content: code,
            },
        ],
        stdin: i,
    });

    return response.data;
};

export default executeCode
