
import { verbPack } from "./variable";

const startButton = document.querySelector(
  "#start_button"
) as HTMLButtonElement;
const checkButton = document.querySelector(
  "#check_button"
) as HTMLButtonElement;
const verbSpan = document.querySelector("#verb") as HTMLSpanElement;
const meaningSpan = document.querySelector("#meaning") as HTMLSpanElement;
const firstSingularInput = document.querySelector("#first_singular") as HTMLInputElement
const secondSingularInput = document.querySelector("#second_singular") as HTMLInputElement
const thirdSingularInput = document.querySelector("#third_singular") as HTMLInputElement
const firstPluralInput = document.querySelector("#first_plural") as HTMLInputElement
const secondPluralInput = document.querySelector("#second_plural") as HTMLInputElement
const thirdPluralInput = document.querySelector("#third_plural") as HTMLInputElement
let currentVerb : number = 0;

function getSpecialKey(key: string){
    
    if (key === "1") return "á"
    else if (key === "2") return "é"
    else if (key === "3") return "í"
    else if (key === "4") return "ó"
    else if (key === "7") return "ú"
    else if (key === "8") return "ü"
    else if (key === "9") return "ñ"

    return key;
}

function addSpecialKeys(e: KeyboardEvent){

    const key = e.key;
    console.log(key);

    const newKey = getSpecialKey(key);
    
    if (key !== newKey)
    {
        e.preventDefault();
        const target = e.target as HTMLInputElement
        target.value = target.value + newKey;
    }
}

firstSingularInput.addEventListener("keydown", (e) => {
    addSpecialKeys(e);
})
secondSingularInput.addEventListener("keydown", (e) => {
    addSpecialKeys(e);
})
thirdSingularInput.addEventListener("keydown", (e) => {
    addSpecialKeys(e);
})
firstPluralInput.addEventListener("keydown", (e) => {
    addSpecialKeys(e);
})
secondPluralInput.addEventListener("keydown", (e) => {
    addSpecialKeys(e);
})
thirdPluralInput.addEventListener("keydown", (e) => {
    addSpecialKeys(e);
})

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getInput(identifier: string){
    const input = document.querySelector(identifier) as HTMLInputElement;
    return input;
}

function checkGuess(correct: string, guess: string){
    if (guess == null){
        return false;
    }

    return correct === guess;
}

function calculateGuess(inputId: string, correctValue: string){
    
    const input = getInput(inputId);

    const fsRight = checkGuess(correctValue, input.value);

    if (!fsRight){
        input.classList.add("error");
    }
    else {
        input.classList.remove("error");
    }
}

function calculateGuesses(verb: Verb){
    calculateGuess("#first_singular", verb.present_tense.first_singular);
    calculateGuess("#second_singular", verb.present_tense.second_singular);
    calculateGuess("#third_singular", verb.present_tense.third_singular);
    calculateGuess("#first_plural", verb.present_tense.first_plural);
    calculateGuess("#third_plural", verb.present_tense.third_plural);
}

startButton.addEventListener("click", (e) => {
  console.log(verbPack);
  console.log(verbPack.verbs.length);

  const verbNumber = randomIntFromInterval(0, verbPack.verbs.length - 1);
  currentVerb = verbNumber;
  
  const verb = verbPack.verbs[currentVerb];

  console.log(verb);
  console.log(verb.verb);
  console.log(verb.meaning);

  verbSpan.innerHTML = verb.verb;
  meaningSpan.innerHTML = verb.meaning;
  
});

checkButton.addEventListener("click", (e) => {
    calculateGuesses(verbPack.verbs[currentVerb]);
});
