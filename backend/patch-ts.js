const fs = require('fs');

const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/\\r\\n/g, '\\n'); // normalize to LF

const block1 = \`    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: file,
    });\`;

const rep1 = \`    let transcriptionText = "";
    if (isGemini) {
      transcriptionText = "[Mensaje de audio]";
    } else {
      const transcription = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: file,
      });
      transcriptionText = transcription.text;
    }\`;

content = content.replace(block1, rep1);

const block2 = \`    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messagesOpenAi,
      max_tokens: prompt.maxTokens,
      temperature: prompt.temperature
    });
    let response = chat.data.choices[0].message?.content;\`;

const rep2 = \`    let response = "";
    if (isGemini) {
        response = "Lo siento, soy Gemini pero recibí un audio y necesito estar configurado correctamente para responder audios.";
    } else {
      const chat = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messagesOpenAi,
        max_tokens: prompt.maxTokens,
        temperature: prompt.temperature
      });
      response = chat.data.choices[0].message?.content || "";
    }\`;

content = content.replace(block2, rep2);

fs.writeFileSync(filePath, content, 'utf8');
console.log("TS patched to fix transcriptionText errors.");
