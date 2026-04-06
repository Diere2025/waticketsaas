const fs = require('fs');
const path = require('path');

const translations = {
    '"SEM FILA"': '"SIN COLA"',
    '"Sem Fila"': '"Sin Cola"',
    '"Sem fila"': '"Sin cola"'
};

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else if (dirPath.endsWith('.js')) {
            callback(dirPath);
        }
    });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (let [pt, es] of Object.entries(translations)) {
        content = content.split(pt).join(es);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Translated strings in: ${filePath}`);
    }
});
