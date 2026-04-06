const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/model: "gemini-flash-latest"/g, 'model: "gemini-3-flash-preview"');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Model updated to gemini-3-flash-preview");
