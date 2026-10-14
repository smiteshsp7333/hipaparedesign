const http = require('http');
const fs = require('fs');
const path = require('path');

// Pre-read files so Vercel NFT bundles them and responses are instant
let indexHtml = Buffer.from('');
let stylesCss = Buffer.from('');
let scriptJs = Buffer.from('');
let curtainImg = Buffer.from('');

try { indexHtml = fs.readFileSync(path.join(__dirname, 'index.html')); } catch (e) {}
try { stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css')); } catch (e) {}
try { scriptJs = fs.readFileSync(path.join(__dirname, 'script.js')); } catch (e) {}
try { curtainImg = fs.readFileSync(path.join(__dirname, 'assets/curtain-bg.png')); } catch (e) {}

// Vercel Serverless Function Handler
const handler = (req, res) => {
    const url = (req.url || '/').split('?')[0];

    if (url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
        return res.end(stylesCss);
    }

    if (url === '/script.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        return res.end(scriptJs);
    }

    if (url === '/assets/curtain-bg.png' && curtainImg.length > 0) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        return res.end(curtainImg);
    }

    // Default to index.html with instant response
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
};

// Export for Vercel Serverless execution
module.exports = handler;

// Local development server runner
if (require.main === module) {
    const port = process.env.PORT || 3000;
    http.createServer(handler).listen(port, () => {
        console.log(`Local server running at http://localhost:${port}/`);
    });
}
