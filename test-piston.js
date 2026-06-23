const fetch = require('node-fetch');
fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        language: "python",
        version: "*",
        files: [{ content: "print('Hello World')" }]
    })
}).then(res => res.json()).then(console.log);
