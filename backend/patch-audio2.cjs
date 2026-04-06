const fs = require('fs');

const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

const replace1 = \`    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: file,
    });\`;

const replace2 = \`    let transcriptionText = "";
    if (isGemini) {
      try {
        const audioBuffer = fs.readFileSync(\\\`\\\${publicFolder}/\\\${mediaUrl}\\\`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
          {
            inlineData: {
              data: audioBuffer.toString("base64"),
              mimeType: "audio/ogg"
            }
          },
          { text: "Please accurately transcribe this audio message:" }
        ]);
        transcriptionText = result.response.text();
      } catch (err) {
        console.error("Gemini Transcription Error:", err);
        transcriptionText = "[Error transcribing audio]";
      }
    } else {
      const transcription = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: file,
      });
      transcriptionText = transcription.text;
    }\`;

content = content.replace(replace1, replace2);

const replace3 = \`    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messagesOpenAi,
      max_tokens: prompt.maxTokens,
      temperature: prompt.temperature
    });
    let response = chat.data.choices[0].message?.content;\`;

const replace4 = \`    let response = "";
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
      response = chat.data.choices[0].message?.content;
    }\`;

content = content.replace(replace3, replace4);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Replaced individual chunks!");
