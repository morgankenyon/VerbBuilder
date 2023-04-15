import { verbPack } from "./variable";

const startButton = document.querySelector(
  "#start_button"
) as HTMLButtonElement;
const nextVerbButton = document.querySelector(
  "#next_verb"
) as HTMLButtonElement;
const verbSelector = document.querySelector(
  "#verb_selector"
) as HTMLSelectElement;
const checkButton = document.querySelector(
  "#check_button"
) as HTMLButtonElement;
const tensePracticeDiv = document.querySelector(
  "#tense_practice"
) as HTMLDivElement;
const verbSpan = document.querySelector("#verb") as HTMLSpanElement;
const meaningSpan = document.querySelector("#meaning") as HTMLSpanElement;
const firstSingularInput = document.querySelector(
  "#first_singular"
) as HTMLInputElement;
const secondSingularInput = document.querySelector(
  "#second_singular"
) as HTMLInputElement;
const thirdSingularInput = document.querySelector(
  "#third_singular"
) as HTMLInputElement;
const firstPluralInput = document.querySelector(
  "#first_plural"
) as HTMLInputElement;
const secondPluralInput = document.querySelector(
  "#second_plural"
) as HTMLInputElement;
const thirdPluralInput = document.querySelector(
  "#third_plural"
) as HTMLInputElement;
const tenseErrorMessageP = document.querySelector(
  "#tense_error_message"
) as HTMLParagraphElement;
const tenseSuccessMessageP = document.querySelector(
  "#tense_success_message"
) as HTMLParagraphElement;
const tenseBatchMessageP = document.querySelector(
  "#tense_batch_message"
) as HTMLParagraphElement;
const tenseBatchErrorNumberSpan = document.querySelector(
  "#tense_batch_error_number"
) as HTMLSpanElement;


let currentVerb: number = 0;
let verbStartIndex: number = 0;
let verbEndIndex: number = 0;
let verbBatchSize: number = 10;
let batchErrorNumber: number = 0;

function getSpecialKey(key: string) {
  if (key === "1") return "á";
  else if (key === "2") return "é";
  else if (key === "3") return "í";
  else if (key === "4") return "ó";
  else if (key === "7") return "ú";
  else if (key === "8") return "ü";
  else if (key === "9") return "ñ";

  return key;
}

function addSpecialKeys(e: KeyboardEvent) {
  const key = e.key;
  console.log(key);

  const newKey = getSpecialKey(key);

  if (key !== newKey) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    target.value = target.value + newKey;
  }
}

firstSingularInput.addEventListener("keydown", (e) => {
  addSpecialKeys(e);
});
secondSingularInput.addEventListener("keydown", (e) => {
  addSpecialKeys(e);
});
thirdSingularInput.addEventListener("keydown", (e) => {
  addSpecialKeys(e);
});
firstPluralInput.addEventListener("keydown", (e) => {
  addSpecialKeys(e);
});
secondPluralInput.addEventListener("keydown", (e) => {
  addSpecialKeys(e);
});
thirdPluralInput.addEventListener("keydown", (e) => {
  addSpecialKeys(e);
});

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getInput(identifier: string) {
  const input = document.querySelector(identifier) as HTMLInputElement;
  return input;
}

function checkGuess(correct: string, guess: string) {
  if (guess == null) {
    return false;
  }

  return correct === guess;
}

function calculateGuess(inputId: string, correctValue: string) {
  const input = getInput(inputId);

  const fsRight = checkGuess(correctValue, input.value);

  if (!fsRight) {
    input.classList.add("error");
    return 1;
  } else {
    input.classList.remove("error");
    return 0;
  }
}

function calculateGuesses(verb: Verb) {
  let errors = 0;
  errors += calculateGuess(
    "#first_singular",
    verb.present_tense.first_singular
  );
  errors += calculateGuess(
    "#second_singular",
    verb.present_tense.second_singular
  );
  errors += calculateGuess(
    "#third_singular",
    verb.present_tense.third_singular
  );
  errors += calculateGuess("#first_plural", verb.present_tense.first_plural);
  errors += calculateGuess("#third_plural", verb.present_tense.third_plural);

  if (errors > 0) {
    tenseErrorMessageP.classList.remove("hidden");
    tenseSuccessMessageP.classList.add("hidden");
    batchErrorNumber += errors;
  } else {
    tenseErrorMessageP.classList.add("hidden");
    tenseSuccessMessageP.classList.remove("hidden");
  }
}

function updateVerbPractice(verbNumber: number) {
  firstSingularInput.value = "";
  secondSingularInput.value = "";
  thirdSingularInput.value = "";
  firstPluralInput.value = "";
  secondPluralInput.value = "";
  thirdPluralInput.value = "";


  const verb = verbPack.verbs[currentVerb];
  
  tenseErrorMessageP.classList.add("hidden");
  tenseSuccessMessageP.classList.add("hidden");

  verbSpan.innerHTML = verb.verb;
  meaningSpan.innerHTML = verb.meaning;
}

startButton.addEventListener("click", (e) => {
  const value = verbSelector.value;
  verbStartIndex = parseInt(value);
  verbEndIndex = verbStartIndex + verbBatchSize - 1;

  console.log("start: " + verbStartIndex);
  console.log("end: " + verbEndIndex);

  tensePracticeDiv.classList.remove("hidden");
  tenseBatchMessageP.classList.add("hidden");
  currentVerb = verbStartIndex;

  updateVerbPractice(currentVerb);

  //   const verb = verbPack.verbs[currentVerb];

  //   console.log(verb);
  //   console.log(verb.verb);
  //   console.log(verb.meaning);

  //   verbSpan.innerHTML = verb.verb;
  //   meaningSpan.innerHTML = verb.meaning;
});

checkButton.addEventListener("click", (e) => {
  calculateGuesses(verbPack.verbs[currentVerb]);
});

nextVerbButton.addEventListener("click", (e) => {
  tenseErrorMessageP.classList.add("hidden");
  if (currentVerb < verbEndIndex) {
    currentVerb = currentVerb + 1;
    updateVerbPractice(currentVerb);
  } else {
    tensePracticeDiv.classList.add("hidden");
    console.log("You made " + batchErrorNumber + " errors");
    tenseBatchErrorNumberSpan.innerHTML = batchErrorNumber + "";
    tenseBatchMessageP.classList.remove("hidden");
  }
});
