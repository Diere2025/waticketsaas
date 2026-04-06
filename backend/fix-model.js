const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/model: "gemini-pro"/g, 'model: "gemini-flash-latest"');
content = content.replace(/model: "gemini-1.5-flash"/g, 'model: "gemini-flash-latest"');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Model updated to gemini-flash-latest");
