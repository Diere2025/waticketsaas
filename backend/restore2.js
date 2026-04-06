const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("let transcriptionText = '[Audio]';\\nif(!isGemini){\\nconst transcription", "let transcriptionText = '[Audio]';\nif(!isGemini){\nconst transcription");
content = content.replace("});\\ntranscriptionText = transcription.text;\\n}", "});\ntranscriptionText = transcription.text;\n}");
content = content.replace("if(isGemini){ response='[Audio model fallido]'; } else {\\nconst chat", "if(isGemini){ response='[Audio model fallido]'; } else {\nconst chat");

fs.writeFileSync(filePath, content, 'utf8');
console.log("FIXED ALL N!");
