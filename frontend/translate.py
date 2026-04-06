import os
import glob

translations = {
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
    '"Enviar mensagem de transferencia de Fila/agente"': '"Enviar msj. de transferencia de Cola/agente"',
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
}

def translate_files():
    for filepath in glob.glob('src/**/*.js', recursive=True):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for pt, es in translations.items():
            new_content = new_content.replace(pt, es)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Translated strings in: {filepath}")

if __name__ == "__main__":
    translate_files()
