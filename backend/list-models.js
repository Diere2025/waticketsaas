const apiKey = "AIzaSyDweZCsBHsZmJb5aK3RPuTyaKn7ZfNIR-o"; // the one I saw earlier
const url = "https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey;

fetch(url)
.then(res => res.json())
.then(data => {
  if(data.models) {
    console.log("Supported Models:");
    data.models.forEach(m => console.log(m.name));
  } else {
    console.log("Error:", data);
  }
})
.catch(console.error);
