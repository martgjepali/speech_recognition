const texts = document.querySelector(".texts");
const button = document.querySelector(".start-stop-recognition");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
let isRecognizing = false;

recognition.addEventListener("result", (e) => {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.innerText = text;
  texts.appendChild(p);

  if (e.results[0].isFinal) {
    if (text.includes("hello") || text.includes("hi")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "Hi";
      texts.appendChild(p);
    }

    if (
      text.includes("what is your name") ||
      text.includes("what's your name")
    ) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "My name is J.A.R.V.I.S, And yours?";
      texts.appendChild(p);
    }

    if (
      text.includes("open my YouTube channel") ||
      text.includes("open YouTube")
    ) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "Opening your channel";
      texts.appendChild(p);
      window.open("https://www.youtube.com");
    }

    p = document.createElement("p");
  }
});

recognition.addEventListener("end", () => {
  if (isRecognizing) {
    recognition.start();
  }
});

button.addEventListener('click', () => {
    if (isRecognizing) {
        recognition.stop();
        button.textContent = 'Start Recognition';
    } else {
        recognition.start();
        button.textContent = 'Stop Recognition';
    }
    isRecognizing = !isRecognizing;
})
