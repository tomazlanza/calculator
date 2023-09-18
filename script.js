///////////////////////////////////////////////////////////////////// CALCULATOR ///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* SUMMARY */

  // declaring data structures

  // objects relative to operators and utilities

  // creating functions
    // operator-and-utility-related functions
    // onDisplay function
    // functions for listening physical keys
    // parseExpression function
    // showResult functions

  // declaring DOM variables

  // creating event listeners

// NOTE: although 'sign inverter' is in the HTML section relative to number keys, in this code it's considered a 'utility'


////////////////////////////////////////////////////////// declaring data structures ////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let inputs = []; // stores inputs in a order that doesn't have a mathematical meaning

let displayArray = []; // stores the formatted inputs and results that'll be displayed

let lastCalculation = []; 

let decimalIndicator = 0; // indicates if the last element of 'inputs' has a decimal separator

let previousCalculationIndicator = 0; // indicates if there's been at least one calculation - i. e. if the equal sign '=' has been pressed before

let justPressedResult = 0; // indicates if the previous action's been a result calculation - i. e. if the equal sign '=' has just been pressed


//////////////////////////////////////////////////////// objects relative to operators and utilities ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// special-operator functions //////
const naturalLog = (a) => Math.log(a);
const sqrRoot = (a) => Math.sqrt(a);

////// objects to gather operators and utilities
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
  'display_clearing': displayClearingFunction, 
  'sign_inverter': signInverterFunction
};

////// other useful objects
const numberFormatter = new Intl.NumberFormat('pt-br', {maximumFractionDigits: 6}); // creating an object from 'Intl' for number formatting 

function setDisplaySize () { 
  const numberOfCharacters = display.textContent.split('');
 
  const mediaQuery = window.matchMedia("(min-width: 600px)");

  // // Function to handle changes in the media query state
  function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
      numberOfCharacters.length < 14 ? display.style.fontSize = '2.5rem' : null;
      numberOfCharacters.length > 15 ? display.style.fontSize = '2.3rem' : null;
      numberOfCharacters.length > 20 ? display.style.fontSize = '2.1rem' : null;
      numberOfCharacters.length > 25 ? display.style.fontSize = '1.9rem' : null;
      numberOfCharacters.length > 30 ? display.style.fontSize = '1.75rem' : null;

    } else {
      numberOfCharacters.length < 14 ? display.style.fontSize = '1.5rem' : null;
      numberOfCharacters.length > 15 ? display.style.fontSize = '1.3rem' : null;
      numberOfCharacters.length > 20 ? display.style.fontSize = '1.1rem' : null;
      numberOfCharacters.length > 25 ? display.style.fontSize = '0.9rem' : null;
      numberOfCharacters.length > 30 ? display.style.fontSize = '0.75rem' : null;

    }
  }  

  handleMediaQueryChange(mediaQuery);
}

///////////////////////////////////////////////////////////////////// creating functions  /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////// operator-and-utility-related functions ////////////////////

//// utilities
function backspace () {
  // this function shall only erase the last entered element

  if (inputs.length === 0) { 
    return;
  }   

  if (justPressedResult === 1) { 
    displayClearingFunction();
    return;
  }   

  let auxArray = [];

  let erasedElement; // the erased element will be further tested for decimal separator 

  if ((inputs[inputs.length - 2] != 'ln') && // if a special operator hasn't been input in penultimate index
    (inputs[inputs.length - 2] != 'sqr root') 
  ) {
    
    // removes last input element
    auxArray = inputs[inputs.length - 1].split('');
    erasedElement = auxArray.pop(); 
    inputs[inputs.length-1] = auxArray.join('');
    
    if (inputs[inputs.length - 1].length === 0) { // if last input element has length zero after the extraction, remove it
      inputs.pop();
      displayArray.pop();
      display.textContent = displayArray.join(' ');
      inputs.length === 0 ? display.textContent = 0 : null; 

      setDisplaySize();
      return;
    } 
    
    // removes last displayed element
    if (inputs[inputs.length - 1 ] === '-') {
      displayArray[displayArray.length - 1] = inputs[inputs.length - 1];
    } else {
      displayArray[displayArray.length - 1] = numberFormatter.format(parseFloat(inputs[inputs.length - 1]));
    }

  } else {
    inputs.pop();// each command is done twice due to the bracket that follows special operators
    inputs.pop();
    displayArray.pop();
    displayArray.pop();
  }
    
  inputs.length > 0 ? display.textContent = displayArray.join(' ') : display.textContent = 0; 
  erasedElement == '.' ? decimalIndicator = 0 : null;
  
  setDisplaySize();
}


