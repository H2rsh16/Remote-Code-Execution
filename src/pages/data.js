export const languages_ver = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    java: "15.0.2",
    csharp: "6.12.0",
    bash: "5.2.0",
    php: "8.2.3",
    python: "3.10.0",
    cpp: "10.2.0",
    c: "10.2.0",
    dart: "2.19.6"
}

export const extensions = {
    js: "javascript",
    ts: "typescript",
    java: "java",
    cs: "csharp",
    sh: "bash",
    php: "php",
    py: "python",
    cpp: "cpp",
    c: "c",
    dart: "dart"
}

export const Code_Snipets = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Harsh");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Harsh" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Harsh")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
    php: `<?php\n\n$name = 'Harsh';\necho $name;\n`,
    cpp: `\n#include <iostream>\nusing namespace std;\n\nint main()\n{\n\tcout << "Hello World!!";\n\n\treturn 0;\n}`,
    c: `\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!!");\n\treturn 0;\n}\n`,
    dart: `\nvoid main() {\n\tprint("Hello World!!");\n}\n`,
    bash: `\necho "Hello World"\n`,
}