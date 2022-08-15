// {
//     content: 'programa numero a; escreva(1); fimprog;',
//     error: '',
//     warnings: ['abc', 'cde']
// }
CodeMirror.fromTextArea(document.getElementById("input"), {
    mode: "text/x-java",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autofocus: true,
    theme: "dracula",
});

CodeMirror.fromTextArea(document.getElementById("output"), {
    mode: "text/x-java",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autofocus: true,
    theme: "dracula",
});



window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("compile").addEventListener('click', async () => {
        let baseUrl = "http://localhost:8080";
        let resource = "/compile";
        let source = encodeURI(document.getElementById('input').value.trimRight());
        let response = await fetch(`${baseUrl}${resource}?source=${source}`);
        let compilerOutput = await response.json();
        if (compilerOutput['error']) {
            window.alert(`Error: ${compilerOutput['error']}`);
            document.getElementById("output").textContent = "Compilation error!";
        }
        else
            document.getElementById("output").textContent = compilerOutput['content'];
        if (compilerOutput['warnings'].length !== 0) {
            compilerOutput['warnings'].forEach((warning) => {
                window.alert(`Warning: ${warning}`);
            });
        }
    })
});