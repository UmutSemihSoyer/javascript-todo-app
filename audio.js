const micElement = document.getElementById('record');
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
let isListening = false;

micElement.addEventListener('click', () => {
  if (!isListening) {
    listen();
  } else {
    dontListen();
  }
});

const listen = () => {
  recognition.start();
  micElement.classList.add('recording');
  console.log('Kayıt başladı');
  isListening = true;
};

const dontListen = () => {
  recognition.stop();
  micElement.classList.remove('recording');
  console.log('Kayıt durdu');
  isListening = false;
};

recognition.onresult = (event) => {
  console.log('test');
  const content = event.results[0][0].transcript;

  console.log(event.results[0][0].transcript);
  
  const cont = content.split(' ');

  console.log(cont);

  if (cont[0] === 'ekle') {
    console.log(cont.shift().toString());
    addTodo(undefined, cont.shift().toString());

    saveLocalTodos(cont.shift().toString());
  }
  recognition.onresult = null;
};
