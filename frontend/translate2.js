const fs = require('fs');
const path = require('path');

const translations = {
    '"Selecione o período desejado"': '"Selecciona el período deseado"',
    '"Data Inicial"': '"Fecha Inicial"',
    '"Data Final"': '"Fecha Final"',
    '"Conexões Ativas"': '"Conexiones Activas"',
    '"Aguardando"': '"En Espera"',
    '"Em Conversa"': '"En Conversación"',
    '"Novos Contatos"': '"Nuevos Contactos"',
    '"T.M. de Conversa"': '"T.M. de Conversación"',
    '"T.M. de Espera"': '"T.M. de Espera"',
    '"Avaliações"': '"Evaluaciones"',
    '"T.M. de Atendimento"': '"T.M. de Atención"',
    '"Total de Conversas por Usuários"': '"Total de Conversaciones por Usuario"',
    '"Filtro por Data"': '"Filtro por Fecha"',
    '"Nome"': '"Nombre"',
    '"Atendimentos"': '"Atenciones"',
    '"Total de Atendimentos por Usuários"': '"Total de Atenciones por Usuario"',
    '"Status (Atual)"': '"Estado (Actual)"',
    '"Finalizados"': '"Finalizados"',
    '"FILTRAR"': '"FILTRAR"',
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
