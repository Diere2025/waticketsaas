const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import
if (!content.includes('@google/generative-ai')) {
  content = content.replace('import OpenAI from "openai";', 'import OpenAI from "openai";\nimport { GoogleGenerativeAI } from "@google/generative-ai";\n');
}

// 2. We need to find `handleOpenAi` and replace it or inject Gemini logic.
const find1 = `  let openai: OpenAI | any;
  const openAiIndex = sessionsOpenAi.findIndex(s => s.id === ticket.id);

  if (openAiIndex === -1) {
    // const configuration = new Configuration({
    //   apiKey: prompt.apiKey
    // });
    openai = new OpenAI({ apiKey: prompt.apiKey });
    openai.id = ticket.id;
    sessionsOpenAi.push(openai);
  } else {
    openai = sessionsOpenAi[openAiIndex];
  }`;

const replacement1 = `  let isGemini = prompt.apiKey && prompt.apiKey.startsWith("AIza");
  
  let openai: OpenAI | any;
  let genAI: any;
  
  if (!isGemini) {
    const openAiIndex = sessionsOpenAi.findIndex(s => s.id === ticket.id);

    if (openAiIndex === -1) {
      openai = new OpenAI({ apiKey: prompt.apiKey });
      openai.id = ticket.id;
      sessionsOpenAi.push(openai);
    } else {
      openai = sessionsOpenAi[openAiIndex];
    }
  } else {
    genAI = new GoogleGenerativeAI(prompt.apiKey);
  }`;

content = content.replace(find1, replacement1);


const find2 = `    messagesOpenAi.push({ role: "user", content: bodyMessage! });

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messagesOpenAi,
      max_tokens: prompt.maxTokens,
      temperature: prompt.temperature
    });

    let response = chat.data.choices[0].message?.content;`;

const replacement2 = `    messagesOpenAi.push({ role: "user", content: bodyMessage! });

    let response = "";
    if (isGemini) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: promptSystem,
        });
        const history = [];
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
        const result = await chat.sendMessage(bodyMessage!);
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
      response = chat.choices[0].message?.content;
    }`;

content = content.replace(find2, replacement2);


const find3 = `    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messagesOpenAi,
      max_tokens: prompt.maxTokens,
      temperature: prompt.temperature
    });
    let response = chat.data.choices[0].message?.content;`;

const replacement3 = `    let response = "";
    if (isGemini) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: promptSystem,
        });
        const history = [];
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
      const chat = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messagesOpenAi,
        max_tokens: prompt.maxTokens,
        temperature: prompt.temperature
      });
      response = chat.choices[0].message?.content;
    }`;

content = content.replace(find3, replacement3);


const find4 = `    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: file,
    });`;

const replacement4 = `    let transcriptionText = "";
    if (isGemini) {
      try {
        const audioBuffer = fs.readFileSync(\`\${publicFolder}/\${mediaUrl}\`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
          {
            inlineData: {
              data: audioBuffer.toString("base64"),
              mimeType: "audio/ogg" // best guess for whatsapp
            }
          },
          { text: "Please accurately transcribe this audio message:" }
        ]);
        transcriptionText = result.response.text();
      } catch (err) {
        console.error("Gemini Transcription Error:", err);
        transcriptionText = "";
      }
    } else {
      const transcription = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: file,
      });
      transcriptionText = transcription.text;
    }`;

content = content.replace(find4, replacement4);


const find5 = `messagesOpenAi.push({ role: "user", content: transcription.text });`;
const replacement5 = `messagesOpenAi.push({ role: "user", content: transcriptionText });`;
content = content.replace(find5, replacement5);


fs.writeFileSync(filePath, content, 'utf8');
console.log("Replaced using Node (CJS).");
