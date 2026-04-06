const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

let searchStr = "const transcription = await openai.audio.transcriptions.create";
let start = content.indexOf(searchStr);
if (start !== -1) {
   let end = content.indexOf("});", start) + 3;
   let target = content.substring(start, end);
   
   let replace = "let transcriptionText = '[Audio]';\\nif(!isGemini){\\n" + target + "\\ntranscriptionText = transcription.text;\\n}";
   content = content.replace(target, replace);
}

let search2 = "const chat = await openai.chat.completions.create";
let start2 = content.lastIndexOf(search2); 
if (start2 !== -1) {
   let end2 = content.indexOf("let response = chat.data.choices[0].message?.content;", start2);
   if (end2 !== -1) {
       end2 = end2 + 55;
       let target2 = content.substring(start2, end2);
       let replace2 = "let response = '';\\nif(isGemini){ response='[Audio model fallido]'; } else {\\n" + target2.replace("let response = ", "response = ") + "\\n}";
       content = content.replace(target2, replace2);
   }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("FIX APPLIED");
