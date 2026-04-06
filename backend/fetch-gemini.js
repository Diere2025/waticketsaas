const apiKey = "AIzaSyDweZCsBHsZmJb5aK3RPuTyaKn7ZfNIR-o";
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ contents: [{ parts: [{ text: "Hola" }] }] })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
