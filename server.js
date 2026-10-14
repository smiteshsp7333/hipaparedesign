const http = require('http');
const fs = require('fs');
const path = require('path');

// Pre-read files so NFT bundles them into the lambda
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'));
let stylesCss = Buffer.from('');
let scriptJs = Buffer.from('');

try { stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css')); } catch (e) {}
try { scriptJs = fs.readFileSync(path.join(__dirname, 'script.js')); } catch (e) {}

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    if (url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
        return res.end(stylesCss);
    }

    if (url === '/script.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        return res.end(scriptJs);
    }

    if (url === '/assets/curtain-bg.png') {
        try {
            const img = fs.readFileSync(path.join(__dirname, 'assets/curtain-bg.png'));
            res.writeHead(200, { 'Content-Type': 'image/png' });
            return res.end(img);
        } catch (e) {}
    }

    // Default to index.html
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;
