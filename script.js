//////////////////////////////////////////////////////////////// CALCULATOR ///////////////////////////////////////////////////////////////////////////////

/* perhaps, insert a short summary to help navigate through the code */


///////////////////////////////////////////// creating data structures /////////////////////////////////////////////////

let inputs = []; // receives inputs from pressed keys and stores them as strings

let displayArray = []; // strings to be formatted for showing on display 

let calculationStorageArray = []; 

const operators = { 
  '+':  (a, b) => a + b,
  '-':  (a, b) => a - b,
  '*':  (a, b) => a * b,
  '/':  (a, b) => a / b,
  '^':  (a, b) => a ** b,
  'log': 'customLogFunc(a, b)', 
  'root': "",
};

const utilities = { 
  '[': '[',
  ']': ']',
  ',': ',',
  'backspace': function () {
    // this function shall only erase the last digit on the display
    let auxArray = [];
    auxArray = inputs[inputs.length-1].split('');
    auxArray.pop();
    inputs[inputs.length-1] = auxArray.join('');

    //statements with conditional operator: '?' ----> QUESTION: is this more readable then the traditional if statement?
    inputs[inputs.length - 1].length == 0 ? inputs.pop() : null; // if last input element has length zero, remove it
    inputs.length > 0 ? display.textContent = inputs.join(' ') : display.textContent = 0; 
  },
  'display_clearing': function () {
    inputs = []; 
    displayArray = [];
    calculationStorageArray = [];
    display.textContent = 0;
  },
};



/////////////////////////////////////// creating functions  ///////////////////////////////////////////////////

function onDisplay() { //function for showing 'inputs' elements on the display

  /*
    short description of the function. e. g. "this function has 'm' parts" that do 'n' things
      also: there is need to make if statements relative to the brackets, in order that they are kept separately as elements of the inputs

    finally, inputs is copied to displayArray so it can be rightly formatted before displayed

  */ 


  inputs.push(this.textContent); // adds a single digit input to inputs



  ////////// conditional statements

  // OBSERVATION: 
  // maybe you can unite all the operator-related rules into a single one: 
  // if an operator is added to the array, the previous element has to be a number in order to the added operator not be removed

  //// dealing with operators & utilities
  if (operators.hasOwnProperty(inputs[0])) { // if the first input is an operator, it's removed
    inputs.shift(); 
  } 
  else if ( // if the previous element is an operator and another one is added, the latter is removed
    operators.hasOwnProperty(inputs[inputs.length - 2]) && 
    operators.hasOwnProperty(inputs[inputs.length - 1])
  ) { 
    inputs.pop(); 
  }
  else if (utilities.hasOwnProperty(inputs[inputs.length - 1])) { // if brackets are typed, they are added to inputs separately from numbers
    display.textContent = inputs.join(' ');
  } else if ( // so things like '55 + [ + 12 - 2 ]' cannot happen
    operators.hasOwnProperty(inputs[inputs.length - 1]) &&
    utilities[inputs[inputs.length - 2]] === utilities['[']
  ) {
    inputs.pop();
  } else if (inputs[inputs.length - 1] === utilities[','] || inputs[inputs.length - 1] === utilities[',']
  
  ) {


  }

  //// dealing with numbers
  // zeroes
  else if ( 
    (inputs[inputs.length - 1] === '0') && 
    (
      (operators.hasOwnProperty(inputs[inputs.length - 2])) || 
      (utilities.hasOwnProperty(inputs[inputs.length - 2])) 
    )
  ) 
  { // if 'zero' is inserted right after an operator or utility character, it's removed
    inputs.pop();
    display.textContent = inputs.join(' ');
  } 
  else if (
    (inputs[inputs.length - 1] === '0') && 
    (inputs.length == 1)
  ) 
  { // if zero is typed as first input, it's removed
    inputs.pop();
    display.textContent = '0';
  } 
  
  // other numbers
  else if (
    !Number.isNaN(parseFloat(inputs[inputs.length - 2])) && 
    !operators.hasOwnProperty(inputs[inputs.length - 1]) && 
    !utilities.hasOwnProperty(inputs[inputs.length - 1])
  ) 
  { 
    // when you're typing a number onto a previous number
    inputs[inputs.length - 2] += inputs[inputs.length - 1]; // concatenate it with the newly added element 
    inputs.pop(); // and pop out the new single digit
    display.textContent = inputs.join(' '); 
  }
  else { 
    display.textContent = inputs.join(' '); 
  }   // left the case of typing single digits


  /////// formatting

  // const
  numberFormatter = Intl.NumberFormat('pt-br'); // using a formatting method from built-in object 'Intl'
  
  for(let i = 0; i < inputs.length; i++ ) {
    
    if ((operators.hasOwnProperty(inputs[i])) || (utilities.hasOwnProperty(inputs[i]))) {
      displayArray[i] = inputs[i];
    } else {
      displayArray[i] = numberFormatter.format(parseFloat(inputs[i]));
    }
  }

  display.textContent = displayArray.join(' ');
  console.log('inputs');
  console.log(inputs);
  console.log('displayArray');
  console.log(displayArray);
};





function showResult() { //function for showing result calculation (when '=' is pressed)

  /* short description of the function, e. g. "this function does 'n' things and has 'm' parts" */ 

  //This function consists of two parts:
  //    converting string representations of numbers into float type; and
  //    analyzing string representations of operators and retrieving an equivalent, but usable, symbol. (WHAT?)
      
  // Loop for identifying a openning bracket, inside which calculations have priority

  // perhaps its better to join all of the loops below into an unique loop and to evaluate each element in inputs only once

  numberFormatter = Intl.NumberFormat('pt-br'); // using a formatting method from built-in object 'Intl'

  let inputsCopy = inputs;

  for (let i = 0; i < inputsCopy.length; i++) {

    if (!Number.isNaN(parseFloat(inputsCopy[i]))) { //in other words, if inputsCopy[i] is a number
      /* when the i-th element is a number: 
        the element i + 1 can either be a number or an operator:
      */
      console.log((!Number.isNaN(parseFloat(inputsCopy[i]))));

      if (operators.hasOwnProperty(inputsCopy[i+1])) {
        let operand1 = parseFloat(inputsCopy[i]);
        let operand2 = parseFloat(inputsCopy[i+2]);
        console.log(operators[inputsCopy[i+1]](operand1, operand2));
        calculationStorageArray.push(operators[inputsCopy[i+1]](operand1, operand2));
        display.textContent = numberFormatter.format(calculationStorageArray[calculationStorageArray.length-1].toString());
      };     
      console.log(calculationStorageArray);
    } 
    
    if (utilities['['] === inputsCopy[i]) {

      for (let j = i + 1; j < inputsCopy.length; j++) {

        if (utilities[']'] === inputsCopy[j]) {
          calculationStorageArray.push(showResult(inputsCopy.slice(i + 1, j))); // reminder: j is not included
          calculationStorageArray.unshift(showResult(calculationStorageArray));
          calculationStorageArray.splice(1)
          // calculationStorageArray = showResult(calculationStorageArray); 
        }
      }
    };      
  }    

  
};

    
///////////////////////// declaring variables relative to calculator interface ////////////////////////////////////////////

/* short explanation text*/

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
const displayClearing = document.getElementById('display-clearing-key');
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

/* short explanation text*/

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
displayClearing.addEventListener('click', utilities.display_clearing);
backspaceKey.addEventListener('click', utilities['backspace']); 
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

