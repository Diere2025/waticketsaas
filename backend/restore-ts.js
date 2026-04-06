const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("let transcriptionText = '[Audio]';\\nif(!isGemini){\\nconst transcription = await openai.audio.transcriptions.create({", "let transcriptionText = '[Audio]';\nif(!isGemini){\nconst transcription = await openai.audio.transcriptions.create({");
content = content.replace("});\\ntranscriptionText = transcription.text;\\n}", "});\ntranscriptionText = transcription.text;\n}");

content = content.replace("let response = '';\\nif(isGemini){ response='[Audio model fallido]'; } else {\\nconst chat = await openai.chat.completions.create({", "let response = '';\nif(isGemini){ response='[Audio model fallido]'; } else {\nconst chat = await openai.chat.completions.create({");
content = content.replace("response = chat.data.choices[0].message?.content;\\n\\n}", "response = chat.data.choices[0].message?.content;\n}");
content = content.replace("response = chat.data.choices[0].message?.content;\\n}", "response = chat.data.choices[0].message?.content;\n}");

fs.writeFileSync(filePath, content, 'utf8');
console.log("RESTORED!");
