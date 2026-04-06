const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

const tSearch = 'const chat = await openai.chat.completions.create({\n      model: "gpt-3.5-turbo-1106",\n      messages: messagesOpenAi,\n      max_tokens: prompt.maxTokens,\n      temperature: prompt.temperature\n    });\n\n    let response = chat.data.choices[0].message?.content;';
const tReplace = `    let response = "";
    if (isGemini) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const history = [];
        if (promptSystem) {
          history.push({ role: "user", parts: [{ text: promptSystem }] });
          history.push({ role: "model", parts: [{ text: "Comprendido." }] });
        }
        for (let i = 0; i < Math.min(prompt.maxMessages, messages.length); i++) {
          const message = messages[i];
          if (message.mediaType === "chat") {
            history.push({
              role: message.fromMe ? "model" : "user",
              parts: [{ text: message.body }]
            });
          }
        }
        const chatGem = model.startChat({ history });
        const result = await chatGem.sendMessage(bodyMessage);
        response = result.response.text();
      } catch (err) {
        console.error("Gemini Error:", err);
        response = "Error con Gemini API.";
      }
    } else {
      const chat = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messagesOpenAi,
        max_tokens: prompt.maxTokens,
        temperature: prompt.temperature
      });
      response = chat.data?.choices?.[0]?.message?.content;
    }`;

if(content.includes(tSearch)) {
   content = content.replace(tSearch, tReplace);
   fs.writeFileSync(filePath, content, 'utf8');
   console.log("TEXT BRANCH PATCHED");
} else {
   // Try less strict matching
   const snippet = 'const chat = await openai.chat.completions.create';
   const first = content.indexOf(snippet);
   const last = content.indexOf('message?.content;', first);
   if(first !== -1 && last !== -1) {
       const block = content.substring(first, last + 17);
       content = content.replace(block, tReplace);
       fs.writeFileSync(filePath, content, 'utf8');
       console.log("TEXT BRANCH PATCHED VIA SUBSTRING");
   } else {
       console.log("NOT FOUND!");
   }
}
