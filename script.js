import { dog } from "./modules/jansen.js";

console.log(dog);

///////////////////////////////////////////////////////////////////// CALCULATOR ///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* insert summary here */

//ALERT COMMAND

////////////////////////////////////////////////////////// declaring data structures ////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let inputs = []; // receives inputs from pressed keys and stores them as strings

let displayArray = []; // displays number-formatted inputs and results

let calculationStorage = []; // container of calculations history

let decimalIndicator = 0; // indicates if the last element of 'inputs' has a decimal separator

const operators = { 
  '+':  (a, b) => a + b,
  '-':  (a, b) => a - b,
  '*':  (a, b) => a * b,
  '/':  (a, b) => a / b,
  '^':  (a, b) => a ** b,
  'ln': naturalLog, 
  'sqr root': sqrRoot
};

const utilities = { 
  '[': '[',
  ']': ']',
  ',': ',',
  'backspace': backspace,
  'display_clearing': display_clearingFunction // NOTE: change this name
};


///////////////////////////////////////////////////////////////////// creating functions  ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////// operator-and-utility-related functions ////////////////////

////// special operators //////

function naturalLog (a) {
  if (a <= 0) {
  /* let temp = display.textContent;
    alert('Invalid entry: the logarithm function is only defined for positive real numbers');
    setTimeout(() => { // Schedule the revert after 2 seconds
      display.textContent = temp;
    }, 2000); */
  
  } else {
    return Math.log(a);
  }
}

function sqrRoot (a) {
  if (a < 0) {
    /*let temp = display.textContent;
    alert('Invalid entry: result is not a real number');
    setTimeout(() => { // Schedule the revert after 2 seconds
      display.textContent = temp;
    }, 2000); */
  } else {
    return Math.sqrt(a);
  }
}


//// utilities

function backspace () {
  // this function shall only erase the last entered element 

  let auxArray = [];

  let erasedElement; // the erased element will be tested for decimal separator on row 104

  if ((inputs[inputs.length - 2] != 'ln') && // if a special operator hasn't been input in penultimate index
    (inputs[inputs.length - 2] != 'sqr root') 
  ) {
    // removes last input element
    inputs.length > 0 ? auxArray = inputs[inputs.length-1].split('') : null;
    erasedElement = auxArray.pop(); 
    inputs[inputs.length-1] = auxArray.join('');
    
    // removes last displayed element
    displayArray.length > 0 ? auxArray = displayArray[displayArray.length-1].split('') : null;
    auxArray.pop();
    displayArray[displayArray.length-1] = auxArray.join('');
  
  } else {
    inputs.pop();// each command is done twice due to the bracket that follows special operators
    inputs.pop();
    displayArray.pop();
    displayArray.pop();
  }
    
  //statements with conditional operator: '?' ----> QUESTION: is this more readable then the traditional if statement?
  inputs[inputs.length - 1].length == 0 ? inputs.pop() : null; // if last input element has length zero, remove it
  inputs.length > 0 ? display.textContent = displayArray.join(' ') : display.textContent = 0; 
  erasedElement == '.' ? decimalIndicator = 0 : null;
}

function display_clearingFunction () {
  inputs = []; 
  displayArray = [];
  calculationStorage = [];
  display.textContent = 0;
}

////////////////////////////////////////