function displayClearingFunction () {
  inputs = []; 
  displayArray = [];
  lastCalculation = [];
  display.textContent = '0';
  justPressedResult = 0;
  setDisplaySize();
}


function signInverterFunction () {
  
  // restricting this function to numbers
  if (
      (inputs[inputs.length - 1] === '[') ||
      (inputs[inputs.length - 1] === ']') 
     ) {
      return;
  }

  let auxArray = [];
  auxArray = inputs[inputs.length - 1].split('');

  // inverting the number
  if (auxArray[0] === '-') {
    auxArray.shift();
  } else {
    auxArray.unshift('-');
  }

  inputs[inputs.length - 1] = auxArray.join('');
  
  /////// updating the display

  // if the inversion is made on special numbers
  if (isNaN(inputs[inputs.length - 1])) {
    displayArray[displayArray.length - 1] = inputs[inputs.length - 1];
    display.textContent = displayArray.join(' ');
  } 
  
  // for non-special numbers
  if (!isNaN(inputs[inputs.length - 1])) {
    displayArray[displayArray.length - 1] = numberFormatter.format(parseFloat(inputs[inputs.length - 1]));
    display.textContent = (displayArray.join(' '));
    
  } 

}

///////////////// onDisplay function

const onDisplay = function () {
  
  // When a result has just been called - i. e. 'equal' sign '=' has just been pressed -,
    // clear all elements if anything besides 'normal' operators is input
  if (
      (
        (justPressedResult === 1) &&
        (
          (this.textContent !== '+') &&
          (this.textContent !== '-') &&
          (this.textContent !== '*') &&
          (this.textContent !== '/') &&
          (this.textContent !== '^') 
        )
      ) ||
      (display.textContent == '0' && inputs.length < 1)
   ) {
      displayClearingFunction();
      previousCalculationIndicator = 0;
   }
  
  
  // checking for decimal separator in the last input
  if (inputs.length > 0) {
    for (let i = 0; i < inputs[inputs.length - 1].length; i++) { 
      if (inputs[inputs.length - 1][i] === '.') {
        decimalIndicator = 1;
      }
    }
  }
  
  ///// INSERTING ELEMENTS IN 'INPUTS' ARRAY
    // for which there are 18 conditions listed below 

  ///////// operators & utilities ////////////
  // #1
  if ( // the first input cannot be an operator, unless it's either a 'minus sign' or a special operator
      ((operators.hasOwnProperty(this.textContent) && inputs.length === 0)) && 
      (
        (this.textContent !== 'ln') && 
        (this.textContent !== 'sqr root') && 
        (this.textContent !== '-') 
      )
  ) { 
      return; 
  
  // #2
  } else if ( // if the last input element is an operator, only a 'minus sign' or a special operator can follow it
      (
        (operators.hasOwnProperty(this.textContent)) &&
        (
          (this.textContent != 'ln') && 
          (this.textContent != 'sqr root') &&
          (this.textContent != '-') 
        )
      ) &&
      (operators.hasOwnProperty(inputs[inputs.length - 1]))
  ) { 
      return; 

  // #3 // allowing insertion of a 'minus sign' for indication of negative numbers
  } else if (
      (
        (!isNaN(this.textContent))  ||
        (this.textContent === 'e')  ||
        (this.textContent === 'pi')  
      ) &&
      (
        (inputs[inputs.length - 1] === '-') &&
        (isNaN(inputs[inputs.length - 2]))
      )
  ) {
      let auxArray = [];

      auxArray = inputs[inputs.length - 1].split('')
      auxArray.push(this.textContent);
      inputs[inputs.length - 1] = auxArray.join('');
    
  // #4 // a closing bracket cannot be added:  
  } else if ( 
      this.textContent === utilities[']'] && 
      (
        operators.hasOwnProperty(inputs[inputs.length-1]) || // immediately after either an operator or
        inputs[inputs.length-1] === utilities['[']              // an opening bracket
      )
  ){
      return;

  // #5 // an opening bracket cannot be inserted: 
  } else if ( 
    this.textContent === utilities['['] &&
    (
      inputs[inputs.length - 1] === utilities[']'] || // immediately after either a closing bracket 
      !isNaN(inputs[inputs.length - 1])                   // or a number 
    )
  ) { 
      return;

  // #6  // if brackets are typed, they are added to inputs separately from numbers
  } else if ( 
      this.textContent === utilities['['] 
  ) { 
      inputs.push(this.textContent);
  
  // #7 // a closing bracket cannot be added if it doesn't have a correspondent opening bracket
  } else if ( 
      this.textContent === utilities[']'] 
  ) { 
      let countOpening = 0;
      let countClosing = 0;

      for (let i = 0; i < inputs.length; i++) {
        
        if (inputs[i] === utilities['[']) {
          countOpening++;
        } else if (inputs[i] === utilities[']']) {
          countClosing++;
        }
      }    

      if (countClosing === countOpening){
        return;
      } else {
         inputs.push(this.textContent);
      }

  // #8  // if the last input element is an opening bracket, it only can be followed either by a 'minus sign' or a special operator
  } else if ( 
    (inputs[inputs.length - 1] === utilities['[']) &&
    ((operators.hasOwnProperty(this.textContent)) &&
      (
        (this.textContent !== 'ln') && 
        (this.textContent !== 'sqr root') &&
        (this.textContent !== '-')
      )
    ) 
  ) {
      return;  
  
  // #9 // a special operator cannot be added immediately after a number
  } else if ( 
      (
        this.textContent === 'ln' || 
        this.textContent === 'sqr root'
      ) &&
      (
        (!isNaN(inputs[inputs.length - 1])) || 
        (
          (utilities.hasOwnProperty(inputs[inputs.length - 1])) &&
          (inputs[inputs.length - 1] !== '[') 
        ) ||
        (inputs[inputs.length - 1] === 'e') ||
        (inputs[inputs.length - 1] === 'pi')
      )
  ) {
      return;

  // #10 //when inserting a special operator, an opening bracket is automatically added after it
  } else if ( 
      (this.textContent == 'ln' || this.textContent == 'sqr root') &&
      (!justPressedResult)
  ) {
      inputs.push(this.textContent);
      inputs.push('[');
      displayArray.push(this.textContent);
      displayArray.push('[');
      display.textContent = displayArray.join(' ');
      setDisplaySize();
      return;

  ////////// numbers //////////
  //// zeroes ////

  // #11 // zero cannot be entered twice as first and second digits
  } else if ( 
      (this.textContent === '0') && 
      (inputs[inputs.length - 1] === '0')
  ) { 
      return;

  // #12 // zero after decimal separators
  } else if ( 
      (this.textContent === '0') && 
      (decimalIndicator === 1)
  ) { 
      inputs[inputs.length - 1] += this.textContent; 
      displayArray[displayArray.length - 1] += this.textContent;
      display.textContent += this.textContent;
      return;

  //// special numbers ////
  // #13
  }  else if (
      (this.textContent === 'e') ||
      (this.textContent === 'pi') 
  ) {
      inputs.push(this.textContent); 
      displayArray.push(this.textContent);
      display.textContent = displayArray.join(' ');
      return;
  

  //// other numbers ////
  // #14 // numbers cannot be inserted right after an utility character, unless it's the opening brackets
  } else if ( 
      (!operators.hasOwnProperty(this.textContent) && !utilities.hasOwnProperty(this.textContent)) &&
      (
        (utilities.hasOwnProperty(inputs[inputs.length - 1]) && ((inputs[inputs.length - 1] != '[')))
      )
  ) { 
      return;
  
  // #15 // if a digit is entered 'on top' of a number, concatenate them
  } else if ( 
      (
        !isNaN(parseFloat(inputs[inputs.length - 1])) && 
        !operators.hasOwnProperty(this.textContent) && 
        !utilities.hasOwnProperty(this.textContent)
      ) 
  ) { 
      inputs[inputs.length - 1] += this.textContent; 
  
  //// decimal separator ////
  // #16
  } else if (this.textContent === utilities[',']) {

    // a decimal separator cannot be added immediately after neither an utility nor an operator character
    if(
        (operators.hasOwnProperty(inputs[inputs.length - 1])) ||
        (utilities.hasOwnProperty(inputs[inputs.length - 1])) ||
        (
          (inputs[inputs.length - 2] === 'ln') ||
          (inputs[inputs.length - 2] === 'sqr root')
        )
      ) {
        return;
    }

    // allowing decimal separator to be the first input
    if (
        (display.textContent === '0') &&
        (inputs.length < 1)
    ) {
      inputs.push('0');
      inputs[0] += '.';
      displayArray.push('0');
      displayArray[0] += ',';
      display.textContent = displayArray.join('');
      return;
    }
    
    // returns if there is already a decimal separator in the last element
    for (let i = 0; i < inputs[inputs.length - 1].length; i++) {
      if (inputs[inputs.length - 1][i] === '.') { 
        return;  
      } 
    }
    
    inputs[inputs.length - 1] += '.';
    displayArray[displayArray.length - 1] += '.';
    displayArray[displayArray.length - 1] = displayArray[displayArray.length - 1].replace(/.([^.]*)$/, ',$1');
    display.textContent = displayArray.join(' ');
    return;
  
  
  ////// remaining case
  // #17
  ////  typing a non-special operator or starting a new number ///
  } else { 
    inputs.push(this.textContent);
  }   


  //////////// setting number format and updating the display 
  ////////////////////////////////////////////////////////////////

  /////// UPDATING THE DISPLAY
    // for which there are 5 conditions below

  if (inputs.length > 0) {
  
    // #1  // operators and utilities 
    if (
        (operators.hasOwnProperty(inputs[inputs.length - 1])) || 
        (utilities.hasOwnProperty(inputs[inputs.length - 1]))
    ) {
        displayArray.push(inputs[inputs.length - 1]); 
    
    // #2 // when having decimal separator: digit zero
    } else if (                                                    // adjustments on display made here for showing 
          this.textContent == '0' &&                                // the 'zero' digit coming right after a decimal separator 
          decimalIndicator === 1
    ) { 
        displayArray[displayArray.length - 1] += this.textContent;

    // #3 when having decimal separator: other digits
    } else if ( 
        !isNaN(this.textContent) && 
        decimalIndicator === 1
    ) { 
        displayArray[displayArray.length - 1] += this.textContent;

    // #4 // normal and 'special' numbers
    } else if (
      (
      !operators.hasOwnProperty(displayArray[displayArray.length - 1]) &&
      !utilities.hasOwnProperty(displayArray[displayArray.length - 1])
      ) &&
      !operators.hasOwnProperty(this.textContent) && 
      !utilities.hasOwnProperty(this.textContent)
    ) {
        //if displayArray is empty, push a zero into it for placeholding
      displayArray.length === 0 ? displayArray.push('0') : null;
      
      // if the last displayed element is a number, it'll be 'unformatted'
      let unformattedDisplayElement = displayArray[displayArray.length - 1].replace(/\./g, ''); //removing any thousand-separator dot
      unformattedDisplayElement = parseFloat(unformattedDisplayElement.replace(/,/g, '.')); //replacing eventual decimal-separator 
                                                                                                  // comma for a dot
      // re-formatting 
      if (
        (!isNaN(unformattedDisplayElement)) 
      ) {
      
        if (unformattedDisplayElement === 0){
          displayArray.shift();
          displayArray.push(this.textContent);
          displayArray[displayArray.length - 1] = numberFormatter.format(displayArray[displayArray.length - 1]);
        } else {
          displayArray[displayArray.length - 1] = unformattedDisplayElement.toString(); 
          displayArray[displayArray.length - 1] += this.textContent; 
          displayArray[displayArray.length - 1] = numberFormatter.format(displayArray[displayArray.length - 1]);
        }
      
      } else {
        displayArray.push(this.textContent);
      }

    // #5 // displaying negative numbers 
    } else if (
      (
        (!isNaN(this.textContent)) ||
        (this.textContent === 'e') ||
        (this.textContent === 'pi') 
      ) &&
      (
        inputs[inputs.length - 1][0] === '-' &&
        isNaN(inputs[inputs.length - 2])
      )
    ) {
      let auxArray = [];

      auxArray = displayArray[displayArray.length - 1].split('')
      auxArray.push(this.textContent);
      displayArray[displayArray.length - 1] = auxArray.join('');

    } else {
        displayArray.push(inputs[inputs.length - 1]);
    }
      
    display.textContent = displayArray.join(' ');    

  }
  
  //// setting font size based on inputs length 
  //////////////////
  setDisplaySize();
  
  //resetting indicators
  decimalIndicator = 0; 
  justPressedResult = 0; 
}

