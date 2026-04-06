const fs = require('fs');
const path = require('path');

const translations = {
    '"Bem vindo a "': '"Bienvenido a "',
    'Bem vindo a ': 'Bienvenido a ',
    'Olá ': 'Hola ',
    'Olá  ': 'Hola  ',
    '"Opções"': '"Opciones"',
    '"Horários"': '"Horarios"',
    '"Empresas"': '"Empresas"',
    '"Cadastrar Empresa"': '"Registrar Empresa"',
    '"Planos"': '"Planes"',
    '"Ajuda"': '"Ayuda"',
    '"Avaliações"': '"Evaluaciones"',
    '"Desabilitadas"': '"Deshabilitadas"',
    '"Desabilitado"': '"Deshabilitado"',
    '"Habilitadas"': '"Habilitadas"',
    '"Habilitado"': '"Habilitado"',
    '"Gerenciamento de Expediente"': '"Gestión de Horarios"',
    '"Fila"': '"Cola"',
    '"Empresa"': '"Empresa"',
    '"Ignorar Mensagens de Grupos"': '"Ignorar Mensajes de Grupos"',
    '"Desativado"': '"Desactivado"',
    '"Ativado"': '"Activado"',
    '"Aceitar Chamada"': '"Aceptar Llamadas"',
    '"Não Aceitar"': '"No Aceptar"',
    '"Aceitar"': '"Aceptar"',
    '"Tipo Chatbot"': '"Tipo de Chatbot"',
    '"Texto"': '"Texto"',
    '"Enviar saudação ao aceitar o ticket"': '"Enviar saludo al aceptar el ticket"',
    '"Enviar mensagem de transferencia de Fila/agente"': '"Enviar msj de transferencia de Cola/agente"',
    '"Enviar saudação quando houver somente 1 fila"': '"Enviar saludo cuando solo haya 1 cola"',
    '"Configurações Globais"': '"Configuraciones Globales"',
    '"Registro (Inscrição) Permitida?"': '"¿Registro Permitido?"',
    '>Não<': '>No<',
    '>Sim<': '>Sí<',
    '"Não"': '"No"',
    '"Sim"': '"Sí"',
    '"Registro (Inscrição) Visível?"': '"¿Registro Visible?"',
    '"Tempo de Trial?"': '"¿Tiempo de Prueba (Días)?"',
    '"Sim, Encerrar"': '"Sí, Finalizar"',
    '"Cancelar"': '"Cancelar"',
    '"Salvar"': '"Guardar"',
    '"Atualizando..."': '"Actualizando..."',
    '"Operação atualizada com sucesso."': '"Operación actualizada con éxito."',
    '"Sua conta foi acessada em outro computador."': '"Tu cuenta ha sido abierta en otro equipo."',
    '"Sem notificações"': '"Sin notificaciones"',
};

function walkDir(dir, callback) {
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