const onDisplay = function () { 

  if (inputs.length > 0) {
    for (let i = 0; i < inputs[inputs.length - 1].length; i++) { // checks if the lastly inserted element has a decimal separator
      if (inputs[inputs.length - 1][i] === '.') {
        decimalIndicator = 1;
      }
    }
  }
  
  ///////// dealing with operators & utilities ////////////

  if (
      ((operators.hasOwnProperty(this.textContent) && inputs.length == 0)) && 
      ((this.textContent != 'ln') && (this.textContent != 'sqr root'))
  ) { // the first input cannot be an operator, unless it's 'ln' or 'sqr root'
     return; 
  } else if ( // if the last input element is an operator, only 'ln' and 'sqr root' can follow it
      ((operators.hasOwnProperty(this.textContent)) &&
        (
          (this.textContent != 'ln') && 
          (this.textContent != 'sqr root')
        )
      ) &&
      (operators.hasOwnProperty(inputs[inputs.length - 1]))
  ) { 
      return; 
  } else if ( // if brackets are typed, they are added to inputs separately from numbers
      this.textContent === (utilities['[']) || 
      this.textContent === (utilities[']'])
  ) { 
      inputs.push(this.textContent);
  } else if ( // if the last input element is an openning bracket, only 'ln' and 'sqr root' can follow it
    ((operators.hasOwnProperty(this.textContent)) &&
      (
        (this.textContent != 'ln') && 
        (this.textContent != 'sqr root')
      )
    ) &&
    (inputs[inputs.length - 1] === utilities['['])
  ) {
    return;
 }  else if ( 
    (this.textContent == 'ln') || 
    (this.textContent == 'sqr root')
  ) {
    inputs.push(this.textContent);
    inputs.push('[');
  }

  ////////// dealing with numbers //////////

  //// zeroes ////
  
  else if ( // zero cannot be entered twice as first and second digits
    (this.textContent === '0') && 
    (inputs[inputs.length - 1] === '0')
  ) { 
    return;
  } else if ( // zero after decimal separators
    (this.textContent === '0') && 
    (decimalIndicator === 1)
  ) { // adjustments on display made here for showing the 'zero' digit coming right after a decimal separator 
    inputs[inputs.length - 1] += this.textContent; 
    displayArray[displayArray.length - 1] += this.textContent;
    display.textContent = displayArray.join(' ');
    return;
  }

  //// special numbers ////

    else if (
      (this.textContent === 'e') ||
      (this.textContent === 'pi') 
  ) {
    inputs.push(this.textContent); 
    displayArray.push(this.textContent);
    display.textContent = displayArray.join(' ');
    return;
  }

  //// other numbers ////
  
  else if ( // numbers cannot be inserted right after an utility character, unless it's the openning brackets
    (!operators.hasOwnProperty(this.textContent) && !utilities.hasOwnProperty(this.textContent)) &&
    (
      (utilities.hasOwnProperty(inputs[inputs.length - 1]) && ((inputs[inputs.length - 1] != '[')))
    )
  ) { 
    return;
  } else if ( // if a digit is entered 'on top' of a number, concatenate them
    (
      !Number.isNaN(parseFloat(inputs[inputs.length - 1])) && 
      !operators.hasOwnProperty(this.textContent) && 
      !utilities.hasOwnProperty(this.textContent)
    ) 
  ) { 
    inputs[inputs.length - 1] += this.textContent; 
    displayArray[displayArray.length - 1] += this.textContent; 
  }
  
  //// decimal separator ////

  else if (this.textContent === utilities[',']) {
    for (let i = 0; i < inputs[inputs.length - 1].length; i++) {
      if (inputs[inputs.length - 1][i] === '.') { // checks if there already is a decimal separator in the last element
        return;  
      } 
    }
    
    inputs[inputs.length - 1] += '.';
    displayArray[displayArray.length - 1] += ',';
    display.textContent = displayArray.join(' ');
    return;
  } 
  
  //// remaining case: typing first non-zero digit ///
  else { 
    inputs.push(this.textContent);
  }   


  //////////// setting thousand-separator format and filling up displayArray ////////////

  const numberFormatter = new Intl.NumberFormat('pt-br', {maximumFractionDigits: 6}); // creating an object using a formatting method from 'Intl'
  
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++ ) {
      if (
          (operators.hasOwnProperty(inputs[i])) || 
          (utilities.hasOwnProperty(inputs[i]))
      ) {
          displayArray[i] = inputs[i];
      } else if (
          (inputs[i] != 'e') &&
          (inputs[i] != 'pi')
      ) {
          displayArray[i] = numberFormatter.format(parseFloat(inputs[i]));
      } else {
          displayArray[i] = inputs[i];
      }
    }
    display.textContent = displayArray.join(' ');    
  }

  //// setting font size based on inputs length

  if (inputs.length > 8) {
    display.style.fontSize = '1rem';
    display.style.backgroundColor = 'red';
  } else if (inputs.length > 15) {
    display.style.fontSize = '0.5rem';
  } 
  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bracketTagger = function (expression) {
  
  let bracketsIndexes = {}; // object to store indexes

  for (let i = 0; i < expression.length; i++) {
    if (((expression[i] == '[')) ||
        (expression[i] == ']')
      ) {
       bracketsIndexes[String(i)] = expression[i]; // tags AKSJFLKAJSd
    }
  }

  return bracketsIndexes;
}