///////////// functions for listening physical keys

function physicalKeysDisplay (event) {
  
  const key = event.key; // Getting key value

  if (keyMap.hasOwnProperty(key)) {
    
    keyMap[key].classList.add('hover-effect'); 
    keyMap[key].click(); // Simulate a click on the corresponding virtual key
    
  }
}


function physicalKeysHover (event) {
  const key = event.key;
  
  if (keyMap.hasOwnProperty(key)) {
  
    keyMap[key].classList.remove('hover-effect');   // Remove hover effect when key is released
  }
}

///////// parseExpression function
////////////////////////

const parseExpression = function (expression) { 

  if (justPressedResult === 1) {
    return;
  }

  let expressionCopy = JSON.parse(JSON.stringify(expression)); // creating a copy to be altered
   
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
    
    // sign-inverted cases
    } else if (expression[i] === '-e') {
      expressionCopy[i] = (-1)*Math.E;
    } else if (expression[i] === '-pi'){
      expressionCopy[i] = (-1)*Math.PI;
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


const bracketTagger = function (expression) {
  
  let bracketsIndexes = {}; // object to store indexes

  for (let i = 0; i < expression.length; i++) {
    if (((expression[i] == '[')) ||
        (expression[i] == ']')
      ) {
       bracketsIndexes[String(i)] = expression[i]; // 
    }
  }

  return bracketsIndexes;
}

///////// showResult functions
///////////////////////

const showResult = function () { // 

  // NOTE: this function calls showResultSubFunction, which is global-scope-declared ahead
  
  /////// THREE CONDITIONS FOR SHOWING RESULT

  ///// #1 WHEN THERE'RE NO INPUTS
  ////////////////////////////////////////////
  
  // if there have been no inputs, return
  if (
    (
      display.textContent === '0' ||
      inputs.length === 0
    ) || 
    (justPressedResult === 1)
  ) {
    return;
  }

  ///// #2 WHEN A CALCULATION HASN'T BEEN DONE YET (i. e. previousCalculationIndicator === 0)
  ////////////////////////////////////////////////
  
  if (previousCalculationIndicator === 0) { 
    showResultSubFunction(inputs);    
  
  ///// # 3 WHEN A CALCULATION HAS ALREADY BEEN DONE (i. e. previousCalculationIndicator === 1)
  ////////////////////////////////////////////////////
  } else if (previousCalculationIndicator === 1) {
    showResultSubFunction(displayArray);     
  }
  
};


function showResultSubFunction (expression) {

  // creating a deep copy that'll be altered during calculations
  let inputsCopy = JSON.parse(JSON.stringify(expression)); 

  //if the expression has brackets, they'll be tagged
  let bracketIndexes = bracketTagger(inputsCopy);
  let indexes = Object.keys(bracketIndexes);

  ///////////////////inserting additional brackets inside the special operator 
  ///////////////////////// so that showResult and ParExpression can properly function 
  ////////////////////////////////////////////////////////////////
  
  for (let i = 0; i < indexes.length; i++) {
    if ((inputsCopy[indexes[i]] === '[')) {
      
      let startIndex = +indexes[i] + 1;
      inputsCopy.splice(startIndex, 0, '[');
      
      // adding an unit to further indexes, given the array's length's been altered
      indexes = indexes.map((index)=> String(parseFloat(index) + 1));
    }
  }
  
  // resetting bracket tags
  bracketIndexes = bracketTagger(inputsCopy);
  indexes = Object.keys(bracketIndexes);

  for (let i = 0; i < indexes.length; i++) {
    if ((inputsCopy[indexes[i]] === ']')) {
      
      let startIndex = +indexes[i] + 1;
      inputsCopy.splice(startIndex, 0, ']')
      
      // adding an unit to further indexes
      indexes = indexes.map((index)=> String(parseFloat(index) + 1));
    }
  }
  // resetting bracket tags
  bracketIndexes = bracketTagger(inputsCopy);
  indexes = Object.keys(bracketIndexes);

  ////////////////////////////////////////////////////////////////////////////////////

  /// checking for missing brackets
  let openingBracketsCounter = 0;
  let closingBracketsCounter = 0;

  for (let i = 0; i < indexes.length; i++) {
    if (inputsCopy[indexes[i]] === '[') {
      openingBracketsCounter += 1;

    } else if (inputsCopy[indexes[i]] === ']') {
      closingBracketsCounter += 1;
    }
  }
  
  if (closingBracketsCounter == openingBracketsCounter) { 
    for (let j = 0; j < indexes.length; j++) { 
      // if the first-found closing bracket isn't part of a special operator (i. e. 'ln' or 'sqr root')
      if (
        (inputsCopy[indexes[j]] === ']') && 
        (
          (inputsCopy[indexes[j-1]-1] != 'ln') && 
          (inputsCopy[indexes[j-1]-1] != 'sqr root')
        )
      ) {
        for (let i = JSON.parse(JSON.stringify(j)) - 1; i >= 0; i--) {
          // finding the relative opening bracket 
          if (
            (inputsCopy[indexes[i]] === '[') &&
            (
              (inputsCopy[indexes[i]-1] != 'ln') && 
              (inputsCopy[indexes[i]-1] != 'sqr root')
            )
          ) {

            // getting the expression within the selected brackets
            let withinBrackets = JSON.parse(JSON.stringify(inputsCopy));
            withinBrackets = withinBrackets.slice(+indexes[i] + 1, +indexes[j]);

            let startIndex = indexes[i];

            // number of inputsCopy elements that'll be removed
            let numberOfRemovals = (+indexes[j] - +indexes[i] + 1);

            // switching both the expression and its container brackets for their parsed value
            inputsCopy.splice(startIndex, numberOfRemovals, String(parseExpression(withinBrackets))); 
  
            // retagging the brackets left in inputsCopy
            bracketIndexes = bracketTagger(inputsCopy);
            
            indexes = Object.keys(bracketIndexes);

            j = -1;
            
            break;
          }
        }
      }
    }
  
  // if there is an odd number of brackets
  } else {
    
    let auxString = '';

    auxString = display.textContent;
    display.textContent = 'Invalid entry: check for missing brackets.';
    display.style.fontSize = '1rem';

    // return to old display after 1,5 seconds
    setTimeout(
      () => {
        display.textContent = auxString;
        setDisplaySize();
      }, 1500
    );

    return;
  }
  
  // filtering eventual wrapping brackets left
  lastCalculation = parseExpression(inputsCopy).filter((number) => !isNaN(number)); 
  
  // if the calculation has returned an undefined value
  if (lastCalculation[lastCalculation.length - 1] === undefined) {
    
    let auxString = '';
    auxString = display.textContent;

    display.textContent = 'Invalid entry.';
    setDisplaySize();

    setTimeout(() => {
      display.textContent = auxString;
      setDisplaySize();
    }, 1500);
    
    return;
  
  // applying scientific notation on the result value if needed:
  } else if (+lastCalculation[lastCalculation.length - 1] > (10**9)) {
    
    let auxNumber = parseFloat(lastCalculation[lastCalculation.length - 1]).toExponential(4);
    displayArray = auxNumber;
    display.textContent = displayArray.replace(/\./g, ',');
  
  } else {
    displayArray = [];
    displayArray.push((lastCalculation[lastCalculation.length - 1]));
    display.textContent = numberFormatter.format(parseFloat(displayArray));
  }

  // set justPressedResult to 1 and normal display size
  justPressedResult = 1;
  previousCalculationIndicator = 1;
  setDisplaySize();

};


/////////////////////////////////////////////////////// declaring DOM variables /////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
const openingBracketKey = document.getElementById('opening-brackets-key');
const closingBracketKey = document.getElementById('closing-brackets-key');
const signInverterKey = document.getElementById('sign-inverter');

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


//special numbers keys

const eulersNumber = document.getElementById('eulers-number-key');
const piNumber = document.getElementById('pi-number-key');


//////////////////////////////// creating event listeners //////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
openingBracketKey.addEventListener('click', onDisplay);
closingBracketKey.addEventListener('click', onDisplay);
signInverterKey.addEventListener('click', signInverterFunction);

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

//special numbers keys

eulersNumber.addEventListener('click', onDisplay);
piNumber.addEventListener('click', onDisplay);


///////////physical keys

const keyMap = {
  
 // number keys 
  1: numberOne,
  2: numberTwo,
  3: numberThree,
  4: numberFour,
  5: numberFive,
  6: numberSix,
  7: numberSeven,
  8: numberEight,
  9: numberNine,
  0: numberZero,
  ',': decimalSeparator,
  
  // operator keys
  '+':  additionOperator,
  '-':  subtractionOperator,
  '*':  multiplicationOperator,
  '/':  divisionOperator,
  '~':  potentiationOperator,
  'l': logarithmOperator, 
  's': rootOperator,

  // utility keys
  '[': openingBracketKey,
  ']': closingBracketKey,
  ',': decimalSeparator,
  'Backspace': backspaceKey,
  'Escape': displayClearing, 
  'sign_inverter': signInverterKey,
  'e': eulersNumber,
  'p': piNumber,
  'Enter': resultKey
};

document.addEventListener("keydown", physicalKeysDisplay);
document.addEventListener('keyup', physicalKeysHover);
