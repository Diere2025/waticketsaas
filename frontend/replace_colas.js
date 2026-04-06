const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\frontend\\src';

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
                callback(filePath, stat);
            }
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(srcDir, function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/\bColas\b/g, "Departamentos");
    content = content.replace(/\bCola\b/g, "Departamento");
    content = content.replace(/\bcolas\b/g, "departamentos");
    content = content.replace(/\bcola\b/g, "departamento");

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated: " + filePath);
    }
});
console.log("Done");