/*
function parseBracketsOne (brackets) {

  let bracketsCopy = brackets;

  for (let i = 0; i < bracketsCopy.length; i++) { 
    if (bracketsCopy[i] === '[') {
      for (let j = i; j < bracketsCopy.length; j++) {
        if (bracketsCopy[j] === '[') {
          parseBrackets

        } else if (bracketsCopy[j] === ']') {

          let withinBrackets = bracketsCopy.slice(i + 1, j);
          withinBrackets = bracketsCopy.slice(i + 1, j);
    
          // it is needed allowing calculations with multiple nested brackets
          
          bracketsCopy.splice(i, j-i+1, parseExpression(withinBrackets)); // switches the expression and its brackets for its parsed value

          console.log('this is bracketsCopy during "for" loop:' + bracketsCopy);
          console.log('this is calculationStorage during "for" loop:' + calculationStorage);

          break;
        }
      }
    }
  }

  return bracketsCopy;
}
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const parseExpression = function (expression) { 
  
  let expressionCopy = JSON.parse(JSON.stringify(expression));
   
  // evaluates expression that contains only numbers and operators - doesn't parse brackets
  /* order of operators precedence: 
        #1: log or ^ or 'sqr' root; 
        #2: * or /; 
        #3: + or -. 
  */

  let tempCalculations = []; 

  //// converting special numbers representations to values
  
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === 'e') {
      expressionCopy[i] = Math.E;
    } else if (expression[i] === 'pi'){
      expressionCopy[i] = Math.PI;
    }
  }

  
  //// parsing 

  for (let i = 0; i < expressionCopy.length; i++) {
    // #1 
    if (
        (operators.hasOwnProperty(expressionCopy[i])) &&
        ((expressionCopy[i] === '^'))
       ) {
        let operand1 = parseFloat(expressionCopy[i-1]);
        let operand2 = parseFloat(expressionCopy[i+1]);
        tempCalculations.push(String(operators[expressionCopy[i]](operand1, operand2)));
        
        expressionCopy.splice(i-1, 3, tempCalculations[tempCalculations.length - 1]);
        
        i -= 1;
    } else if ( 
        (operators.hasOwnProperty(expressionCopy[i])) &&
        ((expressionCopy[i] === 'ln') || (expressionCopy[i] === 'sqr root'))
      ) {
        let operand1 = parseFloat(expressionCopy[i+2]);
        tempCalculations.push(String(operators[expressionCopy[i]](operand1)));
        
        expressionCopy.splice(i, 4, tempCalculations[tempCalculations.length - 1]);
    }
  }
  
  // #2   
  for (let i = 0; i < expressionCopy.length; i++) {
    if (  
      (operators.hasOwnProperty(expressionCopy[i])) &&
      ((expressionCopy[i] === '*') || (expressionCopy[i] === '/'))
    ) {
      let operand1 = parseFloat(expressionCopy[i-1]);
      let operand2 = parseFloat(expressionCopy[i+1]);
      
      tempCalculations.push(String(operators[expressionCopy[i]](operand1, operand2)));
      
      expressionCopy.splice(i-1, 3, tempCalculations[tempCalculations.length - 1]);
      
      i -= 1;
    }
  }  

  // #3 
  for (let i = 0; i < expressionCopy.length; i++) {
    if (
      (operators.hasOwnProperty(expressionCopy[i])) &&
      ((expressionCopy[i] === '+') || (expressionCopy[i] === '-'))
    ) {
      let operand1 = parseFloat(expressionCopy[i-1]);
      let operand2 = parseFloat(expressionCopy[i+1]);

      tempCalculations.push(String(operators[expressionCopy[i]](operand1, operand2)));
      
      expressionCopy.splice(i-1, 3, tempCalculations[tempCalculations.length - 1]);
      
      i -= 1;
    }
  }
  
  return expressionCopy;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const showResult = function () { // 

  /* short description of the function, e. g. "this function does 'n' things and has 'm' parts" */ 
  // Loop for identifying a openning bracket, inside which calculations have priority

  const numberFormatter = Intl.NumberFormat('pt-br', {maximumFractionDigits: 6}); // using a formatting method from built-in object 'Intl'
  
  let inputsCopy = JSON.parse(JSON.stringify(inputs)); // creating a copy to be altered    

  //if the expression has brackets-contained subexpressions

  let bracketIndexes = bracketTagger(inputsCopy);
  
  let indexes = Object.keys(bracketIndexes);

  if (indexes.length % 2 === 0) { 
    for (let j = 0; j < indexes.length; j++) { 
      if (
        (inputsCopy[indexes[j]] === ']') && // this is only true if the first-found closing bracket isn't part of a special operator
        (
          (inputsCopy[indexes[j-1]-1] != 'ln') && 
          (inputsCopy[indexes[j-1]-1] != 'sqr root')
        )
      ) {
        for (let i = JSON.parse(JSON.stringify(j)) - 1; i >= 0; i--) {
          if (
            (inputsCopy[indexes[i]] === '[') &&
            (
              (inputsCopy[indexes[i]-1] != 'ln') && 
              (inputsCopy[indexes[i]-1] != 'sqr root')
            )
          ) {

            let withinBrackets = JSON.parse(JSON.stringify(inputsCopy));
            withinBrackets = withinBrackets.slice(+indexes[i] + 1, +indexes[j]);
            console.log(withinBrackets);
            console.log(indexes[i]+1);
            console.log(indexes[j]);

            let startIndex = indexes[i];

            let numberOfDeletions = (indexes[j] - indexes[i] + 1);

            //let auxArray = inputsCopy.slice(0, startIndex); // switches the expression and its container brackets for their parsed value
            
            //auxArray.push(String(parseExpression(withinBrackets)));

            //auxArray.push(inputsCopy.slice(startIndex + numberOfDeletions));

            inputsCopy.splice(startIndex, numberOfDeletions, String(parseExpression(withinBrackets))); // switches the expression and its container brackets for their parsed value
  
            bracketIndexes = bracketTagger(inputsCopy);
            
            indexes = Object.keys(bracketIndexes);

            j = -1;
          }
          break;
        }
      }
    }
  } else {
    alert('Invalid input: check for missing brackets.');
    return;
  }
  
  console.log('this is inputsCopy after loops:' + inputsCopy);
  calculationStorage = parseExpression(inputsCopy);
  console.log('this is calculationStorage after loops:' + calculationStorage);
  
  if (calculationStorage[0] === undefined) {
    display.textContent = 'Invalid entry'
  } else {
    displayArray = JSON.parse(JSON.stringify(calculationStorage.slice())); // check if it's the case for this assignment resulting in a shallow copy
    display.textContent = numberFormatter.format(parseFloat(displayArray));
  }
/*
  calculationStorage = undefined ? display.textContent = 'Invalid entry(ies)': displayArray = calculationStorage;
  display.textContent = numberFormatter.format(parseFloat(displayArray));
  console.log('this is inputsCopy after "for" loop:' + inputsCopy); */

};


/////////////////////////////////////////////////////// declaring DOM variables /////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//special numbers keys

const eulersNumber = document.getElementById('eulers-number-key');
const piNumber = document.getElementById('pi-number-key');


//////////////////////////////// creating event listeners //////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
backspaceKey.addEventListener('click', utilities.backspace); 
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

//special numbers keys

eulersNumber.addEventListener('click', onDisplay);
piNumber.addEventListener('click', onDisplay);


///////////physical keys

/*
document.addEventListener("keydown", function(event) {
  // Get the key that's been pressed
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
}
);
*/