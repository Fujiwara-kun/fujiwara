const RANDOM_SENTENCE_URL_API = "https://api.chucknorris.io/jokes/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");
//inputテキスト入力、あっているかどうかの判定
typeInput.addEventListener("input", () => {
  //タイプ音を再生
  typeSound.play();
  typeSound.currentTime = 0;

  const sentenceArray = typeDisplay.querySelectorAll("span");
  const arrayValue = typeInput.value.split("");
  sentenceArray.forEach((characterSpan, index) => {
    if (index >= arrayValue.length) {
      // まだ入力されていない文字の場合、スタイルをリセット
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (characterSpan.innerText === arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      correctSound.play();
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      wrongSound.play();
    }
  });
});
//非同期処理でランダムな文章を文章を取得する
function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.value);
}

//ランダムな文章を取得して表示する
async function RenderNextSentence() {
  const sentence = await GetRandomSentence();

  // 表示をクリア
  typeDisplay.innerHTML = "";

  //文章を1文字ずつ分解してspanタグを生成する
  let oneText = sentence.split("");

  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    typeDisplay.appendChild(characterSpan);
  });

  //テキストボックスの中身を消す
  typeInput.value = ""; // innerTextをvalueに修正
  startTimer();
}

let startTime;
let originTime = 30;
function startTimer() {
  timer.innerText = originTime;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if (timer.innerText <= 0) TimeUp();
  }, 1000);
  function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
  }
  function TimeUp() {
    RenderNextSentence();
  }
}
RenderNextSentence();
