/////////////////////////////// creating data structures  ////////////////////////////////////////////

let keyInputs = []; // receives inputs from keys pressed and stores them as strings

let resultStorageArray = []; // stores (final and intermediate) results of the calculations 

const operators = { //object containing operators and the respective calculations they produce (as functions)
  '+':  (a, b) => a + b,
  '-':  (a, b) => a - b,
  '*':  (a, b) => a * b,
  '/':  (a, b) => a / b,
  '^':  (a, b) => a ** b,
  'log': 'customLogFunc(a, b)', // create customLogFunc, uhasuh
  'root': "",// is there a need to build a custom root function? maybe
};

/////////////////////////////// creating functions  ///////////////////////////////////////////////

function onDisplay() { //function for showing keyInputs array elements on the display
  /*
    short description of the function. e. g. "this function does 'n' things and has 'm' parts"
  */ 
  keyInputs.push(this.textContent); // adding input to keyInputs  

  if (operators.hasOwnProperty(keyInputs[0]) && (keyInputs.length == 1)) { // that is, if the first input of keyInputs is an operator, remove it
     keyInputs.shift(); 
  } else if (operators.hasOwnProperty(keyInputs[keyInputs.length - 2]) && operators.hasOwnProperty(keyInputs[keyInputs.length - 1]))  {// that is, if the previously added element is an operator, you cannot add another one
     keyInputs.pop(); 
  } else {//revious (i-1) array element is a number){
     console.log(keyInputs); // just for testing
     display.textContent = keyInputs.join(' '); 
  }
};


function showResult() { //function for showing result calculation (when '=' is pressed)

  /* short description of the function. e. g. "this function does 'n' things and has 'm' parts" */ 

  //This function consists of two parts:
  //    converting string representations of numbers into float type; and
  //    analyzing string representations of operators and retrieving an equivalent, but usable, symbol. (WHAT?)
  
  for(let i = 0; i < keyInputs.length; i++) {
    //converting into floats only strings that represent numbers 
        // you need to join together strings of consecutive numbers before converting them into floats 
        // i. e. the subset array ['1', '2', '3'] needs to become ['123'] before becoming [123]
    if (parseFloat(keyInputs[i]) != NaN) { //in other words, if keyInputs[i] is a number
      /* when the i-th element is a number: 
        the element i + 1 can either be a number or an operator:
      */
    // case one: the next (i + 1) element in keyInputs is an operator: 
      if (operators.hasOwnProperty(keyInputs[i+1])) {
        let operand1 = parseFloat(keyInputs[i]);
        let operand2 = parseFloat(keyInputs[i+2]);
        resultStorageArray[i] = operators[keyInputs[i+1]](operand1, operand2);
        display.textContent = resultStorageArray[i].toString();
      };     
    // case two: the next (i + 1) element in keyInputs is a number:
      if (parseFloat(keyInputs[i+1]) != NaN) {
        let auxArray = []; // auxiliary array
        auxArray[i] = keyInputs[i] + keyInputs[i + 1];
        keyInputs[i] = auxArray[i];

        //resultStorageArray.push(operators[keyInputs[i-1]](parseFloat(keyInputs[i]), parseFloat(keyInputs[i-2])));
        //resultStorageArray[i] = operators[keyInputs[i+1]](operand1, operand2);
        display.textContent = resultStorageArray[i].toString();
      }; 
    } 
  }
};

    


///////////////////////// declaring variables relative to calculator interface ////////////////////////////////////////////

// display

const display = document.getElementById('display'); // represents the calculator display

//operator keys

const subtractionOperator = document.getElementById('subtraction-operator');
const additionOperator = document.getElementById('addition-operator');
const multiplicationOperator = document.getElementById('multiplication-operator');
const divisionOperator = document.getElementById('division-operator');
const potentiationOperator = document.getElementById('potentiation-operator');
const logarithmOperator = document.getElementById('logarithm-operator');
const rootOperator = document.getElementById('root-operator');

//utility keys

const resultKey = document.getElementById('result-key');
const displayClearing = document.getElementById('display-clearing');
const backspaceKey = document.getElementById('backspace-key');
const openningBracketsKey = document.getElementById('openning-brackets-key');
const closingBracketsKey = document.getElementById('closing-brackets-key');

//number keys

const numberOne = document.getElementById('number-one');
const numberTwo = document.getElementById('number-two');
const numberThree = document.getElementById('number-three');
const numberFour = document.getElementById('number-four');
const numberFive = document.getElementById('number-five');
const numberSix = document.getElementById('number-six');
const numberSeven = document.getElementById('number-seven');
const numberEight = document.getElementById('number-eight');
const numberNine = document.getElementById('number-nine');
const decimalSeparator = document.getElementById('decimal-separator');
const numberZero = document.getElementById('number-zero');
const signInverter = document.getElementById('sign-inverter');

//////////////////////////////// creating event listeners ///////////////////////////////////////////////

/* There are two ways of making commands and inputs:
      by clicking on the virtual keys; or 
      by pressing the corresponding physical keys on the keyboard.
*/

///////////////virtual keys

//operator keys

subtractionOperator.addEventListener('click', onDisplay);
additionOperator.addEventListener('click', onDisplay);
multiplicationOperator.addEventListener('click', onDisplay);
divisionOperator.addEventListener('click', onDisplay);
potentiationOperator.addEventListener('click', onDisplay);
logarithmOperator.addEventListener('click', onDisplay);
rootOperator.addEventListener('click', onDisplay);

//utility keys

resultKey.addEventListener('click', showResult);
/* resultKey.addEventListener('click', );
displayClearing.addEventListener('click', );
backspaceKey.addEventListener('click', ); */
openningBracketsKey.addEventListener('click', onDisplay);
closingBracketsKey.addEventListener('click', onDisplay);

//number keys

numberOne.addEventListener('click', onDisplay);
numberTwo.addEventListener('click', onDisplay);
numberThree.addEventListener('click', onDisplay);
numberFour.addEventListener('click', onDisplay);
numberFive.addEventListener('click', onDisplay);
numberSix.addEventListener('click', onDisplay);
numberSeven.addEventListener('click', onDisplay);
numberEight.addEventListener('click', onDisplay);
numberNine.addEventListener('click', onDisplay);
decimalSeparator.addEventListener('click', onDisplay);
numberZero.addEventListener('click', onDisplay);
signInverter.addEventListener('click', onDisplay);

///////////physical keys

document.addEventListener("keydown", function(event) {
  // Get the key that was pressed
  let key = event.key;

  // Perform actions based on the key
  if (key === "ArrowUp") {
    // Code to be executed when the "ArrowUp" key is pressed
    console.log("Up arrow key pressed");
    // Perform additional actions specific to the "ArrowUp" key
  } else if (key === "ArrowDown") {
    // Code to be executed when the "ArrowDown" key is pressed
    console.log("Down arrow key pressed");
    // Perform additional actions specific to the "ArrowDown" key
  } else {
    // Code to be executed for other keys
    console.log("Key pressed:", key);
  }
});

