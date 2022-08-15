// {
//     content: 'programa numero a; escreva(1); fimprog;',
//     error: '',
//     warnings: ['abc', 'cde']
// }
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