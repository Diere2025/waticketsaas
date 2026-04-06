const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');
let items = content.split(/\\r?\\n/);

let audioBlockStart = items.findIndex(l => l.includes('const transcription = await openai.audio.transcriptions.create({'));
if (audioBlockStart !== -1) {
    items[audioBlockStart] = \`    let transcriptionText = "";
    if (!isGemini) {
      const transcription = await openai.audio.transcriptions.create({\`;
    items[audioBlockStart + 3] = \`    });
      transcriptionText = transcription.text;
    }\`;
}

let textBlockStart = -1;
for(let i=0; i<items.length; i++){
    if (items[i].includes('const chat = await openai.chat.completions.create({')) {
        textBlockStart = i;
    }
}

if (textBlockStart !== -1) {
    items[textBlockStart] = \`    let response = "";
    if (isGemini) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const history = [
          { role: "user", parts: [{ text: promptSystem }] },
          { role: "model", parts: [{ text: "Comprendido." }] }
        ];
        for (let i = 0; i < Math.min(prompt.maxMessages, messages.length); i++) {
          const message = messages[i];
          if (message.mediaType === "chat") {
            history.push({
              role: message.fromMe ? "model" : "user",
              parts: [{ text: message.body }]
            });
          }
        }
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(transcriptionText);
        response = result.response.text();
      } catch (err) {
        console.error("Gemini Error:", err);
        response = "Error con Gemini API.";
      }
    } else {
      const chat = await openai.chat.completions.create({\`;
}

let responseLine = items.findIndex((l, index) => index > textBlockStart && l.includes('let response = chat.data.choices[0].message?.content;'));
if (responseLine !== -1) {
    items[responseLine] = \`      response = chat.data.choices[0].message?.content || "";
    }\`;
}

fs.writeFileSync(filePath, items.join('\\n'), 'utf8');
console.log("Patched successfully!");
