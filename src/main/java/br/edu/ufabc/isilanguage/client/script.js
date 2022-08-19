// {
//     content: 'programa numero a; escreva(1); fimprog;',
//     error: '',
//     warnings: ['abc', 'cde']
// }
window.addEventListener("DOMContentLoaded", () => {
    let inputEditor = CodeMirror.fromTextArea(document.getElementById("input"), {
        mode: "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        autofocus: true,
        theme: "dracula",
        // hintOptions: {
        //     "keywords" : [
        //         "programa",
        //         "fimprog",
        //         "leia",
        //         "escreva",
        //         "true",
        //         "false",
        //         "potencia",
        //         "raiz",
        //         "logaritmo",
        //         "enquanto",
        //         "faca",
        //         "numero",
        //         "logico",
        //         "texto",
        //         "caractere",
        //         "se",
        //         "senao"
        //     ]
        // }
    });
    let outputEditor = CodeMirror.fromTextArea(document.getElementById("output"), {
        mode: "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        autofocus: true,
        theme: "dracula",
    });
    // let outputEditor = ;
    document.getElementById("compile").addEventListener('click', async () => {
        //let baseUrl = "http://localhost:8080";
        let baseUrl = "https://isilanguage-web.herokuapp.com";
        let resource = "/compile";
        //let input = document.getElementById('input').value;
        let input = inputEditor.getValue();
        // input = input.slice(1, -1);
        input = input.trimEnd();
        input = encodeURI(input);
        let response = await fetch(`${baseUrl}${resource}?source=${input}`);
        let compilerOutput = await response.json();
        let output;
        if (compilerOutput['error']) {
            window.alert(`Error: ${compilerOutput['error']}`);
            output = compilerOutput['error'];
            document.getElementById('error').textContent = compilerOutput['error'];
            outputEditor.getDoc().setValue('');
            //document.getElementById("output").value = "Compilation error!";
        }
        else {
            output = compilerOutput['outputSource'];
            document.getElementById("output").value = output;
            outputEditor.getDoc().setValue(output);
            document.getElementById('error').textContent = '';
        }
        // document.getElementById("output").value = compilerOutput['content'];

        if (compilerOutput['warnings'].length !== 0) {
            compilerOutput['warnings'].forEach((warning) => {
                window.alert(`Warning: ${warning}`);
            });
            document.getElementById('warnings').textContent = compilerOutput['warnings'].join('<br />');
        } else {
            document.getElementById('warnings').textContent = '';
        }
    })
});