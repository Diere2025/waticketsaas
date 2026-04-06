const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const genAI = new GoogleGenerativeAI("AIzaSyDweZCsBHsZmJb5aK3RPuTyaKn7ZfNIR-o");
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro"
    });
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage("Hola");
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("Gemini Error:", err);
  }
}
test();
