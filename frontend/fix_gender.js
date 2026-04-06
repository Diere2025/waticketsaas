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

    content = content.replace(/una departamento/ig, "un departamento");
    content = content.replace(/la departamento/ig, "el departamento");
    content = content.replace(/SIN COLA/g, "SIN DEPARTAMENTO");
    content = content.replace(/Sin Cola/g, "Sin Departamento");
    content = content.replace(/una fila/ig, "un departamento");
    content = content.replace(/la fila/ig, "el departamento");

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated: " + filePath);
    }
});
console.log("Done");
