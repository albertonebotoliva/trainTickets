const fs = require('fs');

module.exports = {
    read: (filename) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf8', (err, html) => {
                if (err) reject("Failed to read the file"); else resolve(html);
            });
        });
    },
    fixHtml: html => html.replace(/\\r\\n/g, '').replace(/\\"/g, '"')
}